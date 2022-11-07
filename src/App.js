import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

//Pages
import { LoginPage } from "./pages/shared/LoginPage/LoginPage";

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
      <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </ThemeProvider>
    
  );
}

export default App;
