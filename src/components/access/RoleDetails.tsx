import React from 'react';
import { WalletDetails } from '../../data/wallet';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import DetailValue from '../common/typography/DetailValue';
import SubSectionTitle from '../common/typography/SubSectionTitle';
import { RoleDetail } from './accessHooks';
import RoleAssignmentDetail from './RoleAssignmentDetail';
import { findRoleDescriptionById, RoleDescription } from './roles';

export interface RoleDetailProps {
  wallet: WalletDetails;
  role: RoleDescription;
  details: RoleDetail | null;
  executing?: boolean;
  onAddToRole?: (address: string) => void;
  onRemoveFromRole?: (address: string) => void;
}

const RoleDetails = ({ wallet, role, details, executing, onAddToRole, onRemoveFromRole }: RoleDetailProps) => (
  <DetailField>
    <SubSectionTitle>{role.name}</SubSectionTitle>
    {details ? (
      <DetailField>
        <DetailTitle>AdminRole</DetailTitle>
        <DetailValue>{findRoleDescriptionById(details.adminRole)?.name || details.adminRole}</DetailValue>
        <DetailTitle>Accounts</DetailTitle>
        {details.assignments.map((assignment) => (
          <RoleAssignmentDetail
            key={assignment.address}
            wallet={wallet}
            roleId={role.id}
            assignment={assignment}
            executing={executing}
            onAddToRole={onAddToRole && details.canAdmin ? () => onAddToRole(assignment.address) : undefined}
            onRemoveFromRole={
              onRemoveFromRole && details.canAdmin ? () => onRemoveFromRole(assignment.address) : undefined
            }
          />
        ))}
      </DetailField>
    ) : (
      <DetailField>
        <DetailValue>No information available</DetailValue>
      </DetailField>
    )}
  </DetailField>
);
export default RoleDetails;
