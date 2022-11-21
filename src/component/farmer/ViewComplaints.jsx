import React from "react";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Card, CardMedia, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

const ViewComplaints = ({ complaints }) => {
  
  const [complaintsToggle, setComplaintsToggle] = useState(false);

  useEffect(() => {
    console.log(complaints);
  }, [complaintsToggle]);

  return (
    <>
      <Grid component="form">
        <Grid item>
          <CardHeader title="Complaint Details" sx={{ textAlign: "center" }} />
          <Divider />
          <CardContent>
            <Typography component={"div"}>
              Complaint ID: {complaints.complaintId}
            </Typography>
            <Typography component={"div"} paragraph>
              Post Message: {complaints.complaintPost}
            </Typography>
            <Typography component={"div"} paragraph>
              Status:
              {complaints.resolved ? (
                <Chip label="Resolved" color="primary" />
              ) : (
                <Chip label="UnResolved" color="warning" />
              )}
            </Typography>
            <Divider />
            <Card elevation={5}>
              <CardMedia
                component="img"
                height="250"
                image={complaints.complaintImg}
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
