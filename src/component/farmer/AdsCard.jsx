import React from "react";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

//material UI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";

//services
import {
  getAccountById,
  getAllAccount,
} from "../../service/shared/accountService";
import * as adsService from "../../service/buyer/AdvertisementService";
import * as bidService from "../../service/farmer/bids";

const AdsCard = () => {
  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);
  const [accountList, setAccountList] = useState();
  const [accountListToggle, setAccountListToggle] = useState(false);

  const [ads, setAds] = useState();
  const [adsToggle, setAdsToggle] = useState(false);

  const [viewBids, setViewBids] = useState();
  const [bidsToggle, setBidsToggle] = useState(false);

  const [viewBidsOpen, setViewBidsOpen] = useState(false);  

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

  const handleViewBidOpen = () => setViewBidsOpen(true);
  

  return (
    <>
      <Grid container justifyContent="center">
        {ads && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {ads.map((adsData) => {
              return (
                <Card key={adsData.postId} sx={{ margin: 2 }}>
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                    >
                      <Grid item xs={1}>
                        <Avatar
                          alt="User Image"
                          src={adsData.account.profileImg}
                          sx={{ width: 50, height: 50 }}
                        />
                      </Grid>
                      <Grid container item xs={11} justifyContent="flex-start">
                        {adsData.postDate}
                      </Grid>
                    </Grid>
                    <Grid />
                  </CardContent>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>{adsData.adsDescription}</Typography>
                      </Grid>

                      <Grid
                        container
                        item
                        justifyContent="center"
                        xs={12}
                        lg={12}
                      >
                        <img
                          src={adsData.cropImg}
                          style={{ height: "35vh", width: "40vw" }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardContent>
                    <Grid container item justifyContent="flex-end">
                      <Button
                        variant="contained"
                        sx={{ borderRadius: 50 }}
                        endIcon={<ViewListIcon />}
                        onClick={() => {
                            setViewBidsOpen(true);                          
                        }}
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

export default AdsCard;
