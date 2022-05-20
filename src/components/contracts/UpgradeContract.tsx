import { encodeTransferOwnershipFunction } from '@citydao/parcel-contracts/dist/src/contracts/ownable';
import { getProxyImplementationAddress } from '@citydao/parcel-contracts/dist/src/contracts/upgradeableProxy';
import { ERC1967Proxy__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ERC1967Proxy__factory';
import { UUPSUpgradeable__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/UUPSUpgradeable__factory';
import { UUPSUpgradeable } from '@citydao/parcel-contracts/dist/types/contracts/UUPSUpgradeable';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getNetworkLogicContractSelector } from '../../data/logicContracts';
import { useFormFields } from '../../hooks/forms';
import DefaultTextField from '../common/forms/DefaultTextField';
import LoaderButton from '../common/forms/LoaderButton';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import DetailValue from '../common/typography/DetailValue';
import { useExecuteTransaction } from '../transactions/transactionHooks';
import { useEthereumProvider, useInterfaceLoader } from './contractHooks';
import ContractLink from './ContractLink';
import { LogicContractType } from './logicContracts';

export interface UpgradeContractProps {
  proxyContractAddress: string;
  type: LogicContractType;
  onUpgrade?: (logicContractAddress: string) => void;
}

interface UpgradeContractFields {
  logicContractAddress: string;
  newOwner: string;
}

const UpgradeContract = ({ proxyContractAddress, type, onUpgrade }: UpgradeContractProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [logicContractAddress, setContractLogicAddress] = useState<string>();

  const { provider } = useEthereumProvider();

  const latestLogicContractValue = useRecoilValue(getNetworkLogicContractSelector(type));
  const latestLogicContractAddress = latestLogicContractValue?.address || '';

  const fetchProxyContractData = async (proxyContract: UUPSUpgradeable) => {
    if (!provider) {
      console.warn('No provider found');
      return;
    }

    const logicContractAddress = await getProxyImplementationAddress(
      ERC1967Proxy__factory.connect(proxyContract.address, proxyContract.provider),
    );
    setContractLogicAddress(logicContractAddress);
  };

  const { contract: proxyContract, refetch } = useInterfaceLoader(
    UUPSUpgradeable__factory.connect,
    proxyContractAddress,
    [],
    fetchProxyContractData,
  );

  const { fields, handleFieldChange, setFieldValue, resetFields } = useFormFields<UpgradeContractFields>({
    logicContractAddress: '',
    newOwner: '',
  });

  const { execute, executing } = useExecuteTransaction();

  const handleUpgradeContract = async () => {
    if (!proxyContract) {
      console.warn('No proxy contract found');
      return;
    }

    if (!(await upgradeProxy())) {
      return;
    }

    await refetch();

    resetFields();

    if (onUpgrade) {
      onUpgrade(fields.logicContractAddress);
    }

    enqueueSnackbar('Upgraded contract successfully', { variant: 'success' });
  };

  const handleUseLatestLogicContractDefinition = () => {
    setFieldValue('logicContractAddress', latestLogicContractAddress);
  };

  const upgradeProxy = async (): Promise<TransactionReceipt | null> => {
    if (!proxyContract) {
      console.warn('No proxy contract found');
      return null;
    }

    if (fields.newOwner) {
      return execute(
        await proxyContract.populateTransaction.upgradeToAndCall(
          fields.logicContractAddress,
          encodeTransferOwnershipFunction(fields.newOwner),
        ),
      );
    }

    return execute(await proxyContract.populateTransaction.upgradeTo(fields.logicContractAddress));
  };

  if (!proxyContract || !logicContractAddress) {
    return null;
  }

  return (
    <DetailField>
      <DetailTitle>Logic Contract Address</DetailTitle>
      <DetailValue>
        <ContractLink address={logicContractAddress} />
      </DetailValue>
      <DefaultTextField
        name="logicContractAddress"
        type="text"
        label="New Logic Contract Address"
        autoComplete="off"
        value={fields.logicContractAddress}
        required
        onChange={handleFieldChange}
      />
      <DefaultTextField
        name="newOwner"
        type="text"
        label="New Owner Address"
        autoComplete="off"
        value={fields.newOwner}
        required
        onChange={handleFieldChange}
      />
      {latestLogicContractAddress ? (
        <LoaderButton color="secondary" onClick={handleUseLatestLogicContractDefinition}>
          Use latest logic contract address
        </LoaderButton>
      ) : null}{' '}
      <LoaderButton loading={executing} onClick={handleUpgradeContract}>
        Upgrade to new logic contract
      </LoaderButton>
    </DetailField>
  );
};
export default UpgradeContract;
