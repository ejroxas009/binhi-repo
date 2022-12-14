import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BannerContainer, BannerContent, BannerImage } from "../../../styles/Banner/BannerStyles";
import FarmerBanner from "../../../assets/images/Banner-new.jpg";


export default function Banner(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <BannerContainer>
        </BannerContainer>
    );
}