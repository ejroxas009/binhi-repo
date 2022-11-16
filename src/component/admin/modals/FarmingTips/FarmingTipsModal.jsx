import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Colors } from '../../../../styles/Theme/Theme';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  '& .MuiTextField-root': { m: 1, width: '25ch' },
};

export default function FarmingTipsModal({content}) {
  const [farmingTips, setfarmingTips] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [modalForm, setModalForm] = useState({
    farmingTipsId: "",
    farmingTipsDesc: "",
    farmingTips: "",
    farmingTipsImg: "",
    farmingTipsLink: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    setModalForm({...modalForm, farmingTipsId: farmingTips.farmingTipsId});
    setModalToggle(!modalToggle);
  };
  return (
    <div>
      
      <Fab onClick={handleOpen} color="primary" aria-label="add"
            sx={{
              position: "absolute",
              bottom: (theme) => theme.spacing(5),
              right: (theme) => theme.spacing(5),
              backgroundColor:Colors.primary
              }}>
              <AddIcon />
            </Fab>
      {content.map((contentModal) => (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={style}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Create Tips  
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField fullWidth id="title" label="Farming Tip Title" variant="outlined" />
          <TextField
            fullWidth
            id="description"
            label="Description"
            multiline
            rows={4}
          />
          </Typography>
        </Box>
      </Modal>
      ))}
    </div>
  );
}
