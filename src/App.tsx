import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import router from "./router";

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

const theme = createTheme({
  palette: {
    neutral: {
      main: 'rgb(100, 100, 100)',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
