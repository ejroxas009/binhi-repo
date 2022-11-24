import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DashboardCard from "./DashboardCard";
import jwtDecode from "jwt-decode";
import { getAccountById } from "../../../../service/shared/accountService";
import * as transactionService from "../../../../service/buyer/MyTransactionService";

import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";

const AdminDashboard = () => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [myAds, setMyAds] = useState();
  const [myActiveAds, setMyActiveAds] = useState();
  const [myToggle, setMyToggle] = useState(false);
  const [myBids, setMyBids] = useState();
  const [myApprovedBids, setMyApprovedBids] = useState();
  const [myPendingBids, setMyPendingBids] = useState();
  const [myRejectedBids, setMyRejectedBids] = useState();
  const [myComplaints, setMyComplaints] = useState();
  const [myReadComplaints, setMyReadComplaints] = useState();
  const [myResolvedComplaints, setMyResolvedComplaints] = useState();
  const [myCropPayments, setMyCropPayments] = useState();
  const [mySentPayment, setMySentPayment] = useState();
  const [myPaidCrops, setMyPaidCrops] = useState();
  const [myReceivedPayments, setMyReceivedPayments] = useState();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      setAccount(res.data);
      setToggle(!toggle);
    };
    getCurrentAccount(decoded.id);
  }, []);

  useEffect(() => {
    console.log(account);
  }, [toggle]);

  //-----------Ads ----------------------
  const getMyAds = async () => {
    const res = await transactionService.getAllAds();
    if (account) {
      //---total ads of user -------------
      const myAds = res.data.filter(
        (ads) => ads.account.accountId == account.accountId
      );
      setMyAds(myAds);
      setMyToggle(!myToggle);
      //--------active ads of user ----------
      const myActiveAds = res.data.filter(
        (ads) => ads.account.accountId == account.accountId && ads.active
      );
      setMyActiveAds(myActiveAds);
    }
  };

  //------------Bids----------------------
  const getMyBids = async () => {
    const res = await transactionService.getAllBids();
    if (account) {
      //--------All Bids -------------------
      const myBids = res.data.filter(
        (bid) => bid.account.accountId == account.accountId
      );
      setMyBids(myBids);

      const myApprovedBids = res.data.filter(
        (bid) =>
          bid.account.accountId == account.accountId &&
          bid.approved &&
          bid.accept
      );
      setMyApprovedBids(myApprovedBids);
      //-----------Pending Bids ---------------------
      const myPendingBids = res.data.filter(
        (bid) =>
          bid.account.accountId == account.accountId &&
          !bid.approved &&
          !bid.accept
      );
      setMyPendingBids(myPendingBids);

      //------------Rejected Bids --------------------
      const myRejectedBids = res.data.filter(
        (bid) =>
          bid.account.accountId == account.accountId &&
          !bid.approved &&
          bid.accept
      );
      setMyRejectedBids(myRejectedBids);
    }
  };

  const getMyComplaints = async () => {
    const res = await transactionService.getAllComplaints();
    if (account) {
      //---------All User Compplaints
      const myComplaints = res.data.filter(
        (complaint) => complaint.account.accountId == account.accountId
      );
      setMyComplaints(myComplaints);
      //----------My Read Complaints -----------------
      const myReadComplaints = res.data.filter(
        (complaint) =>
          complaint.account.accountId == account.accountId && complaint.read
      );
      setMyReadComplaints(myReadComplaints);

      //-----------My Resolved Complaints -----------------
      const myResolvedComplaints = res.data.filter(
        (complaint) =>
          complaint.account.accountId == account.accountId &&
          complaint.read &&
          complaint.resolved
      );
      setMyResolvedComplaints(myResolvedComplaints);
    }
  };

  const getAllCropPayment = async () => {
    const res = await transactionService.getAllCropPayment();
    if (account) {
      //-----------all crop payment by user ------------
      const myCropPayment = res.data.filter(
        (payment) => payment.account.accountId == account.accountId
      );
      setMyCropPayments(myCropPayment);
      //----------Mark as paid -------------------------
      const mySentPayment = res.data.filter(
        (payment) =>
          payment.account.accountId == account.accountId && payment.markAsPaid
      );
      setMySentPayment(mySentPayment);
      //-------------My Paid Crops --------------------
      const myPaidCrops = res.data.filter(
        (payment) =>
          payment.account.accountId == account.accountId &&
          payment.markAsPaid &&
          payment.paid
      );
      setMyPaidCrops(myPaidCrops);
      //------------My Received Payments -----------------------
      const myReceivedPayment = res.data.filter(
        (payment) =>
          payment.bid.account.accountId == account.accountId &&
          payment.markAsPaid &&
          payment.paid
      );
      setMyReceivedPayments(myReceivedPayment);
    }
  };

  useEffect(() => {
    getMyAds();
    getMyBids();
    getMyComplaints();
    getAllCropPayment();
  }, [toggle]);

  useEffect(() => {
    console.log(myAds);
    console.log(myBids);
    console.log(myComplaints);
    console.log(myActiveAds);
  }, [myToggle]);

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <DashboardCard
            header="Orders Received"
            data="485"
            bgColor="#558b94"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <DashboardCard
            header="Orders Received"
            data="486"
            bgColor="#ffc066"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <DashboardCard
            header="Orders Received"
            data="485"
            bgColor="#fe6a84"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <DashboardCard
            header="Orders Received"
            data="485"
            bgColor="#55a4ff"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <DashboardCard
            header="Orders Received"
            data="485"
            bgColor="#ffc066"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <DashboardCard
            header="Orders Received"
            data="485"
            bgColor="#ffc066"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
