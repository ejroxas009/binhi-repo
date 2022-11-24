import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import jwtDecode from "jwt-decode";

//material UI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import { green } from "@mui/material/colors";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import IconButton from "@mui/material/IconButton";

//services
import {
  getAccountById,
  getAllAccount,
} from "../../service/shared/accountService";
import * as adsService from "../../service/buyer/AdvertisementService";
import * as bidService from "../../service/farmer/bids";

const CurrentAdsCard = () => {
  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);
  const [accountList, setAccountList] = useState();
  const [accountListToggle, setAccountListToggle] = useState(false);

  const [ads, setAds] = useState();
  const [adsToggle, setAdsToggle] = useState(false);

  const [viewBids, setViewBids] = useState();
  const [bidsToggle, setBidsToggle] = useState(false);

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

  const getAllAds = async () => {
    const res = await adsService.getAllAds();
    //console.log(res.data);
    if (account) {
      const adsList = res.data.filter(
        (ads) => ads.account.accountId == account.accountId
      );
      setAds(adsList);
      setAdsToggle(!adsToggle);
    }
  };

  const getAllBids = async () => {
    const res = await bidService.getAllBid();
    console.log(res.data);

    setViewBids(res.data);
    setBidsToggle(!bidsToggle);
  };

  const getAllAccounts = async () => {
    const res = await getAllAccount();
    console.log(res.data);

    setAccountList(res.data);
    setAccountListToggle(!accountListToggle);
  };

  useEffect(() => {
    console.log(account);
  }, [accountToggle]);

  useEffect(() => {
    getAllAds();
    getAllBids();
    getAllAccounts();
  }, [accountToggle]);

  useEffect(() => {
    console.log(accountList);
  }, [accountListToggle]);

  useEffect(() => {
    console.log(ads);
  }, [adsToggle]);

  useEffect(() => {
    console.log(viewBids);
  }, [bidsToggle]);

  return (
    <>
      <Grid container justifyContent="center">
        {ads && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {ads.map((adsData) => {
              return (
                <Card variant="outlined" key={adsData.postId} sx={{ margin: 2, borderRadius: 5 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: green[900] }}
                        aria-label="profile"
                        src={adsData.account.profileImg}
                      ></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        {/* <StarBorderOutlinedIcon /> */}
                      </IconButton>
                    }
                    title={adsData.postDate}
                    subheader="Post Date"
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>{adsData.adsDescription}</Typography>
                        <Typography>₱{adsData.initialPrice}.00</Typography>
                      </Grid>
                      </Grid>
                  </CardContent>
                       <CardMedia
                    component="img"
                    height="350"
                    image={adsData.cropImg}
                    alt="Crop Image"
                  />
                  <CardContent>
                    <Grid container item justifyContent="flex-end">
                      <Button
                        variant="contained"
                        sx={{ borderRadius: 50 }}
                        endIcon={<ViewListIcon />}
                        onClick={() => {
                          console.log(adsData.postId);
                        }}
                        LinkComponent={Link}
                        to={`/buyer/current-ads/${adsData.postId}/allBids`}
                      >
                        All Bids/Offer
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CurrentAdsCard;
