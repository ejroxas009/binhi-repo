import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CardHeader from "@mui/material/CardHeader";
import { green } from "@mui/material/colors";
import ReportIcon from "@mui/icons-material/Report";
import CardMedia from "@mui/material/CardMedia";

import SendBidModal from "../../../component/shared/SendBidModal";
import jwtDecode from "jwt-decode";
import { getAccountById } from "../../../service/shared/accountService";
import * as bidService from "../../../service/farmer/bids";
import * as complaintService from "../../../service/farmer/complaints";
import SuccessBidModal from "../../../component/shared/SuccessBidModal";
import SendComplainModal from "../../../component/shared/SendComplainModal";
import SuccessComplaintModal from "../../../component/shared/SuccessComplaintModal";
import PostAdsModal from "../../../component/shared/PostAdsModal";
import * as adsService from "../../../service/buyer/AdvertisementService";

const MarketPlaceAdmin = ({ adsList, onSetAdsListToggle, adsListToggle }) => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  //----------Bid-------------------------
  const [bidToggle, setBidToggle] = useState(false);
  const [sendBidOpen, setSendBidOpen] = useState(false);
  const [isBidSuccess, setIsBidSuccess] = useState(false);
  const [postId, setPostId] = useState();
  const [postIdToggle, setPostIdToggle] = useState(false);
  //-----------Complaint------------------
  const [sendComplainOpen, setSendComplainOpen] = useState(false);
  const [complaintToggle, setComplaintToggle] = useState(false);
  const [isComplaintSuccess, setIsComplaintSuccess] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    accountId: "",
    complaintImg: "",
    complaintPost: "",
  });
  //--------PostAds -----------------
  const [postOpen, setPostOpen] = useState(false);
  const [postToggle, setPostToggle] = useState(false);
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [postAdsForm, setPostAdsForm] = useState({
    accountId: "",
    cropId: "",
    adsDescription: "",
    cropQuantity: "",
    initialPrice: "",
    cropImg: "",
  });
  //-------Menu -------------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  //-----add bid api call-----------------------
  useEffect(() => {
    const addBidFunction = async () => {
      if (account) {
        const res = await bidService.addBid(bidForm);
        console.log(res);
        //console.log(bidForm);
        setBidForm({
          accountId: "",
          postId: "",
          bidPrice: "",
          bidMsg: "",
        });
        handleIsBidSuccessOpen();
        setTimeout(handleIsBidSuccessClose, 3000);
        handleSendBidClose();
      }
    };

    addBidFunction();
  }, [bidToggle]);

  useEffect(() => {
    console.log(bidForm);
  }, [postIdToggle]);

  const [bidForm, setBidForm] = useState({
    accountId: "",
    postId: "",
    bidPrice: "",
    bidMsg: "",
  });

  useEffect(() => {
    console.log(adsList);
  }, []);

  const handleSendBidOpen = () => setSendBidOpen(true);

  const handleSendBidClose = () => setSendBidOpen(false);

  const handleIsBidSuccessOpen = () => setIsBidSuccess(true);
  const handleIsBidSuccessClose = () => setIsBidSuccess(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBidForm({ ...bidForm, accountId: account.accountId, postId: postId });
    setBidToggle(!bidToggle);
  };

  const handleBidFormChange = (event) => {
    setBidForm({
      ...bidForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  //----------------End of Bid --------------------------

  //----------------Send Complaint ----------------------

  const handleSendComplainOpen = () => setSendComplainOpen(true);

  const handleSendComplainClose = () => setSendComplainOpen(false);

  const handleComplaintSuccessOpen = () => setIsComplaintSuccess(true);
  const handleComplaintSuccessClose = () => setIsComplaintSuccess(false);

  const handleSubmitComplaint = (event) => {
    event.preventDefault();
    setComplaintForm({ ...complaintForm, accountId: account.accountId });
    setComplaintToggle(!complaintToggle);
  };

  const handleChangeComplaint = (event) => {
    setComplaintForm({
      ...complaintForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    const addComplaintsFunction = async () => {
      if (account) {
        const res = await complaintService.addComplaints(complaintForm);
        console.log(res);

        handleComplaintSuccessOpen();
        console.log(isComplaintSuccess);
        handleSendComplainClose();
        setTimeout(handleComplaintSuccessClose, 3000);
      }
    };

    addComplaintsFunction();
  }, [complaintToggle]);

  //------------ENd Send Complaint-----------------------

  //-----------Post Ads ----------------------------------

  const handlePostOpen = () => setPostOpen(true);
  const handlePostClose = () => setPostOpen(false);
  const handleIsPostSuccessOpen = () => setIsPostSuccess(true);
  const handleIsPostSuccessClose = () => setIsPostSuccess(false);

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    setPostAdsForm({ ...postAdsForm, accountId: account.accountId });
    setPostToggle(!postToggle);
  };

  const handleChangePost = (event) => {
    setPostAdsForm({
      ...postAdsForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    console.log(postAdsForm);

    const addPostFunction = async () => {
      if (account) {
        const res = adsService.addPost(postAdsForm);
        console.log(res);
      }
    };

    addPostFunction();
  }, [postToggle]);

  const reverseAdsList = () => {
    let reverseList;
    if (adsList) {
      reverseList = adsList.reverse();
    }
    return reverseList;
  };

  //------------End Post Ads ----------------------------

  //for block and unblock
  const handleActiveUser = async (id, event) => {
    const res = await adsService.blockPost(id);
    console.log(res);
    window.location.reload();
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {[...adsList].reverse().map((ads) => {
            if (ads.active || !ads.active) {
              return (
                <Card
                  variant="outlined"
                  key={ads.postId}
                  sx={{ margin: 2, borderRadius: 5 }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: green[900] }}
                        aria-label="profile"
                        src={ads.account.profileImg}
                      ></Avatar>
                    }
                    title={`${ads.account.firstName} ${ads.account.lastName}`}
                    subheader={ads.postDate && ads.postDate.substring(0, 10)}
                  />

                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>{`Description: ${ads.adsDescription}`}</Typography>
                        <Typography>
                          Budget: ???{ads.initialPrice}.00 per kilogram
                        </Typography>
                        <Typography>
                          Needed Quantity:{ads.cropQuantity} kilograms
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  {ads.cropImg && (
                    <CardMedia
                      component="img"
                      height="350"
                      image={ads.cropImg}
                      alt="Crop Image"
                    />
                  )}
                  {account && ads.account.accountId !== account.accountId && (
                    <CardContent>
                      <Grid container item justifyContent="flex-end">
                        {ads.active ? (
                          <Button
                            variant="outlined"
                            color="error"
                            name="active"
                            value={ads.isActive}
                            sx={{ borderRadius: "20px!important" }}
                            //onChange={handleChange}
                            onClick={() => {
                              handleActiveUser(ads.postId);
                              console.log(ads.postId);
                            }}
                          >
                            Block Post
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            color="success"
                            name="active"
                            value={ads.isActive}
                            sx={{ borderRadius: "20px!important" }}
                            //onChange={handleChange}
                            onClick={() => {
                              handleActiveUser(ads.postId);
                              console.log(ads.postId);
                            }}
                          >
                            Unblock Post
                          </Button>
                        )}
                      </Grid>
                    </CardContent>
                  )}
                </Card>
              );
            }
          })}
        </Grid>
      </Grid>
      {account && (
        <SendBidModal
          open={sendBidOpen}
          onHandleOpen={handleSendBidOpen}
          onHandleClose={handleSendBidClose}
          form={bidForm}
          onHandleChange={handleBidFormChange}
          onHandleSubmit={handleSubmit}
        />
      )}

      <SuccessBidModal open={isBidSuccess} />
      <SendComplainModal
        open={sendComplainOpen}
        onHandleChange={handleChangeComplaint}
        onHandleSubmit={handleSubmitComplaint}
        form={complaintForm}
        onSetForm={setComplaintForm}
        onHandleClose={handleSendComplainClose}
        account={account}
      />
      <SuccessComplaintModal open={isComplaintSuccess} />
      {account && (
        <PostAdsModal
          open={postOpen}
          onHandleClose={handlePostClose}
          onHandleSubmit={handleSubmitPost}
          onHandleChange={handleChangePost}
          form={postAdsForm}
          onSetForm={setPostAdsForm}
          id={account.accountId}
          adsListToggle={adsListToggle}
          onSetAdsListToggle={onSetAdsListToggle}
        />
      )}
    </>
  );
};

export default MarketPlaceAdmin;
