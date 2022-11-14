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
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from '@mui/material';

const UserTable2 = ({list}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#558b94" }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "white" }}>
              Username
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              User Type
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Status
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow
              key={item.accountId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{item.username}</TableCell>
              <TableCell align="center">
                {item.role}
              </TableCell>
              <TableCell align="center">
                {item.isActive}
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <ArrowForwardIcon />
                </IconButton>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserTable2