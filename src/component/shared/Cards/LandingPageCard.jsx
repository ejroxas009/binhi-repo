import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../../../assets/images/Logo.png";
import { Link } from 'react-router-dom';

export default function LandingPageCard() {
  return (
    <Card sx={{ marginLeft:20, height: 500, width: 500, borderRadius: 5 }}>
      <CardMedia
          component="img"
          height="294"
          width="194"
          image={image}
          alt="Image"
        />
      <CardContent>

      <Typography variant = "h4" textAlign="center" sx={{justifyContent:"center"}}>
        Bridging the Gap between Farm and Market
      </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: "center",}}>
        <Button 
        size="large" 
        variant="contained" 
        LinkComponent={Link} 
        to="/login" 
        sx={{borderRadius:5}}>
          Login
        </Button>
        <Button 
        size="large" 
        variant="outlined" 
        LinkComponent={Link} 
        to="/register" 
        sx={{borderRadius:5}} >
          Register
        </Button>
      </CardActions>
    </Card>
  );
}