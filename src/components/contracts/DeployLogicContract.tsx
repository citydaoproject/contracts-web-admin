import { clearLogicContract, findLogicContractByType, updateLogicContract } from '../../data/contracts';
import { WalletDetails } from '../../data/wallet';
import SubSectionTitle from '../common/typography/SubSectionTitle';
import DeployContract from './DeployContract';
import { LogicContractDefinition } from './logicContracts';

export interface DeployLogicContractProps {
  logicContractDefinition: LogicContractDefinition;
  wallet: WalletDetails;
}

const DeployLogicContract = ({ logicContractDefinition, wallet }: DeployLogicContractProps) => {
  const networkName = wallet.network.key;
  return (
    <>
      <SubSectionTitle>{logicContractDefinition.type} Logic</SubSectionTitle>
      <DeployContract
        wallet={wallet}
        transactionRequest={logicContractDefinition.factory().getDeployTransaction()}
        findExistingContractAddress={() => findLogicContractByType(networkName, logicContractDefinition.type)?.address}
        onDeploy={() => clearLogicContract(networkName, logicContractDefinition.type)}
        onDeployed={(address) => updateLogicContract({ networkName, type: logicContractDefinition.type, address })}
      />
    </>
  );
};
export default DeployLogicContract;
