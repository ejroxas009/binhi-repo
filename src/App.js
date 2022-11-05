import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#000000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>Binhi</div>
    </ThemeProvider>
  );
}

export default App;
