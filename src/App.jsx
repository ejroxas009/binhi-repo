import * as React from "react";
// import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//material
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// JWT Decode
// import decode from "jwt-decode";

//pages
import { LoginPage } from "./pages/shared/LoginPage/LoginPage";
import RegisterPage from "./pages/shared/RegisterPage";

//LandingPage
import LandingPage from "./pages/shared/LandingPage/LandingPage";

//farmerPages
import FarmerDashboardPage from "./pages/farmer/FarmerDashboardPage";
import MyProfile from "./pages/farmer/MyProfile";
import MarketplacePage from "./pages/farmer/MarketplacePage";
import TransactionHistory from "./pages/farmer/TransactionHistory";
import Courses from "./pages/farmer/Courses";
import MyCurrentBids from "./pages/farmer/MyCurrentBids";
import MyCurrentAds from "./pages/farmer/MyCurrentAds";
import MyComplaints from "./pages/farmer/MyComplaints";
import MyCourses from "./pages/farmer/MyCourses";
import ViewAllBids from "./pages/farmer/ViewAllBids";

//service
import * as accountService from "./service/shared/accountService";
import theme from "./styles/Theme/Theme";

//pages - buyer
import ProfilePage from "./pages/buyer/ProfilePage";
import MyTransacionPage from "./pages/buyer/MyTransacionPage";
import MarketPlacePage from "./pages/buyer/MarketPlacePage";
import CurrentBidsPage from "./pages/buyer/CurrentBidsPage";
import CurrentAdsPage from "./pages/buyer/CurrentAdsPage";
import ComplaintPage from "./pages/buyer/ComplaintPage";
import ViewMyBids from "./pages/buyer/ViewMyBids";
import BuyerDashboardPage from "./pages/buyer/BuyerDashboardPage";

//pages - admin
import Users from "./pages/admin/UsersPage/Users";
import AdminDashboardPage from "./pages/admin/DashboardPage/AdminDashboardPage";
import AdminProfile from "./pages/admin/MyProfilePage/AdminProfile";
import ComplaintsPage from "./pages/admin/ComplaintsPage/ComplaintsPage";
import CoursesPage from "./pages/admin/CoursesPage/CoursesPage";
import FarmingTipsPage from "./pages/admin/FarmingTipsPage/FarmingTipsPage";
import AdvertisementPage from "./pages/admin/AdvertisementPage/AdvertisementPage";
import Appbar from "./component/shared/Appbar";

function App() {
  const [accessToken, setAccessToken] = React.useState(
    accountService.getAccessToken()
  );
  // const [decodedToken, setDecodedToken] = useState();

  // const navigate = useNavigate();

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

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onSetAccessToken={setAccessToken} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Routes for Farmer */}
        <Route
          path="/farmer/dashboard"
          element={accessToken ? <FarmerDashboardPage /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/profile"
          element={accessToken ? <MyProfile /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/marketplace"
          element={accessToken ? <MarketplacePage /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/transaction-history"
          element={accessToken ? <TransactionHistory /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/courses"
          element={accessToken ? <Courses /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/current-bids"
          element={accessToken ? <MyCurrentBids /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/current-ads"
          element={accessToken ? <MyCurrentAds /> : <Navigate to="/" />}
        />
        <Route
          path="/farmer/complaints"
          element={accessToken ? <MyComplaints /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/enrolled-courses"
          element={accessToken ? <MyCourses /> : <Navigate to="/" />}
        />

        <Route
          path="/farmer/current-ads/:id/allBids"
          element={accessToken ? <ViewAllBids /> : <Navigate to="/" />}
        />

        {/* Routes for Buyer */}
        <Route
          path="/buyer/dashboard"
          element={accessToken ? <BuyerDashboardPage /> : <Navigate to="/" />}
        />

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
        <Route
          path="/buyer/transaction-history"
          element={accessToken ? <MyTransacionPage /> : <Navigate to="/" />}
        />
        <Route
          path="/buyer/marketplace"
          element={accessToken ? <MarketPlacePage /> : <Navigate to="/" />}
        />
        <Route
          path="/buyer/current-bids"
          element={accessToken ? <CurrentBidsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/buyer/current-ads"
          element={accessToken ? <CurrentAdsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/buyer/complaints"
          element={accessToken ? <ComplaintPage /> : <Navigate to="/" />}
        />

        <Route
          path="/buyer/current-ads/:id/allBids"
          element={accessToken ? <ViewMyBids /> : <Navigate to="/" />}
        />

        {/* Routes for admin */}
        <Route
          path="/admin/dashboard"
          element={accessToken ? <AdminDashboardPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/profile"
          element={accessToken ? <AdminProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/users"
          element={accessToken ? <Users /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/profile"
          element={accessToken ? <AdminProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/complaints"
          element={accessToken ? <ComplaintsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/courses"
          element={accessToken ? <CoursesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/farmingtips"
          element={accessToken ? <FarmingTipsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/ads"
          element={accessToken ? <AdvertisementPage /> : <Navigate to="/" />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
