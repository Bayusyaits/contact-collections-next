import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red, yellow, green, teal } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: 'white',
          },
        },
      ],
    },
    MuiFormHelperText: {
      styleOverrides: {
        contained: {
          marginLeft: '6px',
          fontSize: '10px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        paddingCheckbox: {
          padding: '3px 8px !important',
        },
      },
    },
  },
  palette: {
    primary: {
      light: teal[400],
      main: teal[600],
      dark: teal[800],
    },
    secondary: {
      light: yellow[500],
      main: '#e6b000',
      dark: yellow[800],
    },
    success: {
      light: green[400],
      main: green[500],
      dark: green[600],
    },
    error: {
      light: red[500],
      main: red[600],
      dark: red[700],
    },
  },
  typography: {
    body2: {
      fontSize: 12,
    },
  },
});

export default theme;
