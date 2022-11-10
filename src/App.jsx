import * as React from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

//material
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// JWT Decode
import decode from "jwt-decode";

//pages
import { LoginPage } from "./pages/shared/LoginPage/LoginPage";

//farmerPages
import MyCurrentBids from "./pages/farmer/MyCurrentBids";
import MyCurrentAds from "./pages/farmer/MyCurrentAds";
import MyComplaints from "./pages/farmer/MyComplaints";

//service
import * as accountService from "./service/shared/accounts";


function App() {
  const [accessToken, setAccessToken] = React.useState(
          accountService.getAccessToken()
  );

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const date = new Date();

    if (token) {
      const decodedToken = decode(token);
      if (new Date(decodedToken.exp * 1000).getTime() <= date.getTime()) {
        handleLogout();
      }
    }
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#558b94",
      },
      secondary: {
        main: "#d3d3cd",
      },
    },
  });

  const handleLogout = () => {
    accountService.logout();
    window.location.reload();
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/login"
          element={
            accessToken ? (
              <Navigate to="/" />
            ) : (
              <LoginPage />
            )
          }
        />
      {/* Routes for Farmer */}
      <Route path="/myCurrentBids" element={<MyCurrentBids />} />
      <Route path="/myCurrentAds" element={<MyCurrentAds />} />
      <Route path="/myComplaints" element={<MyComplaints />} />

      {/* Routes for Buyer */}

      {/* Routes for admin */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
