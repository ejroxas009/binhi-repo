import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SendBidModal from "./SendBidModal";
import jwtDecode from "jwt-decode";
import { getAccountById } from "../../service/shared/accountService";
import * as bidService from "../../service/farmer/bids";
import * as complaintService from "../../service/farmer/complaints";
import SuccessBidModal from "./SuccessBidModal";
import SendComplainModal from "./SendComplainModal";
import SuccessComplaintModal from "./SuccessComplaintModal";
import PostAdsModal from "./PostAdsModal";
import * as adsService from "../../service/buyer/AdvertisementService";

const MarketPlace = ({ adsList, onSetAdsListToggle, adsListToggle }) => {
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

  //------------End Post Ads ----------------------------

  return (
    <>
      <Grid container justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card sx={{ margin: 2, borderRadius: 5 }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={1.5}>
                    {account && (
                      <Avatar
                        alt="Remy Sharp"
                        src={account.profileImg}
                        sx={{ width: 50, height: 50 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={10.5}>
                    <Button
                      fullWidth
                      //variant="contained"
                      sx={{
                        borderRadius: 10,
                        marginTop: 1,
                        backgroundColor: "#f0f2f5",
                        justifyContent: "flex-start",
                      }}
                      onClick={handlePostOpen}
                    >
                      {account && (
                        <Typography
                          sx={{
                            color: "#7b7d81",
                            textTransform: "none",
                            alignItems: "flex-start",
                          }}
                        >
                          {`Hi ${account.firstName}! Would you like to place an ads?`}
                        </Typography>
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          {adsList.map((ads) => {
            if (ads.active) {
              return (
                <Card key={ads.postId} sx={{ margin: 2, borderRadius: 5 }}>
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                    >
                      <Grid item xs={1}>
                        <Avatar
                          alt="Remy Sharp"
                          src={ads.account.profileImg}
                          sx={{ width: 50, height: 50 }}
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        xs={11}
                        justifyContent="flex-start"
                      >{`${ads.account.firstName} ${ads.account.lastName}`}</Grid>
                    </Grid>
                    <Grid container item justifyContent="flex-end">
                      <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            handleSendComplainOpen();
                          }}
                        >
                          Send complain to admin
                        </MenuItem>
                      </Menu>
                    </Grid>
                    <Grid />
                  </CardContent>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>{ads.adsDescription}</Typography>
                      </Grid>
                      {ads.cropImg && (
                        <Grid
                          container
                          item
                          justifyContent="center"
                          xs={12}
                          lg={12}
                        >
                          <img
                            src={ads.cropImg}
                            style={{ height: "35vh", width: "40vw" }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                  <CardContent>
                    <Grid container item justifyContent="flex-end">
                      <Button
                        variant="contained"
                        sx={{ borderRadius: 50 }}
                        endIcon={<SendIcon />}
                        onClick={() => {
                          setPostId(ads.postId);
                          setPostIdToggle(!postIdToggle);
                          setSendBidOpen(true);
                        }}
                      >
                        Send Bid
                      </Button>
                    </Grid>
                  </CardContent>
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
        onHandleClose={handleSendComplainClose}
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

export default MarketPlace;
