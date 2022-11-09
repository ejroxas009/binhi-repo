
import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/system"
import theme, { Colors } from "../Theme/Theme"

export const landingPageStyle = {
    height:'100vh',
    width:'100%',
    marginTop:'-70px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position:'relative',
    backgroundRepeat: 'no-repeat',
}

export const typographyStyle = {
    zIndex:'1',
    position:'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
}

export const buttonStyle = {
    position:'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
}

export const BannerContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "0px 0px",
    background: Colors.light_gray,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    // backgroundImage: `url(/images/banner/banner.png)`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
  }));

export const BannerContent = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 420,
}));

export const BannerTitle = styled(Typography)(({ matches, theme }) => ({
    lineHeight: 1.5,
    fontSize: "72px",
    marginBottom: "20px",
    [theme.breakpoints.down('sm')]: {
      fontSize: '42px',    
    }
  }));

  export const BannerImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    backgroundImage: `url(${src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    marginTop:'20px',
    zIndex:'0',
    [theme.breakpoints.down("md")]: {
      width: "100vw",
      height: "100vh",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  }));