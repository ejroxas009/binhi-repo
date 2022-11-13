import * as React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

//material
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// JWT Decode
import decode from "jwt-decode";

//pages
import { LoginPage } from "./pages/shared/LoginPage/LoginPage";
import RegisterPage from "./pages/shared/RegisterPage";

//LandingPage
import LandingPage from "./pages/shared/LandingPage/LandingPage";

//farmerPages
import MyCurrentBids from "./pages/farmer/MyCurrentBids";
import MyCurrentAds from "./pages/farmer/MyCurrentAds";
import MyComplaints from "./pages/farmer/MyComplaints";

//service
import * as accountService from "./service/shared/accountService";
import theme from "./styles/Theme/Theme";

import PersistentDrawerLeft from "./component/shared/sidebar/Sidebar";
import Sidebar from "./component/shared/sidebar/Sidebar";
import SamplePage from "./pages/shared/SamplePage";

//pages - buyer
import ProfilePage from "./pages/shared/ProfilePage";

//pages - admin
import Users from "./pages/admin/UsersPage/Users";
import AdminDashboardPage from "./pages/admin/DashboardPage/AdminDashboardPage";
import AdminProfile from "./pages/admin/MyProfilePage/AdminProfile";
import ComplaintsPage from "./pages/admin/ComplaintsPage/ComplaintsPage";
import CoursesPage from "./pages/admin/CoursesPage/CoursesPage";
import FarmingTipsPage from "./pages/admin/FarmingTipsPage/FarmingTipsPage";
import AdvertisementPage from "./pages/admin/AdvertisementPage/AdvertisementPage";
import BlockedPosts from "./pages/admin/AdvertisementPage/BlockedPosts";


function App() {
  const [accessToken, setAccessToken] = React.useState(
    accountService.getAccessToken()
  );
  const [decodedToken, setDecodedToken] = useState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   const date = new Date();

  //   if (token) {
  //     const decodedToken = decode(token);
  //     setDecodedToken(decodedToken);
  //     if (new Date(decodedToken.exp * 1000).getTime() <= date.getTime()) {
  //       handleLogout();
  //     }
  //   }
  //   setAccessToken(localStorage.getItem("accessToken"));
  // }, []);

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#558b94",
  //     },
  //     secondary: {
  //       main: "#d3d3cd",
  //     },
  //   },
  // });

  const handleLogout = () => {
    accountService.logout();
    window.location.reload();
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* <Sidebar/> */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            accessToken ? (
              <Navigate to="/" />
            ) : (
              <LoginPage onSetAccessToken={setAccessToken} />
            )
          }
        />
        <Route
          path="/register"
          element={accessToken ? <Navigate to="/" /> : <RegisterPage />}
        />
        
      {/* Routes for Farmer */}
      <Route path="/farmer/myCurrentBids" 
      element={
            accessToken ? (
              <MyCurrentBids token={accessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      <Route path="/farmer/myCurrentAds" 
      element={
            accessToken ? (
              <MyCurrentAds token={accessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      <Route path="/farmer/myComplaints" 
      element={
            accessToken ? (
              <MyComplaints token={accessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Routes for Buyer */}
        <Route
          path="/buyer/profile"
          element={
            accessToken ? (
              <ProfilePage token={accessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Routes for admin */}
        <Route
          path="/admin/dashboard"
          element={accessToken ? <Navigate to="/" /> : <AdminDashboardPage />}
        />
        <Route
          path="/admin/users"
          element={accessToken ? <Users />: <Navigate to="/" /> }
        />
        <Route
          path="/admin/profile"
          element={accessToken ? <Navigate to="/" /> : <AdminProfile />}
        />
        <Route
          path="/admin/complaints"
          element={accessToken ? <Navigate to="/" /> : <ComplaintsPage />}
        />
        <Route
          path="/admin/courses"
          element={accessToken ? <Navigate to="/" /> : <CoursesPage />}
        />
        <Route
          path="/admin/farmingtips"
          element={accessToken ? <Navigate to="/" /> : <FarmingTipsPage />}
        />
        <Route
          path="/admin/ads"
          element={accessToken ? <Navigate to="/" /> : <AdvertisementPage />}
        />
        <Route
          path="/admin/ads/blocked"
          element={accessToken ? <Navigate to="/" /> : <BlockedPosts />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
