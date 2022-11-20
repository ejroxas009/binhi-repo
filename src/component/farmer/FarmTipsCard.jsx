import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CardActionArea, CardActions, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import jwtDecode from "jwt-decode";
import { getAccountById } from "../../service/shared/accountService";


const FarmTipsCard = ({ tipsList }) => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);

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

  return (
    <>
   
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
    </>
  );
};

export default FarmTipsCard;
