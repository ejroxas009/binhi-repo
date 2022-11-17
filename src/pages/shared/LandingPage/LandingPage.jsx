import React from 'react'
import { Box, Button, Container, Fab, Grid, ThemeProvider, Typography } from '@mui/material';
import Banner from '../../../component/shared/banner/banner';
import { Colors } from '../../../styles/Theme/Theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fullWidthClassName, noScrollbarsClassName, RemoveScrollBar } from 'react-remove-scroll-bar';
import LandingAppbar from './LandingAppbar';
import { Link } from "react-router-dom";
import LandingPageCard from '../../../component/shared/Cards/LandingPageCard';
import FarmerBanner from "../../../assets/images/Banner-new.jpg";
import Appbar from '../../../component/shared/Appbar';


const landingpage = () => {
  
  return (
    
    <React.Fragment>
    <div className={noScrollbarsClassName}/>
      <div className={fullWidthClassName}/>
      <RemoveScrollBar/>
    <Box style={{backgroundImage: FarmerBanner,}}>
    <Grid>
    <Box sx={{ display: 'flex' }}>
      <Typography>

      </Typography>
        
    </Box>
    </Grid>
    <Grid mt={20}>
        <LandingPageCard/>
      </Grid>
    </Box>
    
    </React.Fragment>
  )
}

export default landingpage