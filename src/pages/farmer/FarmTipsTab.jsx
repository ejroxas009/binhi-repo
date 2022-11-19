import React, { useEffect, useState } from "react";


//service
import * as tipsService from "../../service/admin/farmingTipsService";

//material
import Grid from "@mui/material/Grid";

//components
import Appbar from "../../component/shared/appbar/Appbar";
import FarmerSidebar from "../../component/farmer/FarmerSidebar";
import FarmTipsCard from "../../component/farmer/FarmTipsCard";

const FarmTipsTab = () => {
    const [tipList, setTipList] = useState();
    const [tipToggle, setTipToggle] = useState(false);
  
    const getAllTipsFunction = async () => {
      const res = await tipsService.viewTips();
  
      setTipList(res.data);
      setTipToggle(!tipToggle);
    };
    useEffect(() => {
      getAllTipsFunction();
    }, []);
  
    useEffect(() => {
      console.log(tipList);
    }, [tipToggle]);

  return (<>
    <Grid >
      <Grid item xs={12}>
        <Appbar/>
      </Grid>
      <Grid item md={3}>
        <FarmerSidebar />
      </Grid>
        <Grid sx={{ marginLeft: 10 }} item xs={12} sm={9} md={6} lg={3} mt={10}>
          {tipList && (
            <FarmTipsCard
              tipsList={tipList}
            />
          )}
        </Grid>
    </Grid>
  </>);
};

export default FarmTipsTab;
