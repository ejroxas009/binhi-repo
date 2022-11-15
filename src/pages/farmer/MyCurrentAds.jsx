import React from "react";

//components
import AdsCard from "../../component/farmer/AdsCard";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyCurrentAds = () => {

  return (
      <>
        <Appbar/>
        <FarmerSidebar/>
        <AdsCard /> 
      </>); 
  
};

export default MyCurrentAds;
