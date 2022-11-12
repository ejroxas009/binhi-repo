import React, { useEffect, useState } from "react";
import * as transService from "../../service/buyer/MyTransactionService";
import { getAccountById } from "../../service/shared/accountService";
import jwtDecode from "jwt-decode";
import ReceivedListTable from "./ReceivedListTable";
import PaymentListTable from "./PaymentListTable";

//--MUI--
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { fabClasses } from "@mui/material";

const MyTransaction = () => {
  const [adsList, setAdsList] = useState();
  const [myPaidList, setMyPaidList] = useState();
  const [myReceivedList, setMyReceivedList] = useState();
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [myPaidListToggle, setMyPaidListToggle] = useState(false);
  const [myReceivedListToggle, setMyReceivedListToggle] = useState(false);
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

  //   useEffect(() => {
  //     console.log(account);
  //     console.log(myPaidList);
  //   }, [toggle]);

  const getAllPaymentFunction = async () => {
    const res = await transService.getAllCropPayment();
    //console.log(res.data);
    if (account) {
      const myPayment = res.data.filter(
        (payment) =>
          payment.account.accountId == account.accountId && payment.paid == true
      );

      setMyPaidList(myPayment);
      setMyPaidListToggle(!myPaidListToggle);
    }
  };

  const getAllReceivedFunction = async () => {
    const res = await transService.getAllCropReceived();

    if (account) {
      const myReceived = res.data.filter(
        (item) =>
          item.account.accountId == account.accountId && item.received == true
      );

      setMyReceivedList(myReceived);
      setMyReceivedListToggle(!myReceivedListToggle);
    }
  };

  const handlePaymentPage = () => {
    setIsPaymentTable(true);
  };
  const handleReceivedProductPage = () => {
    setIsPaymentTable(false);
  };

  useEffect(() => {
    getAllPaymentFunction();
    getAllReceivedFunction();
  }, [toggle]);

  useEffect(() => {
    console.log(myPaidList);
  }, [myPaidListToggle]);
  useEffect(() => {
    console.log(myReceivedList);
  }, [myReceivedListToggle]);

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
                    Payment History
                  </Button>
                  <Button
                    onClick={handleReceivedProductPage}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={isPaymentTable ? "contained" : "outlined"}
                  >
                    Products Delivered
                  </Button>
                </CardContent>
              </Grid>

              <Grid item xs={12} md={9}>
                <CardContent>
                  {myReceivedList && isPaymentTable && (
                    <ReceivedListTable details={myReceivedList} />
                  )}
                  {myPaidList && !isPaymentTable && (
                    <PaymentListTable details={myPaidList} />
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

export default MyTransaction;
