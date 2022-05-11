import { createTheme, Palette, responsiveFontSizes } from '@mui/material/styles';

export const createAppTheme = (useDarkMode: boolean) =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode: useDarkMode ? 'dark' : 'light',
      },
      components: {
        MuiButton: {
          defaultProps: {
            variant: 'outlined',
          },
        },
        MuiFormControl: {
          defaultProps: {
            margin: 'normal',
            fullWidth: true,
            variant: 'outlined',
          },
        },
        MuiSelect: {
          defaultProps: {
            fullWidth: true,
            variant: 'outlined',
          },
        },
        MuiTextField: {
          defaultProps: {
            margin: 'normal',
            fullWidth: true,
            variant: 'outlined',
          },
        },
      },
      typography: (_palette: Palette) => ({}),
    }),
  );
