import React, { useEffect, useState } from "react";
import * as transService from "../../service/buyer/MyTransactionService";
import { getAccountById } from "../../service/shared/accountService";
import jwtDecode from "jwt-decode";
import ReceivedListTable from "./ReceivedListTable";
import ForPaymentListTable from "./ForPaymentListTable";
import ReceivePaymentTable from "./ReceivePaymentTable";
import ToReceiveListTable from "./ToReceiveListTable";

//--MUI--
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const MyOrders = () => {
  const [myPaymentList, setMyPaymentList] = useState();
  const [myToReceiveList, setMyToReceiveList] = useState();
  const [myReceivePaymentList, setMyReceivePaymentList] = useState();

  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [myPaymentListToggle, setMyPaymentListToggle] = useState(false);
  const [myToReceiveListToggle, setMyToReceiveListToggle] = useState(false);
  const [myReceivePaymentListToggle, setMyReceivePaymentListToggle] =
    useState(false);

  const [isPaymentTable, setIsPaymentTable] = useState("for payment");
  const [pageToggle, setPageToggle] = useState(false);

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

      const receivePayment = res.data.filter(
        (receivePayment) =>
          receivePayment.bid.account.accountId == account.accountId &&
          receivePayment.bid.approved &&
          (receivePayment.markAsPaid || receivePayment.markAsCOD) &&
          receivePayment.paid == false
      );
      console.log(receivePayment);
      setMyReceivePaymentList(receivePayment);
      setMyReceivePaymentListToggle(!myReceivePaymentListToggle);

      const paymentReceived = res.data.filter(
        (payment) =>
          payment.bid.account.accountId == account.accountId &&
          payment.bid.approved &&
          (payment.markAsPaid || payment.markAsCOD) &&
          payment.paid == true
      );
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
    setIsPaymentTable("for payment");
    setPageToggle(!pageToggle);
  };
  const handleToReceiveProductPage = () => {
    setIsPaymentTable("to receive");
    setPageToggle(!pageToggle);
  };
  const handleReceivePaymentPage = () => {
    setIsPaymentTable("receive payment");
    setPageToggle(!pageToggle);
  };

  useEffect(() => {
    console.log(isPaymentTable);
  }, [pageToggle]);

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

  useEffect(() => {
    console.log(myReceivePaymentList);
  }, [myReceivePaymentListToggle]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Card>
            <Grid container justifyContent="center" spacing={0}>
              <Grid item xs={12}>
                <CardHeader
                  title={isPaymentTable ? "Payment" : "Receive Product"}
                />
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                <CardContent>
                  <Button
                    onClick={() => {
                      handlePaymentPage();

                      console.log(isPaymentTable);
                    }}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={
                      isPaymentTable == "for payment" ? "outlined" : "contained"
                    }
                  >
                    For Payment
                  </Button>
                  <Button
                    onClick={() => {
                      handleToReceiveProductPage();

                      console.log(isPaymentTable);
                    }}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={
                      isPaymentTable == "to receive" ? "outlined" : "contained"
                    }
                  >
                    To Receive
                  </Button>
                  <Button
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={
                      isPaymentTable == "receive payment"
                        ? "outlined"
                        : "contained"
                    }
                    onClick={() => {
                      handleReceivePaymentPage();
                      console.log(isPaymentTable);
                    }}
                  >
                    Receive Payment
                  </Button>
                </CardContent>
              </Grid>

              <Grid item xs={12} md={12}>
                <CardContent>
                  {myToReceiveList && isPaymentTable == "for payment" && (
                    <ForPaymentListTable
                      details={myPaymentList}
                      toReceiveList={myToReceiveList}
                    />
                  )}

                  {myPaymentList && isPaymentTable == "to receive" && (
                    <ToReceiveListTable details={myToReceiveList} />
                  )}
                  {myReceivePaymentList &&
                    isPaymentTable == "receive payment" && (
                      <ReceivePaymentTable details={myReceivePaymentList} />
                    )}
                  {/* {myPaymentList && isPaymentTable == "receive payment" && (
                    <ReceivePaymentTable details={myPaymentList} />
                  )} */}
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
