import React from 'react'
import { Box, Button, Fab, ThemeProvider, Typography } from '@mui/material';
import Banner from '../../component/shared/banner/banner';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Colors } from '../../styles/Theme/Theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const landingpage = () => {
  return (
    <ThemeProvider>
        <Banner />
        <Box textAlign='center'>
            <Fab variant="extended" sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(20),
            left: (theme) => theme.spacing(80),
            backgroundColor:Colors.gold
            }}>
                Login
                <KeyboardArrowRightIcon sx={{ ml: 1 }} />
            </Fab>
            <Fab variant="extended" sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(20),
            right: (theme) => theme.spacing(80),
            backgroundColor:Colors.primary
            }}>
                Register
                <KeyboardArrowRightIcon sx={{ ml: 2 }} />
            </Fab>
        </Box>
        
        
    </ThemeProvider>
  )
}

export default landingpage