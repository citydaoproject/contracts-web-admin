import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import RolesPage from '../../../pages/access/RolesPage';
import { BadRoute } from '../../../pages/BadRoute';
import ContractsPage from '../../../pages/contracts/ContractsPage';
import DeployPage from '../../../pages/deploy/DeployPage';
import { HomePage } from '../../../pages/home/HomePage';
import { contractsPath, deployPath, homePath, parameterizedRolesPath } from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={homePath} element={<HomePage />} />
    <Route path={deployPath} element={<DeployPage />} />
    <Route path={contractsPath} element={<ContractsPage />} />
    <Route path={parameterizedRolesPath} element={<RolesPage />} />
    <Route path="*" element={<BadRoute />} />
  </Routes>
);
export default AppRoutes;
