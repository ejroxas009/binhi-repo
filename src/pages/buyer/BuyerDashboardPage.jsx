import React from "react";
import BuyerDashboard from "../../component/buyer/BuyerDashboard";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";

const BuyerDashboardPage = () => {
  const AppSettingAltIcon = <AppSettingsAltIcon />;
  return (
    <>
      <BuyerDashboard header="Orders Received" data="485" bgColor="blue" />
    </>
  );
};

export default BuyerDashboardPage;
