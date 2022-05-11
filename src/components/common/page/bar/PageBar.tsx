import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import CityDAOLogo from '../../icons/citydao/CityDAOLogo';
import PageBarActions from './PageBarActions';
import PageBarBalance from './PageBarBalance';
import PageBarDivider from './PageBarDivider';
import ClippingAppBar from './ClippingAppBar';

import PageBarTitle from './PageBarTitle';

const PageBar = () => (
  <ClippingAppBar data-qa="page-bar">
    <Toolbar>
      <CityDAOLogo />
      &nbsp;
      <PageBarTitle />
      <PageBarBalance />
      <PageBarDivider />
      <PageBarActions />
    </Toolbar>
  </ClippingAppBar>
);

export default PageBar;
