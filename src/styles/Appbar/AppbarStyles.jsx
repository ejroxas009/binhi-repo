import { Box, List, styled, Typography } from "@mui/material";
import { Colors } from "../Theme/Theme";

export const AppbarContainer = styled(Box)(() => ({    
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.primary,
  color: Colors.white,
  zIndex:'99',
}));

export const AppbarHeader = styled(Typography)(() => ({
  padding: "4px",
  flexGrow: 1,
  fontSize: "4em",
  color: Colors.primary,
  zIndex:'99',
}));

export const MyList = styled(List)(({ type }) => ({
  display: type === "row" ? "flex" : "block",
  flexGrow: 3,
  justifyContent: "center",
  alignItems: "center",
}));

export const LogoStyle = {
  width:'90px',
  height:'75px',
  position:'relative',
  justifyContent:'center',
}

export const ActionIconsContainerDesktop = styled(Box)(() => ({
  flexGrow: 0,
  zIndex: '99', 
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
  display: 'flex',
  background: Colors.shaft,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: '100%',
  alignItems: 'center',
  zIndex: '99',  
  borderTop: `1px solid ${Colors.border}`
}));