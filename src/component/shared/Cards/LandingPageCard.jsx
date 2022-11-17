import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../../../assets/images/Logo.png";

export default function LandingPageCard() {
  return (
    <Card sx={{ marginLeft:10, height: 500, width: 500, borderRadius: 5 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          BINHI
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tagline
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: "center", marginTop:20}}>
        <Button variant="contained">Login</Button>
        <Button variant="outlined" >Register</Button>
      </CardActions>
    </Card>
  );
}