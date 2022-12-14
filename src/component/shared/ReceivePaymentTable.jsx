import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as transactionService from "../../service/buyer/MyTransactionService";
import ViewProofOfPayment from "./ViewProofOfPayment";

const ReceivePaymentTable = (details) => {
  const [proofOfPaymentOpen, setProofOfPaymentOpen] = useState(false);
  const [proofOfPayment, setProofOfPayment] = useState();

  const handleProofOfPaymentOpen = () => setProofOfPaymentOpen(true);
  const handleProofOfPaymentClose = () => setProofOfPaymentOpen(false);

  const handleReceivePayment = async (paymentId) => {
    const res = await transactionService.receivePayment(paymentId);
    console.log(res);
    window.location.reload();
  };
  return (
    <TableContainer component={Paper} sx={{borderRadius:5}}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#558b94" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "white" }}>
              Order Reference
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Customer Name
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Crop Name
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Quantity
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Accepted Bid Price
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Total Amount
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Payment Method
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Proof of Payment
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Receive Payment
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.details.map((detail) => (
            <TableRow
              key={detail.paymentId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{detail.orderIdRef}</TableCell>
              <TableCell align="center">{`${detail.account.firstName} ${detail.account.middleName} ${detail.account.lastName}`}</TableCell>
              <TableCell align="center">
                {detail.advertisement.crop.cropName}
              </TableCell>
              <TableCell align="center">
                {detail.advertisement.cropQuantity}
              </TableCell>
              <TableCell align="center">{detail.bid.bidPrice}</TableCell>
              <TableCell align="center">
                {detail.advertisement.cropQuantity * detail.bid.bidPrice}
              </TableCell>
              <TableCell align="center">{detail.paymentMode}</TableCell>

              <TableCell align="center">
                <IconButton
                  onClick={() => {
                    setProofOfPayment(detail.proofOfPayment);
                    handleProofOfPaymentOpen();
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 50 }}
                  onClick={() => {
                    handleReceivePayment(detail.paymentId);
                  }}
                >
                  Receive
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {proofOfPayment && (
        <ViewProofOfPayment
          open={proofOfPaymentOpen}
          onHandleClose={handleProofOfPaymentClose}
          proofOfPayment={proofOfPayment}
        />
      )}
    </TableContainer>
  );
};

export default ReceivePaymentTable;

//OrderReference
//AccountName
//CropName
//Bid Price
//Quantity
//Amount
//paymentMode
//View Proof of payment
//Toggle Paid
