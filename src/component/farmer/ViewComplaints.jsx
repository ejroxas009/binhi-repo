import React from "react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Card, CardMedia, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

const ViewComplaints = ({ data }) => {

  function BoldText({ children }) {
    return <span style={{ fontWeight: "bold" }}>{children}</span>;
  }

  return (
    <>
      <Grid component="form">
        <Grid item>
          <CardHeader title="Complaint Details" sx={{ textAlign: "center" }} />
          <Divider />
          <CardContent>
            <Typography component={"div"}>
              Complaint ID: <BoldText>{data.complaintId}</BoldText>
            </Typography>
            <Typography component={"div"} paragraph>
              Post Message: <BoldText>{data.complaintPost}</BoldText>
            </Typography>
            <Typography component={"div"} paragraph>
              Status: {data.resolved ? (
                <Chip label="Resolved" color="primary" />
              ) : (
                <Chip label="Pending" color="warning" />
              )}
            </Typography>
            <Divider />
            <Card elevation={5}>
              <CardMedia
                component="img"
                height="250"
                image={data.complaintImg}
                alt="Screenshot"
              />
            </Card>
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewComplaints;
