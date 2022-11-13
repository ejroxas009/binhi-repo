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
import SendBidModal from "./SendBidModal";
import jwtDecode from "jwt-decode";
import { getAccountById } from "../../service/shared/accountService";
import * as bidService from "../../service/farmer/bids";
import SuccessBidModal from "./SuccessBidModal";

const MarketPlace = ({ adsList }) => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [bidToggle, setBidToggle] = useState(false);
  const [sendBidOpen, setSendBidOpen] = useState(false);
  const [isBidSuccess, setIsBidSuccess] = useState(false);
  const [postId, setPostId] = useState();
  const [postIdToggle, setPostIdToggle] = useState(false);

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

  //-----add bid api call
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
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {adsList.map((ads) => {
            return (
              <Card key={ads.postId} sx={{ margin: 2 }}>
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
                  <Grid />
                </CardContent>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>{ads.adsDescription}</Typography>
                    </Grid>

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
    </>
  );
};

export default MarketPlace;
