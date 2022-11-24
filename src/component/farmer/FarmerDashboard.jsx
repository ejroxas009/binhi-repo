import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DashboardCard from "../shared/DashboardCard";
import jwtDecode from "jwt-decode";
import { getAccountById } from "../../service/shared/accountService";
import * as transactionService from "../../service/buyer/MyTransactionService";
import * as courseService from "../../service/admin/courseService";

import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";

const FarmerDashboard = () => {
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
  const [myAvailableCourses, setMyAvailableCourses] = useState();
  const [myEnrolledCourses, setMyEnrolledCourses] = useState();

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

  const getMyCourses = async () => {
    const res = await courseService.viewCourses();
    setMyAvailableCourses(res.data);
    const res2 = await courseService.getCourseEnroll();
    console.log(res2);
    if (account) {
      const myEnrolledCourses = res2.data.filter(
        (course) => course.account.accountId == account.accountId
      );
      setMyEnrolledCourses(myEnrolledCourses);
    }
  };

  useEffect(() => {
    getMyAds();
    getMyBids();
    getMyComplaints();
    getAllCropPayment();
    getMyCourses();
  }, [toggle]);

  useEffect(() => {
    console.log(myAds);
    console.log(myBids);
    console.log(myComplaints);
    console.log(myActiveAds);
    console.log(myApprovedBids);
    console.log(myPendingBids);
    console.log(myRejectedBids);
    console.log(myReadComplaints);
    console.log(myResolvedComplaints);
    console.log(myCropPayments);
    console.log(mySentPayment);
    console.log(myPaidCrops);
    console.log(myReceivedPayments);
    console.log(myAvailableCourses);
    console.log(myEnrolledCourses);
  }, [myToggle]);

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Marketplace Activity" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {myAds && (
                      <DashboardCard
                        header="Posted Ads"
                        data={myAds.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myBids && (
                      <DashboardCard
                        header="Total Bids Sent"
                        data={myBids.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myComplaints && (
                      <DashboardCard
                        header="Complaints Filed"
                        data={myComplaints.length}
                        bgColor="#fe6a84"
                      />
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Bid Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {myApprovedBids && (
                      <DashboardCard
                        header="Accepted Bids"
                        data={myApprovedBids.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myPendingBids && (
                      <DashboardCard
                        header="Pending Bids"
                        data={myPendingBids.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myRejectedBids && (
                      <DashboardCard
                        header="Rejected Bids"
                        data={myRejectedBids.length}
                        bgColor="#fe6a84"
                      />
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Orders Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {myCropPayments && (
                      <DashboardCard
                        header="Unpaid Orders"
                        data={myCropPayments.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myPaidCrops && (
                      <DashboardCard
                        header="Paid Orders"
                        data={myPaidCrops.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myReceivedPayments && (
                      <DashboardCard
                        header="No of Sales"
                        data={myReceivedPayments.length}
                        bgColor="#fe6a84"
                      />
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Complaints Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {myReadComplaints && (
                      <DashboardCard
                        header="Viewed Complaints"
                        data={myReadComplaints.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myResolvedComplaints && (
                      <DashboardCard
                        header="Resolved Complaints"
                        data={myResolvedComplaints.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}></Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Course Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {myAvailableCourses && (
                      <DashboardCard
                        header="Available Courses"
                        data={myAvailableCourses.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {myEnrolledCourses && (
                      <DashboardCard
                        header="Enrolled Courses"
                        data={myEnrolledCourses.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}></Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default FarmerDashboard;
