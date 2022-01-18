import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3fa8b5',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: grey[400]
    },
    text: {
      primary: 'rgba(76,76,76,0.87)',
      secondary: 'rgba(0,0,0,0.89)',
    },
  }
});

export default theme;