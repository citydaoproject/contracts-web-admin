import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../../pages/Main';
import { BadRoute } from '../../../pages/BadRoute';
import { homePath } from './paths';

const AppRoutes = () => (
  <Routes>
    <Route path={homePath} element={<Main />} />
    <Route path="*" element={<BadRoute />} />
  </Routes>
);
export default AppRoutes;
