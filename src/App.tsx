import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { useMemo } from 'react';
import { RecoilRoot } from 'recoil';
import AppPage from './components/common/page/AppPage';
import AppRoutes from './components/common/routes/AppRoutes';
import { createAppTheme } from './style/theme';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createAppTheme(prefersDarkMode), [prefersDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <RecoilRoot>
          <AppPage>
            <AppRoutes />
          </AppPage>
        </RecoilRoot>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
export default App;
