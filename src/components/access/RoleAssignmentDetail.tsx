import IconButton from '@mui/material/IconButton';
import React from 'react';
import { WalletDetails } from '../../data/wallet';
import AddIcon from '../common/actions/AddIcon';
import RemoveIcon from '../common/actions/RemoveIcon';
import DetailValue from '../common/typography/DetailValue';
import TooltipItem from '../common/typography/TooltipItem';
import WalletIcon from '../wallet/WalletIcon';
import { RoleAccountAssignment } from './accessHooks';
import { superAdminRoleDescription } from './roles';

export interface RoleActionProps {
  wallet: WalletDetails;
  roleId: string;
  assignment: RoleAccountAssignment;
  executing?: boolean;
  onAddToRole?: () => void;
  onRemoveFromRole?: () => void;
}

const RoleAssignmentDetail = ({
  wallet,
  roleId,
  assignment,
  executing,
  onAddToRole,
  onRemoveFromRole,
}: RoleActionProps) => {
  const isWallet = wallet.address === assignment.address;

  return (
    <>
      <DetailValue>
        {isWallet ? (
          <TooltipItem title="Your Wallet">
            <WalletIcon fontSize="small" />
          </TooltipItem>
        ) : null}{' '}
        {assignment.address}: {assignment.hasRole ? '✅' : '🚫 '}{' '}
        {assignment.hasRole ? (
          onRemoveFromRole && !(roleId === superAdminRoleDescription.id && isWallet) ? (
            <TooltipItem title="Remove account from role">
              <IconButton color="inherit" size="small" onClick={onRemoveFromRole} disabled={executing}>
                <RemoveIcon />
              </IconButton>
            </TooltipItem>
          ) : null
        ) : onAddToRole ? (
          <TooltipItem title="Add account to role">
            <IconButton color="inherit" size="small" onClick={onAddToRole} disabled={executing}>
              <AddIcon />
            </IconButton>
          </TooltipItem>
        ) : null}
      </DetailValue>
      <DetailValue></DetailValue>
    </>
  );
};
export default RoleAssignmentDetail;
