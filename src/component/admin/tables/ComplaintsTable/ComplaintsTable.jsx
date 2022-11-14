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
import { Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from "@mui/icons-material/Edit";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ComplaintsTable({details}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Post Details</StyledTableCell>
            <StyledTableCell align="left">User Type</StyledTableCell>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((item) => (
            <StyledTableRow key={item.complaintId}>
              <StyledTableCell align="left">{item.complaintPost}</StyledTableCell>
              {/* <StyledTableCell align="left">{item.account}</StyledTableCell>
              <StyledTableCell align="left">{item.account}</StyledTableCell> */}
              <StyledTableCell align="left">{item.complaintImg}</StyledTableCell>
              <StyledTableCell align="left">{item.complaintImg}</StyledTableCell>
              <StyledTableCell align="left">{item.complaintImg}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton sx={{color:Colors.black}}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton sx={{color:Colors.success}}>
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}