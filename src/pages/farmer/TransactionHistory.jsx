import React from 'react'

import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/appbar/Appbar";
import MyTransaction from "../../component/shared/MyTransaction";

const TransactionHistory = () => {
  return (
    (
        <>
            <Appbar/>
            <FarmerSidebar/>  
            <MyTransaction />;
        </>
      )
  )
}

export default TransactionHistory