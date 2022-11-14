import React from 'react'
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

//services
import { getAccountById } from "../../service/shared/accountService";

const AdsCard = () => {

  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      // console.log(res.data);
      setAccount(res.data);
      setAccountToggle(!accountToggle);
    };
    getCurrentAccount(decoded.id);
  }, []);

  return (
    <div>AdCard</div>
  )
}

export default AdsCard