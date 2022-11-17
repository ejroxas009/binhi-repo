import React from "react";
import { useEffect, useState } from "react";

import jwtDecode from "jwt-decode";

//materialUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import ReportIcon from "@mui/icons-material/Report";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";

//components
import SendComplainModal from "../../component/shared/SendComplainModal";
import SuccessComplaintModal from "../../component/shared/SuccessComplaintModal";

//services
import * as bidService from "../../service/farmer/bids";
import * as adsService from "../../service/buyer/AdvertisementService";
import * as complaintService from "../../service/farmer/complaints";
import {
  getAccountById,
  getAllAccount,
} from "../../service/shared/accountService";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 275,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const BidCard = () => {
  const [value, setValue] = React.useState();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);
  const [accountList, setAccountList] = useState();
  const [accountListToggle, setAccountListToggle] = useState(false);

  const [bids, setBids] = useState();
  const [bidsToggle, setBidsToggle] = useState(false);

  const [postAds, setPostAds] = useState();
  const [postToggle, setPostToggle] = useState(false);

  //-----------Complaint------------------
  const [sendComplainOpen, setSendComplainOpen] = useState(false);
  const [complaintToggle, setComplaintToggle] = useState(false);
  const [isComplaintSuccess, setIsComplaintSuccess] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    accountId: "",
    complaintImg: "",
    complaintPost: "",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const getAllBids = async () => {
    const res = await bidService.getAllBid();
    // console.log(res.data);
    if (account) {
      const bidList = res.data.filter(
        (bids) => bids.account.accountId == account.accountId
      );
      console.log(bidList);
      setBids(bidList);
      setBidsToggle(!bidsToggle);
    }
  };

  const getAllAds = async () => {
    const res = await adsService.getAllAds();
    console.log(res.data);
    setPostAds(res.data);
    setPostToggle(!postToggle);
  };

  const getAllAccounts = async () => {
    const res = await getAllAccount();
    // console.log(res.data);
    setAccountList(res.data);
    setAccountListToggle(!accountListToggle);
  };

  useEffect(() => {
    console.log(account);
  }, [accountToggle]);

  useEffect(() => {
    getAllBids();
    getAllAds();
    getAllAccounts();
  }, [accountToggle]);

  useEffect(() => {
    console.log(accountList);
  }, [accountListToggle]);

  useEffect(() => {
    console.log(bids);
  }, [bidsToggle]);

  useEffect(() => {
    console.log(postAds);
  }, [postToggle]);

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

  return (
    <React.Fragment>
      <Grid container justifyContent="center">
        {bids && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {bids.map((bidsDetail) => {
              return (
                <Card variant="outlined" key={bidsDetail.bidId} sx={{ margin: 2, borderRadius: 5 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: green[900] }}
                        aria-label="profile"
                        image="https://joeschmoe.io/api/v1/random"
                      ></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <StarBorderOutlinedIcon />
                      </IconButton>
                    }
                    title={accountList.map((account) => {
                      if (account.accountId == bidsDetail.account.accountId) {
                        return account.username;
                      }
                    })}
                    subheader="Date"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {accountList.map((account) => {
                        if (account.accountId == bidsDetail.account.accountId) {
                          return account.firstName;
                        }
                      })}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="350"
                    image="https://picsum.photos/200"
                    alt="Crop Image"
                  />

                  <CardActions disableSpacing>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 50 }}
                      startIcon={<ReportIcon />}
                      onClick={() => {
                        handleSendComplainOpen();
                      }}
                    >
                      Report
                    </Button>

                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography gutterBottom color="Green">
                        DETAILS OF YOUR OFFER:
                      </Typography>
                      <Typography>BID DATE: {bidsDetail.bidDate}</Typography>
                      <Typography>BID PRICE: ₱{bidsDetail.bidPrice}.00</Typography>
                      <Typography paragraph>
                        BID MESSAGE: {bidsDetail.bidMsg}
                      </Typography>
                      <Typography>STATUS: Active / (Approve?) (Paid?)</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              );
            })}
          </Grid>
        )}
      </Grid>
      <SendComplainModal
        open={sendComplainOpen}
        onHandleChange={handleChangeComplaint}
        onHandleSubmit={handleSubmitComplaint}
        form={complaintForm}
        onHandleClose={handleSendComplainClose}
      />
      <SuccessComplaintModal open={isComplaintSuccess} />
    </React.Fragment>
  );
};

export default BidCard;
