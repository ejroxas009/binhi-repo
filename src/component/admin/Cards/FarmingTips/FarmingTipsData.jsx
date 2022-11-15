import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from "react-router-dom";

export default function FarmingTipsCard({content}) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius:'20px' }}>
    {content.map((contents) => (
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={content.farmingTipsImg}
          alt="image"
        />
        
        <CardContent key={contents.farmingTipsId}>
          <Typography gutterBottom variant="h5" component="div">
          {contents.farmingTips}    
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {contents.farmingTipsDesc} 
          </Typography>
        </CardContent>
      </CardActionArea>
      ))}
      {content.map((contents) => (
      <CardActions>
        <Button size="small" color="primary" LinkComponent={Link} to={contents.farmingTipsLink}>
            Visit Article
            <span hidden={contents.farmingTipsLink}></span>
        </Button>
      </CardActions>
      ))}
    </Card>
  );
}
