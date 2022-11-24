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
import * as accountService from "../../service/shared/accountService";
import * as complaintsService from "../../service/admin/complaintService";
import * as farmingTipsService from "../../service/admin/farmingTipsService";
import * as cropService from "../../service/admin/cropService";

const AdminDashboard = () => {
  const [toggle, setToggle] = useState(false);
  const [allAccounts, setAllAccounts] = useState();
  const [activeAccounts, setActiveAccounts] = useState();
  const [deactivatedAccounts, setDeactivatedAccounts] = useState();
  const [allAds, setAllAds] = useState();
  const [activeAds, setActiveAds] = useState();
  const [deactivatedAds, setDeactivatedAds] = useState();
  const [allBids, setAllBids] = useState();
  const [acceptedBids, setAcceptedBids] = useState();
  const [rejectedBids, setRejectedBids] = useState();

  const [allComplaints, setAllComplaints] = useState();
  const [viewedComplaints, setViewedComplaints] = useState();
  const [resolvedComplaints, setResolvedComplaints] = useState();
  const [allCourses, setAllCourses] = useState();
  const [enrolledCourses, setEnrolledCourses] = useState();
  const [allFarmingTips, setAllFarmingTips] = useState();
  const [allCrops, setAllCrops] = useState();

  const getAllAccount = async () => {
    const res = await accountService.getAllAccount();
    setAllAccounts(res.data);
    //setToggle(!toggle);

    const activeAccounts = res.data.filter((account) => account.active);
    setActiveAccounts(activeAccounts);
    const deactivatedAccounts = res.data.filter((account) => !account.active);
    setDeactivatedAccounts(deactivatedAccounts);
  };

  const getAllAds = async () => {
    const res = await transactionService.getAllAds();
    setAllAds(res.data);
    const activeAds = res.data.filter((ads) => ads.active);
    setActiveAds(activeAds);
    const deactivatedAds = res.data.filter((ads) => !ads.active);
    setDeactivatedAds(deactivatedAds);
  };

  const getAllBids = async () => {
    const res = await transactionService.getAllBids();
    setAllBids(res.data);
    const acceptedBids = res.data.filter((bid) => bid.accept && bid.approved);
    setAcceptedBids(acceptedBids);
    const rejectedBids = res.data.filter((bid) => bid.accept && !bid.approved);
    setRejectedBids(rejectedBids);
  };

  const getAllComplaints = async () => {
    const res = await complaintsService.viewComplaints();
    setAllComplaints(res.data);
    const viewedComplaints = res.data.filter((complaint) => complaint.read);
    setViewedComplaints(viewedComplaints);
    const resolvedComplaints = res.data.filter(
      (complaint) => complaint.resolved
    );
    setResolvedComplaints(resolvedComplaints);
  };

  const getOthers = async () => {
    const res = await courseService.viewCourses();
    setAllCourses(res.data);
    const res2 = await courseService.getCourseEnroll();
    setEnrolledCourses(res2.data);
    const res3 = await farmingTipsService.viewTips();
    setAllFarmingTips(res3.data);
    const res4 = await cropService.getAllCrops();
    setAllCrops(res4.data);
    setToggle(!toggle);
  };

  useEffect(() => {
    getAllAccount();
    getAllAds();
    getAllBids();
    getAllComplaints();
    getOthers();
  }, []);

  useEffect(() => {
    console.log(allAccounts);
    console.log(activeAccounts);
    console.log(deactivatedAccounts);
    console.log(allAds);
    console.log(activeAds);
    console.log(deactivatedAds);
    console.log(allBids);
    console.log(acceptedBids);
    console.log(rejectedBids);
    console.log(allComplaints);
    console.log(viewedComplaints);
    console.log(resolvedComplaints);
    console.log(allCourses);
    console.log(enrolledCourses);
    console.log(allFarmingTips);
    console.log(allCrops);
  }, [toggle]);

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Card>
            <CardHeader title="User Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {allAccounts && (
                      <DashboardCard
                        header="Users"
                        data={allAccounts.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {activeAccounts && (
                      <DashboardCard
                        header="Active Accounts"
                        data={activeAccounts.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {deactivatedAccounts && (
                      <DashboardCard
                        header="Deactivated Accounts"
                        data={deactivatedAccounts.length}
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
            <CardHeader title="Advertisement Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {allAds && (
                      <DashboardCard
                        header="Advertisements"
                        data={allAds.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {activeAds && (
                      <DashboardCard
                        header="Active Ads"
                        data={activeAds.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {deactivatedAds && (
                      <DashboardCard
                        header="Deactivated Ads"
                        data={deactivatedAds.length}
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
                    {allBids && (
                      <DashboardCard
                        header="Bids"
                        data={allBids.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {acceptedBids && (
                      <DashboardCard
                        header="Accepted Bids"
                        data={acceptedBids.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {rejectedBids && (
                      <DashboardCard
                        header="Rejected Bids"
                        data={rejectedBids.length}
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
                    {allComplaints && (
                      <DashboardCard
                        header="Complaints"
                        data={allComplaints.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {viewedComplaints && (
                      <DashboardCard
                        header="Viewed Complaints"
                        data={viewedComplaints.length}
                        bgColor="#ffc066"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {resolvedComplaints && (
                      <DashboardCard
                        header="Resolved Complaints"
                        data={resolvedComplaints.length}
                        bgColor="#ffc066"
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
            <CardHeader title="Course Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {allCourses && (
                      <DashboardCard
                        header="Course"
                        data={allCourses.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {enrolledCourses && (
                      <DashboardCard
                        header="Enrolled Farmers"
                        data={enrolledCourses.length}
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
            <CardHeader title="Farming Tips and Crops Summary" />
            <Grid item xs={12}>
              <CardContent>
                <Grid container>
                  <Grid item={4}>
                    {allFarmingTips && (
                      <DashboardCard
                        header="Farming Tips"
                        data={allFarmingTips.length}
                        bgColor="#558b94"
                      />
                    )}
                  </Grid>
                  <Grid item={4}>
                    {allCrops && (
                      <DashboardCard
                        header="Crop Categories"
                        data={allCrops.length}
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

export default AdminDashboard;
