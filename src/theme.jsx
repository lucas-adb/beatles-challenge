import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#66bb6a',
    },
  },
});

export default theme;
