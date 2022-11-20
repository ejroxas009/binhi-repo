import React, { useContext, useState } from "react";
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

const ForPaymentListTable = ({ details }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#558b94" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "white" }}>
              Order Reference
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Crop
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
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <TableRow
              key={detail.paymentId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{detail.orderIdRef}</TableCell>
              <TableCell align="center">
                {detail.advertisement.crop.cropName}
              </TableCell>
              <TableCell align="center">
                {detail.advertisement.cropQuantity}
              </TableCell>
              <TableCell align="center">
                {detail.advertisement.bid.map((bid) => {
                  if (bid.approved == true) {
                    return bid.bidPrice;
                  }
                })}
              </TableCell>
              <TableCell align="center">
                {detail.advertisement.bid.map((bid) => {
                  if (bid.approved == true) {
                    return bid.bidPrice * detail.advertisement.cropQuantity;
                  }
                })}
              </TableCell>

              <TableCell align="center">
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 50 }}
                  endIcon={<SendIcon />}
                >
                  Proceed to payment
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ForPaymentListTable;
