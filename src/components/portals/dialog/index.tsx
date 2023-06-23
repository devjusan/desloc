import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '@/src/types/modal/dialog';
import { Box } from '@mui/material';

const FormDialog: FC<DialogProps> = ({
  setOpen,
  isOpen,
  Trigger,
  Content,
  description,
  cbOnSubscribe,
  title,
  height
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    cbOnSubscribe();
    handleClose();
  };

  return (
    <div>
      <Trigger onClick={handleClickOpen} />
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle> {title} </DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <Box component='article'>{Content}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
