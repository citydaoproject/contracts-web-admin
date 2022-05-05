import React, { useMemo, useState } from 'react';
import { WalletDetails } from '../../data/wallet';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import SectionTitle from '../common/typography/SectionTitle';
import SubSectionTitle from '../common/typography/SubSectionTitle';
import ContractLink from '../contracts/ContractLink';
import { getLogicContractDefinition, LogicContractType } from '../contracts/logicContracts';
import { useAccessRoles } from './accessHooks';
import AddressList from './AddressList';
import RoleDetails from './RoleDetails';

export interface RolesSectionProps {
  wallet: WalletDetails;
  type: LogicContractType;
  contractAddress: string;
}

const RolesSection = ({ wallet, type, contractAddress }: RolesSectionProps) => {
  const roles = useMemo(() => getLogicContractDefinition(type).roles, [wallet.address, type]);
  const [otherAddresses, setOtherAddresses] = useState<string[]>([]);

  const accounts = useMemo(() => [wallet.address, ...otherAddresses], [wallet.address, otherAddresses]);

  const roleIds = useMemo(() => roles.map(({ id }) => id), [roles]);

  const { roleDetails, addToRole, removeFromRole, loading, executing } = useAccessRoles(
    contractAddress,
    roleIds,
    accounts,
  );

  const handleAddOtherAddress = (otherAddress: string) => {
    setOtherAddresses([...otherAddresses, otherAddress]);
  };

  const handleRemoveOtherAddress = (otherAddress: string) => {
    setOtherAddresses(otherAddresses.filter((a) => a !== otherAddress));
  };

  const handleAddToRole = async (role: string, account: string) => {
    if (!(await addToRole(role, account))) {
      return;
    }

    console.log(`Added ${account} to role:`, role);
  };

  const handleRemoveFromRole = async (role: string, account: string) => {
    if (!(await removeFromRole(role, account))) {
      return;
    }

    console.log(`Removed ${account} from role:`, role);
  };

  return (
    <>
      <SectionTitle>Roles for {type}</SectionTitle>
      <DetailField>
        <DetailTitle>Contract Address</DetailTitle>
        <ContractLink address={contractAddress} />
      </DetailField>
      <AddressList
        addresses={otherAddresses}
        onAddAddress={handleAddOtherAddress}
        onRemoveAddress={handleRemoveOtherAddress}
      />
      <SubSectionTitle></SubSectionTitle>
      {roles.map((role) => (
        <RoleDetails
          key={role.id}
          wallet={wallet}
          role={role}
          details={roleDetails[role.id] || null}
          executing={loading || executing}
          onAddToRole={(address) => handleAddToRole(role.id, address)}
          onRemoveFromRole={(address) => handleRemoveFromRole(role.id, address)}
        />
      ))}
    </>
  );
};
export default RolesSection;
