import { Box, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";

import AdminSidebar from "../../../component/admin/sidebar/AdminSidebar";
import CropsTable from "../../../component/admin/tables/CropsTable/CropsTable";
import Appbar from "../../../component/shared/Appbar";
import * as cropService from "../../../service/admin/cropService";

const CoursesPage = () => {
  const [cropList, setCropList] = useState();
  const [cropToggle, setCropToggle] = useState(false);

  const getAllCropsFunction = async () => {
    const res = await cropService.getAllCrops();

    setCropList(res.data);
    setCropToggle(!cropToggle);
  };
  useEffect(() => {
    getAllCropsFunction();
  }, []);

  useEffect(() => {
    console.log(cropList);
  }, [cropToggle]);
  
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Appbar />
        </Grid>
        <Grid item md={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} sx={{ marginTop: 10 }}>
          {cropList && (
            <CropsTable
              cropsList={cropList}
              onSetCropListToggle={setCropToggle}
              cropListToggle={cropToggle}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CoursesPage;
