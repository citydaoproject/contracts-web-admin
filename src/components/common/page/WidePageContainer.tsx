import Grid from '@mui/material/Grid';
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children, ...rest }: PageContainerProps) => (
  <Grid {...rest} container justifyContent="center" spacing={2}>
    <Grid item xs={12} sm={12} md={10} lg={8} xl={6} children={children} />
  </Grid>
);
export default PageContainer;
