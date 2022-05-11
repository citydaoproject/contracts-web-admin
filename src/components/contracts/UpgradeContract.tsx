import { toEthereumAddress } from '@citydao/parcel-contracts/dist/src/constants/accounts';
import { UUPSUpgradeable__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/UUPSUpgradeable__factory';
import { Provider } from '@ethersproject/providers';
import { BigNumber, Contract } from 'ethers';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useFormFields } from '../../hooks/forms';
import { getStorageLocationFromText, readStorageValue } from '../../utils/contractStorage';
import DefaultTextField from '../common/forms/DefaultTextField';
import LoaderButton from '../common/forms/LoaderButton';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import DetailValue from '../common/typography/DetailValue';
import { useExecuteTransaction } from '../transactions/transactionHooks';
import { useEthereumProvider, useInterfaceLoader } from './contractHooks';
import ContractLink from './ContractLink';

export interface UpgradeContractProps {
  proxyContractAddress: string;
  onUpgrade?: (logicContractAddress: string) => void;
}

interface UpgradeContractFields {
  logicContractAddress: string;
}

const UpgradeContract = ({ proxyContractAddress, onUpgrade }: UpgradeContractProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { provider } = useEthereumProvider();

  const { contract: proxyContract } = useInterfaceLoader(UUPSUpgradeable__factory.connect, proxyContractAddress);

  const { fields, handleFieldChange, resetFields } = useFormFields<UpgradeContractFields>({
    logicContractAddress: '',
  });

  const [logicContractAddress, setContractLogicAddress] = useState<string>();

  const { execute, executing } = useExecuteTransaction();

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchLogicContractAddress();
  }, [proxyContractAddress]);

  const fetchLogicContractAddress = async () => {
    if (!provider) {
      console.warn('No provider found');
      return;
    }

    if (!proxyContract) {
      console.warn('No proxy contract found');
      return;
    }

    const logicContractAddress = await getProxyImplementationAddress(proxyContract, provider);
    setContractLogicAddress(logicContractAddress);
  };

  const handleUpgradeContract = async () => {
    if (!proxyContract) {
      console.warn('No proxy contract found');
      return;
    }

    if (!(await execute(await proxyContract.populateTransaction.upgradeTo(fields.logicContractAddress)))) {
      return;
    }

    resetFields();

    if (onUpgrade) {
      onUpgrade(fields.logicContractAddress);
    }

    enqueueSnackbar('Upgraded contract successfully', { variant: 'success' });
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
      <LoaderButton loading={executing} onClick={handleUpgradeContract}>
        Upgrade to new logic contract
      </LoaderButton>
    </DetailField>
  );
};
export default UpgradeContract;

// todo: move this to parcel-contracts
export const getProxyImplementationAddress = async (contract: Contract, provider: Provider) =>
  toEthereumAddress(
    BigNumber.from(
      await readStorageValue(
        provider,
        contract.address,
        getStorageLocationFromText('eip1967.proxy.implementation').sub(1),
      ),
    ),
  );
