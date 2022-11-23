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
import PaymentModeModal from "./payment-module/PaymentModeModal";
import * as transactionService from "../../service/buyer/MyTransactionService";
import GCashPaymentMode from "./payment-module/GCashPaymentMode";
import ListIcon from "@mui/icons-material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ForPaymentListTable = ({ details, toReceiveList }) => {
  const [paymentModeModalOpen, setPaymentModeModalOpen] = useState(false);
  const [paymentId, setPaymentId] = useState();
  const [paymentMethodForm, setPaymentMethodForm] = useState({
    changePaymentMethod: "",
  });
  const [bidWinner, setBidWinner] = useState();
  const [orderIdRef, setOrderIdRef] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePaymentModeModalOpen = () => setPaymentModeModalOpen(true);
  const handlePaymentModeModalClose = () => setPaymentModeModalOpen(false);

  useEffect(() => {
    console.log(paymentModeModalOpen);
  }, [paymentModeModalOpen]);

  const handleProceedToPaymentChange = (event) => {
    setPaymentMethodForm({
      ...paymentMethodForm,
      changePaymentMethod: event.currentTarget.value,
    });
  };
  const handleProceedToPayment = async (paymentId, bidWinner, orderIdRef) => {
    handlePaymentModeModalOpen();
    setPaymentId(paymentId);
    console.log(paymentId);
    console.log(paymentMethodForm);
    console.log(bidWinner);
    setBidWinner(bidWinner);
    setOrderIdRef(orderIdRef);
    handleClose();
  };

  //---------For Menu--------

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsPaid = async (paymentId) => {
    const res = await transactionService.markAsPaid(paymentId);
    console.log(res);
    handleClose();
    window.location.reload();
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
              Payment Status
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details &&
            details.map((detail) => (
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
                  {detail.markAsPaid ? "Paid" : "Unpaid"}
                </TableCell>

                <TableCell align="center">
                  {/* <Button
                    variant="outlined"
                    sx={{ borderRadius: 50 }}
                    endIcon={<SendIcon />}
                    onClick={() => {
                      const bidWinner = detail.advertisement.bid.find((bid) => {
                        if (bid.approved) {
                          return bid;
                        }
                      });
                      handleProceedToPayment(detail.paymentId, bidWinner);
                    }}
                  >
                    Proceed to payment
                  </Button> */}
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <ListIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        const bidWinner = detail.advertisement.bid.find(
                          (bid) => {
                            if (bid.approved) {
                              return bid;
                            }
                          }
                        );
                        handleProceedToPayment(
                          detail.paymentId,
                          bidWinner,
                          detail.orderIdRef
                        );
                      }}
                    >
                      Proceed to Payment
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMarkAsPaid(detail.paymentId);
                      }}
                    >
                      Mark as Paid
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {bidWinner && (
        <PaymentModeModal
          open={paymentModeModalOpen}
          paymentId={paymentId}
          onHandleChange={handleProceedToPaymentChange}
          onHandleClose={handlePaymentModeModalClose}
          form={paymentMethodForm}
          onSetForm={setPaymentMethodForm}
          paymentMethod={paymentMethodForm.changePaymentMethod}
          bidWinner={bidWinner}
          toReceiveList={toReceiveList}
          orderIdRef={orderIdRef}
        />
      )}
    </TableContainer>
  );
};

export default ForPaymentListTable;
