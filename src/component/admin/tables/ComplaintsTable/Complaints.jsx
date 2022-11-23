import React from "react";
import { useEffect, useState } from "react";

//material
import { styled } from "@mui/material/styles";
import { Colors } from "../../../../styles/Theme/Theme";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import ViewComplaints from "./ViewComplaints";
import * as complaintService from "../../../../service/admin/complaintService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Complaints = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenView = () => setView(true);
  const handleCloseView = () => setView(false);

  useEffect(() => {
    handleClose();
  }, [data]);

  //for toggle isRead
  const handleIsRead = async (id) => {
    const res = await complaintService.toogleIsRead(id);
  };

  //for toggle isResolved
  const handleIsResolved = async (id) => {
    const res = await complaintService.toggleIsResolved(id);
    console.log(res);
    window.location.reload();
  };

  return (
    <>
      <StyledTableCell align="center">{`${data.account.firstName} ${data.account.lastName}`}</StyledTableCell>
      <StyledTableCell align="center">{data.account.role}</StyledTableCell>
      <StyledTableCell align="center">{data.complaintPost}</StyledTableCell>
      <StyledTableCell align="center">
        {data.resolved ? (
          <Chip label="Resolved" color="success" />
        ) : (
          <Chip label="Unresolve" color="error" />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="View Complaint Details" placement="top">
          <IconButton
            sx={{ color: Colors.black }}
            onClick={() => {
              handleOpenView();
              handleIsRead(data.complaintId);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={view} onClose={handleCloseView} fullWidth>
          <DialogContent>
            <ViewComplaints key={data.complaintId} data={data} />
          </DialogContent>
        </Dialog>
        <Tooltip title="Mark as Resolve" placement="top">
          <IconButton
            sx={{ color: Colors.success }}
            onClick={() => {
              handleIsResolved(data.complaintId);

            }}
          >
            <AssignmentTurnedInIcon />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </>
  );
};

export default Complaints;
