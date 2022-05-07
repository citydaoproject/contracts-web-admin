import { LogicContractType } from '../logicContracts';
import ParcelNFTContractFields from './parcelNFT/ParcelNFTContractFields';

export interface ContractFieldsPickerProps {
  type: LogicContractType;
  address: string;
}

const ContractFieldsPicker = ({ type, address }: ContractFieldsPickerProps) => {
  switch (type) {
    case LogicContractType.ParcelNFT:
      return <ParcelNFTContractFields address={address} />;
  }

  console.warn(`Unknown contract type: ${type} @ ${address}`);
  return null;
};
export default ContractFieldsPicker;
