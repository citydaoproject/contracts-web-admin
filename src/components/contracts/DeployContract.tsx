import { ContractAddress } from '@citydao/parcel-contracts/dist/src/constants/accounts';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { useFormFields } from '../../hooks/forms';
import { isValidAddress } from '../../utils/constants';
import DefaultButton from '../common/forms/DefaultButton';
import DefaultTextField from '../common/forms/DefaultTextField';
import LoaderButton from '../common/forms/LoaderButton';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import { useExecuteTransaction } from '../transactions/transactionHooks';
import TransactionLink from '../transactions/TransactionLink';
import ContractLink from './ContractLink';

export interface DeployContractProps {
  transactionRequest: TransactionRequest;
  buildAfterDeployTransactionRequest?: (address: ContractAddress) => Promise<TransactionRequest>;
  existingContractAddress?: ContractAddress | null;
  onBeforeDeploy?: () => void;
  onDeployed?: (address: ContractAddress) => void;
  onClearContract?: (previousAddress: ContractAddress) => void;
}

interface DeployContractFields {
  address: string;
}

const DeployContract = ({
  transactionRequest,
  buildAfterDeployTransactionRequest,
  existingContractAddress,
  onBeforeDeploy,
  onDeployed,
  onClearContract,
}: DeployContractProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    execute: executeDeployment,
    response: deploymentResponse,
    receipt: deploymentReceipt,
    status: deploymentStatus,
    executing: executingDeployment,
  } = useExecuteTransaction(transactionRequest);

  const {
    execute: executeInitialization,
    response: initializationResponse,
    status: initializationStatus,
    executing: executingInitialization,
  } = useExecuteTransaction();

  const { fields, handleFieldChange, resetFields } = useFormFields<DeployContractFields>({
    address: '',
  });

  const address = useMemo(() => {
    if (existingContractAddress) {
      return existingContractAddress;
    }

    if (deploymentReceipt) {
      return deploymentReceipt.contractAddress;
    }

    return null;
  }, [existingContractAddress, deploymentResponse?.hash, deploymentReceipt]);

  const formValid = fields.address && isValidAddress(fields.address);

  const handleSetAddress = () => {
    const address = fields.address;
    if (!address) {
      return;
    }

    resetFields();

    if (!onDeployed) {
      return;
    }

    onDeployed(ethers.utils.getAddress(address));
  };

  const handleDeploy = async () => {
    if (onBeforeDeploy) {
      onBeforeDeploy();
    }

    const receipt = await executeDeployment();
    if (!receipt) {
      return;
    }

    if (buildAfterDeployTransactionRequest) {
      await executeInitialization(await buildAfterDeployTransactionRequest(receipt.contractAddress));
    }

    if (onDeployed) {
      onDeployed(receipt.contractAddress);
    }

    enqueueSnackbar('Contract deployed successfully', { variant: 'success' });
  };

  return (
    <>
      {address ? (
        <DetailField>
          <DetailTitle>Address</DetailTitle>
          <ContractLink address={address} />
        </DetailField>
      ) : onDeployed ? (
        <DetailField>
          <DefaultTextField
            name="address"
            type="text"
            label="Use address"
            autoComplete="off"
            value={fields.address}
            onChange={handleFieldChange}
          />
          <DefaultButton disabled={!formValid} onClick={handleSetAddress}>
            Use Contract at Address
          </DefaultButton>
        </DetailField>
      ) : null}

      {deploymentResponse ? (
        <DetailField>
          <DetailTitle>Deployment Transaction</DetailTitle>
          <TransactionLink transactionHash={deploymentResponse.hash} transactionStatus={deploymentStatus} />
        </DetailField>
      ) : null}

      {initializationResponse ? (
        <DetailField>
          <DetailTitle>Initialization Transaction</DetailTitle>
          <TransactionLink transactionHash={initializationResponse.hash} transactionStatus={initializationStatus} />
        </DetailField>
      ) : null}

      <DetailField>
        <LoaderButton loading={executingDeployment || executingInitialization} onClick={handleDeploy}>
          {address ? 'Redeploy Contract' : 'Deploy Contract'}
        </LoaderButton>{' '}
        {address && onClearContract ? (
          <DefaultButton
            disabled={executingDeployment || executingInitialization}
            onClick={() => onClearContract(address)}
          >
            Clear Contract
          </DefaultButton>
        ) : null}
      </DetailField>
    </>
  );
};
export default DeployContract;
