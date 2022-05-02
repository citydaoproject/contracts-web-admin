import { WalletDetails } from '../../data/wallet';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import SectionTitle from '../common/typography/SectionTitle';
import SubSectionTitle from '../common/typography/SubSectionTitle';
import ContractLink from '../contracts/ContractLink';
import { getLogicContractDefinition, LogicContractType } from '../contracts/logicContracts';

export interface RolesSectionProps {
  wallet: WalletDetails;
  type: LogicContractType;
  address: string;
}

const RolesSection = ({ wallet, type, address }: RolesSectionProps) => {
  const { roles } = getLogicContractDefinition(type);

  return (
    <>
      <SectionTitle>Roles for {type}</SectionTitle>
      <DetailField>
        <DetailTitle>Address</DetailTitle>
        <ContractLink address={address} />
      </DetailField>
      <SubSectionTitle>Roles</SubSectionTitle>
      {roles.map((role) => (
        <DetailField key={role.id}>
          <DetailTitle>{role.name}</DetailTitle>
        </DetailField>
      ))}
    </>
  );
};
export default RolesSection;
