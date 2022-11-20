import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CardActionArea, CardActions, Fab, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import jwtDecode from "jwt-decode";
import { getAccountById } from "../../../../service/shared/accountService";
import * as tipsService from "../../../../service/admin/farmingTipsService";
import CourseModal from "../../modals/CourseModal/CourseModal";
import { Colors } from "../../../../styles/Theme/Theme";

import AddIcon from "@mui/icons-material/Add";

const Courses = ({ tipsList, onSetAdsListToggle, adsListToggle }) => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  //--------PostAds -----------------
  const [postOpen, setPostOpen] = useState(false);
  const [postToggle, setPostToggle] = useState(false);
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [postAdsForm, setPostAdsForm] = useState({
    farmingTipsId: "",
    farmingTips: "",
    farmingTipsDesc: "",
    farmingTipsLink: "",
    farmingTipsImg: "",
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

  //-----------Post Ads ----------------------------------

  const handlePostOpen = () => setPostOpen(true);
  const handlePostClose = () => setPostOpen(false);
  const handleIsPostSuccessOpen = () => setIsPostSuccess(true);
  const handleIsPostSuccessClose = () => setIsPostSuccess(false);

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    setPostAdsForm({ ...postAdsForm, farmingTipsId: account.farmingTipsId });
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
        const res = tipsService.addTips(postAdsForm);
        console.log(res);
      }
    };

    addPostFunction();
  }, [postToggle]);

  //------------End Post Ads ----------------------------

  return (
    <>
      {/* Add Button */}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={10.5}>
            <Fab
              onClick={handlePostOpen}
              color="primary"
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: (theme) => theme.spacing(5),
                right: (theme) => theme.spacing(5),
                backgroundColor: Colors.primary,
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>

      {/* Start of Card */}
      <Grid container="row" columnSpacing={{ xs: 12, sm: 3, md: 6, lg: 6 }}>
        {tipsList.map((contents) => (
          <Card
            sx={{
              marginLeft: 35,
              marginTop: 2,
              height: 250,
              width: 250,
              borderRadius: "20px",
            }}
          >
            <CardActionArea href={contents.farmingTipsLink}>
              {contents && (
                <CardMedia
                  component="img"
                  height="140"
                  width="280"
                  image={contents.farmingTipsImg}
                  alt="image"
                />
              )}
              <CardContent key={contents.farmingTipsId}>
                <Typography gutterBottom variant="h5" component="div">
                  {contents.farmingTips}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {contents.farmingTipsDesc}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={contents.farmingTipsLink}
              >
                Visit Article
                <span hidden={contents.farmingTipsLink}></span>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
      {/* Modal */}
      {account && (
        <CourseModal
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

export default Courses;
