import { TransactionRequest } from '@ethersproject/abstract-provider';
import { useMemo } from 'react';
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
}

const DeployContract = ({
  transactionRequest,
  existingContractAddress,
  onBeforeDeploy,
  onDeployed,
}: DeployContractProps) => {
  const { execute, response, receipt, status, executing } = useExecuteTransaction(transactionRequest);

  const address = useMemo(() => {
    if (existingContractAddress) {
      return existingContractAddress;
    }

    if (receipt) {
      return receipt.contractAddress;
    }

    return null;
  }, [response?.hash, receipt]);

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
  };

  return (
    <>
      {address ? (
        <DetailField>
          <DetailTitle>Address</DetailTitle>
          <ContractLink address={address} />
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
        </LoaderButton>
      </DetailField>
    </>
  );
};
export default DeployContract;
