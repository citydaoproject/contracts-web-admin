import { useMemo } from 'react';
import { clearLogicContract, findLogicContractByType, updateLogicContract } from '../../data/contracts';
import { WalletDetails } from '../../data/wallet';
import LoaderButton from '../common/forms/LoaderButton';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import SubSectionTitle from '../common/typography/SubSectionTitle';
import { useExecuteTransaction } from '../transactions/transactionHooks';
import TransactionLink from '../transactions/TransactionLink';
import ContractLink from './ContractLink';
import { LogicContractDefinition } from './logicContracts';

export interface DeployLogicContractProps {
  logicContractDefinition: LogicContractDefinition;
  wallet: WalletDetails;
}

const DeployLogicContract = ({ logicContractDefinition, wallet }: DeployLogicContractProps) => {
  const { execute, response, receipt, status, executing } = useExecuteTransaction(
    logicContractDefinition.factory().getDeployTransaction(),
  );

  const networkName = wallet.network.key;

  const address = useMemo(() => {
    const deployedLogicContract = findLogicContractByType(networkName, logicContractDefinition.type);
    if (deployedLogicContract) {
      return deployedLogicContract.address;
    }

    if (receipt) {
      return receipt.contractAddress;
    }

    return null;
  }, [response?.hash, receipt]);

  const handleDeploy = async () => {
    clearLogicContract(networkName, logicContractDefinition.type);

    const receipt = await execute();
    if (!receipt) {
      return;
    }

    updateLogicContract({ networkName, type: logicContractDefinition.type, address: receipt.contractAddress });
  };

  const blockExplorerUrl = wallet.network.blockExplorerUrls[0];

  return (
    <>
      <SubSectionTitle>{logicContractDefinition.type} Logic</SubSectionTitle>
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
export default DeployLogicContract;
