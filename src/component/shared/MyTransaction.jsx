import React, { useEffect, useState } from "react";
import * as transService from "../../service/buyer/MyTransactionService";
import { getAccountById } from "../../service/shared/accountService";
import jwtDecode from "jwt-decode";
import ReceivedListTable from "./ReceivedListTable";
import PaymentListTable from "./PaymentListTable";
import ProductsDeliveredListTable from "./ProductsDeliveredListTable";
import PaymentReceivedTable from "./PaymentReceivedTable";
//--MUI--
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const MyTransaction = () => {
  const [adsList, setAdsList] = useState();
  const [myPaidList, setMyPaidList] = useState();
  const [myReceivedList, setMyReceivedList] = useState();
  const [productsDeliveredList, setMyProductsDeliveredList] = useState();
  const [paymentReceivedList, setPaymentReceivedList] = useState();
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [myPaidListToggle, setMyPaidListToggle] = useState(false);
  const [myReceivedListToggle, setMyReceivedListToggle] = useState(false);
  const [productsDeliveredListToggle, setProductsDeliveredListToggle] =
    useState(false);
  const [paymentReceivedListToggle, setPaymentReceivedListToggle] =
    useState(false);
  const [isPaymentTable, setIsPaymentTable] = useState("payment");

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

      const paymentReceived = res.data.filter(
        (payment) =>
          payment.bid.account.accountId == account.accountId &&
          payment.bid.approved &&
          (payment.markAsPaid || payment.markAsCOD) &&
          payment.paid == true
      );

      setPaymentReceivedList(paymentReceived);
      setPaymentReceivedListToggle(!paymentReceivedListToggle);
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

      const productsDelivered = res.data.filter(
        (item) =>
          item.bid.account.accountId == account.accountId && item.received
      );
      setMyProductsDeliveredList(productsDelivered);
      setProductsDeliveredListToggle(!productsDeliveredListToggle);
    }
  };

  const handlePaymentPage = () => {
    setIsPaymentTable("payment");
  };
  const handleReceivedProductPage = () => {
    setIsPaymentTable("receive product");
  };

  const handleProductsDeliveredPage = () => {
    setIsPaymentTable("products delivered");
  };
  const handleReceivedPaymentPage = () => {
    setIsPaymentTable("received payment");
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
  useEffect(() => {
    console.log(productsDeliveredList);
  }, [productsDeliveredList]);
  useEffect(() => {
    console.log(paymentReceivedList);
  }, [paymentReceivedListToggle]);

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
                    variant={
                      isPaymentTable == "payment" ? "outlined" : "contained"
                    }
                  >
                    Payment History
                  </Button>
                  <Button
                    onClick={handleReceivedPaymentPage}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={
                      isPaymentTable == "received payment"
                        ? "outlined"
                        : "contained"
                    }
                  >
                    Received Payment
                  </Button>
                  <Button
                    onClick={handleReceivedProductPage}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={
                      isPaymentTable == "receive product"
                        ? "outlined"
                        : "contained"
                    }
                  >
                    Products Received
                  </Button>
                  <Button
                    onClick={handleProductsDeliveredPage}
                    sx={{ borderRadius: 50, margin: 1 }}
                    variant={
                      isPaymentTable == "products delivered"
                        ? "outlined"
                        : "contained"
                    }
                  >
                    Products Delivered
                  </Button>
                </CardContent>
              </Grid>

              <Grid item xs={12} md={12}>
                <CardContent>
                  {myReceivedList && isPaymentTable == "receive product" && (
                    <ReceivedListTable details={myReceivedList} />
                  )}
                  {myPaidList && isPaymentTable == "payment" && (
                    <PaymentListTable details={myPaidList} />
                  )}
                  {productsDeliveredList &&
                    isPaymentTable == "products delivered" && (
                      <ProductsDeliveredListTable
                        details={productsDeliveredList}
                      />
                    )}
                  {paymentReceivedList &&
                    isPaymentTable == "received payment" && (
                      <PaymentReceivedTable details={paymentReceivedList} />
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
