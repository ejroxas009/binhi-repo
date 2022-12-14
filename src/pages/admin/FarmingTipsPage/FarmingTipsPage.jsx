import React, { useEffect, useState } from "react";
import * as tipsService from "../../../service/admin/farmingTipsService";
import Grid from "@mui/material/Grid";
import FarmingTips from "../../../component/admin/Cards/FarmingTips/FarmingTips";
import AdminAppbar from "../../../component/admin/appbar/AdminAppbar";
import AdminSidebar from "../../../component/admin/sidebar/AdminSidebar";
import { Container } from "@mui/material";
import Appbar from "../../../component/shared/Appbar";

const FarmingTipsPage = () => {
  
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
  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <Appbar/>
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} mt={15}>
            <Container>
            {tipList && (
              <FarmingTips
                tipsList={tipList}
                onSetAdsListToggle={setTipToggle}
                adsListToggle={tipToggle}
              />
            )}
            </Container>
          </Grid>
      </Grid>
    </>
  );
};

export default FarmingTipsPage;
