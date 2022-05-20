import {
  SUPER_ADMIN_ROLE,
  OWNERSHIP_MANAGER_ROLE,
  PARCEL_MANAGER_ROLE,
  PAUSER_ROLE,
  UPGRADER_ROLE,
} from '@citydao/parcel-contracts/dist/src/constants/roles';

export interface RoleDescription {
  id: string;
  name: string;
}

export const superAdminRoleDescription = { id: SUPER_ADMIN_ROLE, name: 'Super Admin' };
export const ownershipManagerDescription = { id: OWNERSHIP_MANAGER_ROLE, name: 'Ownership Manager' };
export const parcelManagerRoleDescription = { id: PARCEL_MANAGER_ROLE, name: 'Parcel Manager' };
export const pauserRoleDescription = { id: PAUSER_ROLE, name: 'Pauser' };
export const upgraderRoleDescription = { id: UPGRADER_ROLE, name: 'Upgrader' };

export const knownRoles = [
  superAdminRoleDescription,
  ownershipManagerDescription,
  parcelManagerRoleDescription,
  pauserRoleDescription,
  upgraderRoleDescription,
];

export const findRoleDescriptionById = (id: string): RoleDescription | undefined =>
  knownRoles.find((role) => role.id === id);
