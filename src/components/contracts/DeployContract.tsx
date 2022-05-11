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
  existingContractAddress?: string | null;
  onBeforeDeploy?: () => void;
  onDeployed?: (address: string) => void;
  onClearContract?: (previousAddress: string) => void;
}

interface DeployContractFields {
  address: string;
}

const DeployContract = ({
  transactionRequest,
  existingContractAddress,
  onBeforeDeploy,
  onDeployed,
  onClearContract,
}: DeployContractProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { execute, response, receipt, status, executing } = useExecuteTransaction(transactionRequest);
  const { fields, handleFieldChange, resetFields } = useFormFields<DeployContractFields>({
    address: '',
  });

  const address = useMemo(() => {
    if (existingContractAddress) {
      return existingContractAddress;
    }

    if (receipt) {
      return receipt.contractAddress;
    }

    return null;
  }, [existingContractAddress, response?.hash, receipt]);

  const formValid = fields.address && isValidAddress(fields.address);

  const handleSetAddress = () => {
    if (!onDeployed) {
      return;
    }

    const address = fields.address;
    if (!address) {
      return;
    }

    onDeployed(ethers.utils.getAddress(address));
    resetFields();
  };

  const handleDeploy = async () => {
    if (onBeforeDeploy) {
      onBeforeDeploy();
    }

    const receipt = await execute();
    if (!receipt) {
      return;
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
      {response ? (
        <DetailField>
          <DetailTitle>Transaction</DetailTitle>
          <TransactionLink transactionHash={response.hash} transactionStatus={status} />
        </DetailField>
      ) : null}
      <DetailField>
        <LoaderButton loading={executing} onClick={handleDeploy}>
          {address ? 'Redeploy Contract' : 'Deploy Contract'}
        </LoaderButton>{' '}
        {address && onClearContract ? (
          <DefaultButton disabled={executing} onClick={() => onClearContract(address)}>
            Clear Contract
          </DefaultButton>
        ) : null}
      </DetailField>
    </>
  );
};
export default DeployContract;
