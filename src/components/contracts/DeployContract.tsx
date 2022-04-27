import { TransactionRequest } from '@ethersproject/abstract-provider';
import { useMemo } from 'react';
import { WalletDetails } from '../../data/wallet';
import LoaderButton from '../common/forms/LoaderButton';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import { useExecuteTransaction } from '../transactions/transactionHooks';
import TransactionLink from '../transactions/TransactionLink';
import ContractLink from './ContractLink';

export interface DeployContractProps {
  wallet: WalletDetails;
  transactionRequest: TransactionRequest;
  findExistingContractAddress?: () => string | null | undefined;
  onDeploy?: () => void;
  onDeployed?: (address: string) => void;
}

const DeployContract = ({
  wallet,
  transactionRequest,
  findExistingContractAddress,
  onDeploy,
  onDeployed,
}: DeployContractProps) => {
  const { execute, response, receipt, status, executing } = useExecuteTransaction(transactionRequest);

  const address = useMemo(() => {
    if (findExistingContractAddress) {
      const existingContractAddress = findExistingContractAddress();
      if (existingContractAddress) {
        return existingContractAddress;
      }
    }

    if (receipt) {
      return receipt.contractAddress;
    }

    return null;
  }, [response?.hash, receipt]);

  const handleDeploy = async () => {
    if (onDeploy) {
      onDeploy();
    }

    const receipt = await execute();
    if (!receipt) {
      return;
    }

    if (onDeployed) {
      onDeployed(receipt.contractAddress);
    }
  };

  const blockExplorerUrl = wallet.network.blockExplorerUrls[0];

  return (
    <>
      {address ? (
        <DetailField>
          <DetailTitle>Address</DetailTitle>
          <ContractLink address={address} blockExplorerUrl={blockExplorerUrl} />
        </DetailField>
      ) : null}
      {response ? (
        <DetailField>
          <DetailTitle>Transaction</DetailTitle>
          <TransactionLink
            transactionHash={response.hash}
            transactionStatus={status}
            blockExplorerUrl={blockExplorerUrl}
          />
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
