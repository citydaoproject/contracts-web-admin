import { WalletDetails } from '../../../data/wallet';
import { LogicContractType } from '../logicContracts';
import DeployParcelNFTProxy from './parcelNFT/DeployParcelNFTProxy';

export interface ContractDeployProxyPickerProps {
  wallet: WalletDetails;
  type: LogicContractType;
  logicAddress: string;
}

const DeployProxyContractPicker = ({ wallet, type, logicAddress }: ContractDeployProxyPickerProps) => {
  switch (type) {
    case LogicContractType.ParcelNFT:
      return <DeployParcelNFTProxy wallet={wallet} logicAddress={logicAddress} />;
  }

  console.warn(`Unknown contract type: ${type} @ ${logicAddress}`);
  return null;
};
export default DeployProxyContractPicker;
