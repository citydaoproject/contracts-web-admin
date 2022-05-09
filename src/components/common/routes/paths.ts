import { useNavigate } from 'react-router';
import { LogicContractType } from '../../contracts/logicContracts';

export const homePath = '/';

export const deployPath = '/deploy';
export const contractsPath = '/contracts';

export const merkleTreesPath = '/merkle-trees';
export const newMerkleTreesPath = `${merkleTreesPath}/new`;

export const rolesBasePath = '/roles';
export interface RolesParams {
  type: LogicContractType;
  address: string;
}
export const parameterizedRolesPath = `${rolesBasePath}/:type/:address`;

export const buildRolesPath = (type: LogicContractType, address: string) => `${rolesBasePath}/${type}/${address}`;

export const usePaths = () => {
  const navigate = useNavigate();

  return {
    gotoHome: () => navigate(homePath),
    gotoDeploy: () => navigate(deployPath),
    gotoContracts: () => navigate(contractsPath),
    gotoMerkleTrees: () => navigate(merkleTreesPath),
    gotoRoles: (type: LogicContractType, address: string) => navigate(buildRolesPath(type, address)),
  };
};
