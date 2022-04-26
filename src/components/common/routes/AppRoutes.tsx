import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import DeployPage from '../../../pages/deploy/DeployPage';
import { HomePage } from '../../../pages/home/HomePage';
import { BadRoute } from '../../../pages/BadRoute';
import { deployPath, homePath } from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={homePath} element={<HomePage />} />
    <Route path={deployPath} element={<DeployPage />} />
    <Route path="*" element={<BadRoute />} />
  </Routes>
);
export default AppRoutes;
