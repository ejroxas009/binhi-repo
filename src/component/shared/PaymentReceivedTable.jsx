import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const PaymentReceivedTable = ({ details }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#558b94" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "white" }}>
              Order Reference
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Payment Date
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Crop
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Quantity
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Price
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Amount
            </TableCell>

            <TableCell align="center" sx={{ color: "white" }}>
              Payment Mode
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
              <TableCell align="center">{detail.paymentDate}</TableCell>
              <TableCell align="center">
                {detail.advertisement.crop.cropName}
              </TableCell>
              <TableCell align="center">
                {`${detail.advertisement.cropQuantity.toLocaleString(
                  undefined,
                  { minimumFractionDigits: 2 }
                )}kgs`}
              </TableCell>
              <TableCell align="center">
                {`P${detail.bid.bidPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}/kg`}
              </TableCell>
              <TableCell align="center">
                {`P${(
                  detail.bid.bidPrice * detail.advertisement.cropQuantity
                ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              </TableCell>

              <TableCell align="center">{detail.paymentMode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentReceivedTable;
