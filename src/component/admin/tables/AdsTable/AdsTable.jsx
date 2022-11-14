import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Colors } from '../../../../styles/Theme/Theme';
import { Button } from '@mui/material';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function AdsTable({details}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">User</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Post Date</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="right">Action </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((item) => (
            <StyledTableRow key={item.postId}>
              {/* <StyledTableCell align="left">{item.account}</StyledTableCell> */}
              <StyledTableCell align="left">{item.adsDescription}</StyledTableCell>
              <StyledTableCell align="left">{item.adsDescription}</StyledTableCell>
              <StyledTableCell align="left">{item.postDate}</StyledTableCell>
              <StyledTableCell align="center">{item.isActive}</StyledTableCell>
              <StyledTableCell align="right">
                  <Button variant="outlined" color="error" sx={{ borderRadius:'20px!important'}}>
                    Block
                  </Button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}