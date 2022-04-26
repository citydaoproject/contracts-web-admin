import Typography from '@mui/material/Typography';
import * as React from 'react';
import { usePageTitle } from '../../hooks/page';

export const HomePage = () => {
  usePageTitle();

  return <Typography>Please choose an action from the left</Typography>;
};
