import { AppBar, Toolbar, Typography } from "@mui/material";
import { LogoStyle } from "../../../styles/Appbar/AppbarStyles";
import Logo from "../../../assets/images/Logo-white.png";

export default function LandingAppbar(){
    return(
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <img src={Logo} style={LogoStyle} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Segoe UI',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BINHI
          </Typography>
        </Toolbar>
      </AppBar>

    );
}