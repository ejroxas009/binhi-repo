import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

import TablePagination from "@mui/material/TablePagination";
import * as transactionService from "../../service/buyer/MyTransactionService";

const ToReceiveListTable = ({ details }) => {
  const handleReceiveProduct = async (receiveId) => {
    const res = await transactionService.receiveCrop(receiveId);
    console.log(res);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#558b94" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "white" }}>
              Order Reference
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Account Name
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Crop
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Quantity
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Receive
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <TableRow
              key={detail.cropReceivedId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{detail.orderIdRef}</TableCell>
              <TableCell align="center">
                {`${detail.bid.account.firstName} ${detail.bid.account.middleName} ${detail.bid.account.lastName}`}
              </TableCell>
              <TableCell align="center">
                {detail.advertisement.cropName}
              </TableCell>
              <TableCell align="center">
                {detail.advertisement.cropQuantity}
              </TableCell>

              <TableCell align="center">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 50 }}
                  onClick={() => {
                    handleReceiveProduct(detail.cropReceivedId);
                  }}
                >
                  Receive
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ToReceiveListTable;

//OrderRefId
//AccountName
//Crop Name
//Quantity
//Receive
