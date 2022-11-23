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
import ViewProofOfPayment from "./ViewProofOfPayment";

const ProductsDeliveredListTable = ({ details }) => {
  const [proofOfPaymentOpen, setProofOfPaymentOpen] = useState(false);
  const [proofOfPayment, setProofOfPayment] = useState();

  const handleProofOfPaymentOpen = () => setProofOfPaymentOpen(true);
  const handleProofOfPaymentClose = () => setProofOfPaymentOpen(false);
  console.log(details);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#558b94" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "white" }}>
              Order Reference
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Date Delivered
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
                {detail.receivedTime.substring(0, 10)}
              </TableCell>
              <TableCell align="center">{`${detail.account.firstName} ${detail.account.middleName} ${detail.account.lastName}`}</TableCell>
              <TableCell align="center">
                {detail.advertisement.crop.cropName}
              </TableCell>
              <TableCell align="center">
                {`${detail.advertisement.cropQuantity.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )} kgs`}
              </TableCell>
              <TableCell align="center">{`P${detail.bid.bidPrice.toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              )}/Kg`}</TableCell>
              <TableCell align="center">
                {`P${(
                  detail.advertisement.cropQuantity * detail.bid.bidPrice
                ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
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

export default ProductsDeliveredListTable;
