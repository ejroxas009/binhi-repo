import React, { useState } from "react";
import { useEffect } from "react";

//materialUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Button from "@mui/material/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';

//services
import * as bidService from "../../service/farmer/bids";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;

})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BidCard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [bids, setBids] = useState([]);
  // const [account, setAccount] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleModal = () => {
    console.log("Handle modal is being called")
  }

  useEffect(() => {
    const getBidByAccountId = async () => {
      const res = await bidService.getAllBid();
        setBids(res.data);
        bids.filter((account) => {
          if(account.accountId === bidService.getCurrentUser()){
            return 
          }
        })
      };
    }, []);
    
  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="profile"
              image="https://joeschmoe.io/api/v1/random"
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <StarBorderOutlinedIcon />
            </IconButton>
          }
          title="Username"
          subheader="Date"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Looking for crops...
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="350"
          image="https://picsum.photos/200"
          alt="Crop Image"
        />
        <CardActions disableSpacing>
          <Button onClick={handleModal} variant="outlined" startIcon={<SendIcon />}>
            Send Complaints
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
          <Typography gutterBottom color="Green">DETAILS OF YOUR OFFER:</Typography>
          <Typography>
            BID PRICE:
          </Typography>
          <Typography paragraph>
            BID MESSAGE:
          </Typography>
          <Typography>
            STATUS:
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
    </React.Fragment>
  );
};

export default BidCard;
