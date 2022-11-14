import { AppBar, Toolbar } from "@mui/material";
import { LogoStyle } from "../../../styles/Appbar/AppbarStyles";
import Logo from "../../../assets/images/Logo.png";

export default function LandingAppbar(){
    return(
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <img src={Logo} style={LogoStyle} />
        </Toolbar>
      </AppBar>

    );
}