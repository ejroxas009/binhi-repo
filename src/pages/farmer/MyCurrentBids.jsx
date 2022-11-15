import React from "react";

//components
import BidCard from "../../component/farmer/BidCard";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";

const MyCurrentBids = () => {
  return (
    <>
      <Appbar/>
      <FarmerSidebar/>
      <BidCard />
    </>
  );
};

export default MyCurrentBids;
