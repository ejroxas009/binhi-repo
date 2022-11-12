import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getAccountById } from "../../service/shared/accountService";
import Profile from "../../component/shared/Profile";

const ProfilePage = ({ token }) => {
  return <Profile />;
};

export default ProfilePage;
