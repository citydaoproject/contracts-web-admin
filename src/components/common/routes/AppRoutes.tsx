import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import DeployLogicPage from '../../../pages/deploy/DeployLogicPage';
import { HomePage } from '../../../pages/home/HomePage';
import { BadRoute } from '../../../pages/BadRoute';
import { deployLogicPath, homePath } from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={homePath} element={<HomePage />} />
    <Route path={deployLogicPath} element={<DeployLogicPage />} />
    <Route path="*" element={<BadRoute />} />
  </Routes>
);
export default AppRoutes;
