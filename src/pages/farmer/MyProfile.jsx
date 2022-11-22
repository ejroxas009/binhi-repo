import React from 'react'

//components
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import Appbar from "../../component/shared/Appbar";
import Profile from "../../component/shared/Profile";

const MyProfile = () => {
  return (
    <>
        <Appbar/>
        <FarmerSidebar/>  
        <Profile/>
    </>
  )
}

export default MyProfile