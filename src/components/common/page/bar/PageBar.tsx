import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import CityDAOLogo from '../../icons/citydao/CityDAOLogo';
import ClippingAppBar from './ClippingAppBar';

import PageBarTitle from './PageBarTitle';

const PageBar = () => (
  <ClippingAppBar data-qa="page-bar">
    <Toolbar>
      <CityDAOLogo />
      &nbsp;
      <PageBarTitle />
    </Toolbar>
  </ClippingAppBar>
);

export default PageBar;
