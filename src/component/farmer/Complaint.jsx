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

const Complaint = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const [complaintsToggle, setComplaintsToggle] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenView = () => setView(true);
  const handleCloseView = () => setView(false);

  useEffect(() => {
    console.log(data);
  }, [complaintsToggle]);

  useEffect(() => {
    handleClose();
  }, [data]);

  return (
    <>
      <StyledTableCell align="center">
        {data.complaintPost}
      </StyledTableCell>
      <StyledTableCell align="center">
        {data.read ? (
          <Chip label="Read" color="primary" />
        ) : (
          <Chip label="Unread" color="warning" />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="View Complaint Details" placement="top">
          <IconButton onClick={handleOpenView} sx={{ color: Colors.black }}>
            <VisibilityRoundedIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={view} onClose={handleCloseView} fullWidth>
          <DialogContent>
            <ViewComplaints
              key={data.complaintId}
              data={data}
            />
          </DialogContent>
        </Dialog>
      </StyledTableCell>
    </>
  );
};

export default Complaint;
