import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Varela Round', 'sans-serif'].join(','),
    button: {
      fontFamily: ['Work Sans', 'sans-serif'].join(','),
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      light: '#ECFBE5',
      main: '#6BC071',
      dark: '#226F3C',
      contrastText: '#fff',
    },
    secondary: {
      light: '#DCF8E3',
      main: '#347760',
      dark: '#104542',
      contrastText: '#fff',
    },
    error: {
      light: '#FFE8DF',
      main: '#FF6068',
      dark: '#931E43',
      contrastText: '#fff',
    },
    success: {
      light: '#EFFBD7',
      main: '#6EB534',
      dark: '#296810',
    },
    warning: {
      light: '#FEF8CC',
      main: '#F9C804',
      dark: '#906A01',
    },
    info: {
      light: '#D8FCF3',
      main: '#3ABFCA',
      dark: '#0B3E60',
    },
  },
  shape: {
    borderRadius: 18,
  },
});

export default theme;
