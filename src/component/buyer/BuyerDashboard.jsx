import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";

const BuyerDashboard = ({ header, Icon, bgColor, data }) => {
  return (
    <Grid container>
      <Grid item>
        <Card
          sx={{
            backgroundColor: bgColor,
            boxShadow: "100px",
            borderRadius: 3,
          }}
        >
          <CardHeader
            title={
              <Typography variant="h5" sx={{ color: "white" }}>
                {header}
              </Typography>
            }
          />
          <CardContent>
            <Grid container>
              <Grid item xs={1}>
                <AppSettingsAltIcon sx={{ color: "white" }} />
              </Grid>
              <Grid item xs={7}></Grid>
              <Grid item xs={2}>
                <Typography variant="h5" sx={{ color: "white" }}>
                  {data}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BuyerDashboard;
