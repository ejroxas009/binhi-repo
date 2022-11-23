import React from "react";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

//materialUI
import { styled } from "@mui/material/styles";
import { Colors } from "../../styles/Theme/Theme";
import Table from "@mui/material/Table";
import { TableHead, Grid, TableBody, Chip } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

//components
import TablePaginationActions from "../shared/TablePaginationActions";

//services
import * as bidService from "../../service/farmer/bids";
import * as adsService from "../../service/buyer/AdvertisementService";
import {
  getAccountById,
  getAllAccount,
} from "../../service/shared/accountService";

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

const columns = [
  { id: "bidDate", label: "Date", align: "center" },
  { id: "bidPrice", label: "Price Offer", align: "center" },
  { id: "bidMsg", label: "Message", align: "center" },
  { id: "status", label: "Status", align: "center" },
];

const BidCard = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [account, setAccount] = useState();
  const [accountToggle, setAccountToggle] = useState(false);
  const [accountList, setAccountList] = useState();
  const [accountListToggle, setAccountListToggle] = useState(false);

  const [bids, setBids] = useState();
  const [bidsToggle, setBidsToggle] = useState(false);

  const [postAds, setPostAds] = useState();
  const [postToggle, setPostToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const getCurrentAccount = async (id) => {
      const res = await getAccountById(id);
      // console.log(res.data);
      setAccount(res.data);
      setAccountToggle(!accountToggle);
    };
    getCurrentAccount(decoded.id);
  }, []);

  // const getAdById = async () => {
  //   const res = await adsService.getAdsById(id);
  //   console.log(res.data);
  //   setAds(res.data);
  //   setAdsToggle(!adsToggle);
  // }

  useEffect(() => {}, []);

  const getAllBids = async () => {
    const res = await bidService.getAllBid();
    // console.log(res.data);
    if (account) {
      const bidList = res.data.filter(
        (bids) => bids.account.accountId == account.accountId
      );
      console.log(bidList);
      setBids(bidList);
      setBidsToggle(!bidsToggle);
    }
  };

  const getAllAds = async () => {
    const res = await adsService.getAllAds();
    console.log(res.data);
    setPostAds(res.data);
    setPostToggle(!postToggle);
  };

  const getAllAccounts = async () => {
    const res = await getAllAccount();
    // console.log(res.data);
    setAccountList(res.data);
    setAccountListToggle(!accountListToggle);
  };

  useEffect(() => {
    console.log(account);
  }, [accountToggle]);

  useEffect(() => {
    getAllBids();
    // getAdById();
    getAllAds();
    getAllAccounts();
  }, [accountToggle]);

  useEffect(() => {
    console.log(accountList);
  }, [accountListToggle]);

  // useEffect(() => {
  //   console.log(ads);
  // }, [adsToggle]);

  useEffect(() => {
    console.log(bids);
  }, [bidsToggle]);

  useEffect(() => {
    console.log(postAds);
  }, [postToggle]);

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Grid>
        <h1>My Current Bids</h1>
      </Grid>
      {bids && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? bids.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : bids
              ).map((bidsDetail) => (
                <StyledTableRow key={bidsDetail.bidId}>
                  <StyledTableCell align="center">
                    {bidsDetail.bidDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bidsDetail.bidPrice}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bidsDetail.bidMsg}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {bidsDetail.accept && bidsDetail.approved && (
                      <Chip label="Accepted" color="primary" />
                    )}
                    {bidsDetail.accept && bidsDetail.approved == false && (
                      <Chip label="Rejected" color="error" />
                    )}
                    {bidsDetail.accept == false &&
                      bidsDetail.approved == false && (
                        <Chip label="Pending" color="warning" />
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
                  count={bids.length}
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
      )}
    </React.Fragment>
  );
};

export default BidCard;
