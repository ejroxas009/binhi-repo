import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./pages/shared/LandingPage";
import theme from "./styles/Theme/Theme";
import Appbar from "./component/shared/appbar";
import ResponsiveAppBar from "./component/shared/Navbar/navbar";

function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <Appbar />
      <CssBaseline />
      <LandingPage/>
    </ThemeProvider>
  );
}

export default App;
