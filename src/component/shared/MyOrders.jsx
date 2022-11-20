import React, { useEffect, useState } from "react";
import * as transService from "../../service/buyer/MyTransactionService";
import { getAccountById } from "../../service/shared/accountService";
import jwtDecode from "jwt-decode";
import ReceivedListTable from "./ReceivedListTable";
import ForPaymentListTable from "./ForPaymentListTable";

//--MUI--
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const MyOrders = () => {
  const [myPaymentList, setMyPaymentList] = useState();
  const [myToReceiveList, setMyToReceiveList] = useState();
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [myPaymentListToggle, setMyPaymentListToggle] = useState(false);
  const [myToReceiveListToggle, setMyToReceiveListToggle] = useState(false);
  const [isPaymentTable, setIsPaymentTable] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      setAccount(res.data);
      setToggle(!toggle);
    };

    getCurrentAccount(decoded.id);
  }, []);

  const getAllPaymentFunction = async () => {
    const res = await transService.getAllCropPayment();
    //console.log(res.data);
    if (account) {
      const myPayment = res.data.filter(
        (payment) =>
          payment.account.accountId == account.accountId &&
          payment.paid == false
      );

      setMyPaymentList(myPayment);
      setMyPaymentListToggle(!myPaymentListToggle);
    }
  };

  const getAllToReceiveFunction = async () => {
    const res = await transService.getAllCropReceived();

    if (account) {
      const myReceived = res.data.filter(
        (item) =>
          item.account.accountId == account.accountId && item.received == false
      );

      setMyToReceiveList(myReceived);
      setMyToReceiveListToggle(!myToReceiveListToggle);
    }
  };

  const handlePaymentPage = () => {
    setIsPaymentTable(true);
  };
  const handleToReceiveProductPage = () => {
    setIsPaymentTable(false);
  };

  useEffect(() => {
    getAllPaymentFunction();
    getAllToReceiveFunction();
  }, [toggle]);

  useEffect(() => {
    console.log(myPaymentList);
  }, [myPaymentListToggle]);
  useEffect(() => {
    console.log(myToReceiveList);
  }, [myToReceiveListToggle]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Card>
            <Grid container justifyContent="center" spacing={0}>
              <Grid item xs={12}>
                <CardHeader
                  title={
                    isPaymentTable ? "Payment History" : "Products Received"
                  }
                />
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                <CardContent>
                  <Button
                    onClick={handlePaymentPage}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={isPaymentTable ? "outlined" : "contained"}
                  >
                    For Payment
                  </Button>
                  <Button
                    onClick={handleToReceiveProductPage}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={isPaymentTable ? "contained" : "outlined"}
                  >
                    To Receive
                  </Button>
                </CardContent>
              </Grid>

              <Grid item xs={12} md={9}>
                <CardContent>
                  {myToReceiveList && isPaymentTable && (
                    <ForPaymentListTable details={myPaymentList} />
                  )}
                  {myPaymentList && !isPaymentTable && (
                    <ReceivedListTable details={myToReceiveList} />
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MyOrders;
