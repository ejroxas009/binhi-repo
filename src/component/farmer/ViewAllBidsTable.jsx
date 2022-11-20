import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { getAccountById } from "../../service/shared/accountService";
import * as transService from "../../service/buyer/MyTransactionService";
import * as bidService from "../../service/farmer/bids";

// components
import TablePaginationActions from "../shared/TablePaginationActions";

//material
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../../styles/Theme/Theme";

const randomstring = require("randomstring");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ViewAllBidsTable = ({ bids }) => {
  const [account, setAccount] = useState();
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cropPaymentForm, setCropPaymentForm] = useState({
    orderIdRef: "",
    accountId: "",
    advertisementId: "",
  });
  const [cropPaymentFormToggle, setCropPaymentFormToggle] = useState(false);
  const [cropReceivedForm, setCropReceivedForm] = useState({
    accountId: "",
    advertisementId: "",
  });
  const [bidId, setBidId] = useState();
  const [adsId, setAdsId] = useState();
  const [acceptButtonToggle, setAcceptButtonToggle] = useState(false);

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

  useEffect(() => {
    console.log(account);
  }, [toggle]);

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //--------------Accept Bid Function---------------------------
  const handleAccept = async (accountId, advertisementId, bidId) => {
    const orderRef =
      "OrderRef-" +
      randomstring.generate({
        length: 10,
        charset: "alphanumeric",
      });

    setCropPaymentForm({
      orderIdRef: orderRef,
      accountId,
      advertisementId,
    });

    setCropReceivedForm({
      accountId,
      advertisementId,
    });
    setBidId(bidId);
    setAdsId(advertisementId);
    setCropPaymentFormToggle(!cropPaymentFormToggle);
  };

  useEffect(() => {
    const addCropPaymentFunction = async () => {
      if (cropPaymentForm.orderIdRef !== "") {
        const res = await transService.addCropPayment(cropPaymentForm);
        const res2 = await transService.addCropReceived(cropReceivedForm);
        const res3 = await bidService.acceptBid(adsId, bidId);
        setAcceptButtonToggle(!acceptButtonToggle);

        console.log(cropPaymentForm);
        console.log(res);
        console.log(cropReceivedForm);
        console.log(res2);
      }
    };

    addCropPaymentFunction();
  }, [cropPaymentFormToggle]);

  useEffect(() => {
    console.log(acceptButtonToggle);
  }, [acceptButtonToggle]);

  //----------------End of Accept Bid -----------------------------

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Bidders Name</StyledTableCell>
              <StyledTableCell align="center">Bid Price</StyledTableCell>
              <StyledTableCell align="center">Bid Message</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {bids.bid.map((data) => (
              <StyledTableRow key={data.bidId}>
                <StyledTableCell align="center">{`${data.account.firstName} ${data.account.lastName}`}</StyledTableCell>
                <StyledTableCell align="center">
                  {data.bidPrice}
                </StyledTableCell>
                <StyledTableCell align="center">{data.bidMsg}</StyledTableCell>
                <StyledTableCell align="center">
                  {data.approved ? (
                    <Typography>Accepted</Typography>
                  ) : (
                    <Button
                      variant="outlined"
                      color="success"
                      sx={{ borderRadius: "20px!important" }}
                      disabled={data.accept}
                      onClick={() => {
                        handleAccept(
                          account.accountId,
                          bids.postId,
                          data.bidId
                        );
                      }}
                    >
                      Accept
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={bids.bid.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewAllBidsTable;
