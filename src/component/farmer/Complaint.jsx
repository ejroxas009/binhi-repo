import React from "react";
import { useEffect, useState } from "react";

//component
import ViewComplaints from "./ViewComplaints";

//material
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Colors } from "../../styles/Theme/Theme";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Complaint = ({ complaints }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const [complaintsToggle, setComplaintsToggle] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenView = () => setView(true);
  const handleCloseView = () => setView(false);

  useEffect(() => {
    console.log(complaints);
  }, [complaintsToggle]);

  useEffect(() => {
    handleClose();
  }, [complaints]);

  return (
    <>
      <StyledTableCell align="center">
        {complaints.complaintPost}
        {console.log(complaints.complaintPost)}
      </StyledTableCell>
      <StyledTableCell align="center">
      {console.log(complaints.read)}
        {complaints.read ? (
          <Chip label="Read" color="primary" />
        ) : (
          <Chip label="Unread" color="warning" />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="View Complaint Details" placement="top">
          <IconButton onClick={handleOpenView}>
            <VisibilityRoundedIcon color="secondary" />
          </IconButton>
        </Tooltip>
        <Dialog open={view} onClose={handleCloseView} fullWidth>
          <DialogContent>
            <ViewComplaints
              key={complaints.complaintId}
              complaints={complaints}
            />
          </DialogContent>
        </Dialog>
      </StyledTableCell>
    </>
  );
};

export default Complaint;
