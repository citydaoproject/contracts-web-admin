import {
  SUPER_ADMIN_ROLE,
  PARCEL_MANAGER_ROLE,
  PAUSER_ROLE,
  UPGRADER_ROLE,
} from '@citydao/parcel-contracts/dist/src/constants/roles';

export interface RoleDescription {
  id: string;
  name: string;
}

export const superAdminRoleDescription = { id: SUPER_ADMIN_ROLE, name: 'Super Admin' };
export const parcelManagerRoleDescription = { id: PARCEL_MANAGER_ROLE, name: 'Parcel Manager' };
export const pauserRoleDescription = { id: PAUSER_ROLE, name: 'Pauser' };
export const upgraderRoleDescription = { id: UPGRADER_ROLE, name: 'Upgrader' };

export const knownRoles = [
  superAdminRoleDescription,
  parcelManagerRoleDescription,
  pauserRoleDescription,
  upgraderRoleDescription,
];
