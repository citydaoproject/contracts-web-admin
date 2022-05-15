import { useRecoilState } from 'recoil';
import { getNetworkLogicContractSelector } from '../../data/logicContracts';
import { WalletDetails } from '../../data/wallet';
import SubSectionTitle from '../common/typography/SubSectionTitle';
import DeployProxyContractPicker from './contractTypes/DeployProxyContractPicker';
import { getInitializationFunctionBuilder } from './contractTypes/initializationFunctionPicker';
import DeployContract from './DeployContract';
import { LogicContractDefinition } from './logicContracts';

export interface DeployLogicContractProps {
  logicContractDefinition: LogicContractDefinition;
  wallet: WalletDetails;
}

const DeployLogicContract = ({ logicContractDefinition, wallet }: DeployLogicContractProps) => {
  const networkName = wallet.network.key;

  const [logicContract, setLogicContract] = useRecoilState(
    getNetworkLogicContractSelector(logicContractDefinition.type),
  );

  const handleDeployed = (address: string) => {
    setLogicContract({ networkName, type: logicContractDefinition.type, address });
  };

  const handleClearContract = () => {
    setLogicContract(null);
  };

  return (
    <>
      <SubSectionTitle>{logicContractDefinition.type} Logic</SubSectionTitle>
      <DeployContract
        transactionRequest={logicContractDefinition.factory().getDeployTransaction()}
        buildAfterDeployTransactionRequest={getInitializationFunctionBuilder(logicContractDefinition.type)}
        existingContractAddress={logicContract?.address}
        onBeforeDeploy={() => setLogicContract(null)}
        onDeployed={handleDeployed}
        onClearContract={handleClearContract}
      />
      {logicContract?.address ? (
        <DeployProxyContractPicker
          wallet={wallet}
          type={logicContractDefinition.type}
          logicAddress={logicContract?.address}
        />
      ) : null}
    </>
  );
};
export default DeployLogicContract;
