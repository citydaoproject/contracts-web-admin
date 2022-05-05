import { AccessControlUpgradeable } from '@citydao/parcel-contracts/dist/types/contracts/AccessControlUpgradeable';
import { AccessControlUpgradeable__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/AccessControlUpgradeable__factory';
import { useEffect, useMemo, useState } from 'react';
import { useWallet } from '../../hooks/wallet';
import { attachInterface } from '../../services/ethereum/contracts';
import { useExecuteTransaction } from '../transactions/transactionHooks';

export interface AccessRolesHook {
  accessControl: AccessControlUpgradeable | null;
  roleDetails: { [roleId: string]: RoleDetail };
  addToRole: (role: string, address: string) => Promise<boolean>;
  removeFromRole: (role: string, address: string) => Promise<boolean>;
  loading: boolean;
  executing: boolean;
}

export interface RoleDetails {
  [roleId: string]: RoleDetail;
}

export interface RoleDetail {
  adminRole: string;
  assignments: RoleAccountAssignment[];
  canAdmin: boolean;
}

export interface RoleAccountAssignment {
  address: string;
  hasRole: boolean;
}

export const useAccessRoles = (
  contractAddress: string,
  roleIds: string[],
  accounts: string[] = [],
): AccessRolesHook => {
  const { wallet } = useWallet();
  const [roleDetails, setRoleDetails] = useState<RoleDetails>({});
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const accessControl = useMemo<AccessControlUpgradeable | null>(
    () => attachInterface(AccessControlUpgradeable__factory.connect, contractAddress),
    [wallet],
  );

  const { execute, executing } = useExecuteTransaction();

  useEffect(() => {
    if (!accessControl) {
      setRoleDetails({});
      return;
    }

    // noinspection JSIgnoredPromiseFromCall
    loadRoleDetails();
  }, [wallet, accessControl, roleIds, accounts, count]);

  const updateCount = () => {
    setCount(count + 1);
  };

  const loadRoleDetails = async () => {
    if (!accessControl || loading) {
      return;
    }

    setLoading(true);
    let roleDetails = await Promise.all(
      roleIds.map(async (roleId) => {
        const [adminRole, accountAssignments] = await Promise.all([
          accessControl.getRoleAdmin(roleId),
          Promise.all(
            accounts.map(async (address) => {
              const hasRole = await accessControl.hasRole(roleId, address);
              return {
                address,
                hasRole,
              };
            }),
          ),
        ]);
        return { roleId, adminRole, assignments: accountAssignments, canAdmin: false };
      }),
    );

    if (wallet) {
      roleDetails = await Promise.all(
        roleDetails.map(async (roleDetail) => ({
          ...roleDetail,
          canAdmin: await accessControl.hasRole(roleDetail.adminRole, wallet.address),
        })),
      );
    }

    const keyedRoleDetails = roleDetails.reduce((acc, { roleId, ...restDetail }) => {
      acc[roleId] = { ...restDetail };
      return acc;
    }, {} as RoleDetails);

    setRoleDetails(keyedRoleDetails);
    setLoading(false);
  };

  const addToRole = async (role: string, address: string) => {
    if (!accessControl) {
      console.warn('no access control yet');
      return false;
    }

    const transactionRequest = await accessControl.populateTransaction.grantRole(role, address);
    const result = await execute(transactionRequest);
    if (!result) {
      return false;
    }

    updateCount();
    return true;
  };
  const removeFromRole = async (role: string, address: string) => {
    if (!accessControl) {
      console.warn('no access control yet');
      return false;
    }

    const transactionRequest = await accessControl.populateTransaction.revokeRole(role, address);
    const result = await execute(transactionRequest);
    if (!result) {
      return false;
    }

    updateCount();
    return true;
  };

  return { accessControl, roleDetails: roleDetails, addToRole, removeFromRole, loading, executing };
};
