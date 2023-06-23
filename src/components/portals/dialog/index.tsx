import { FC } from 'react';
import Button from '@mui/material/Button';
import MUIDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '@/src/types/modal/dialog';
import { Box } from '@mui/material';

const Dialog: FC<DialogProps> = ({
  setOpen,
  isOpen,
  Trigger,
  Content,
  description,
  cbOnSubscribe,
  title,
  height,
  width
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

  const stylesOptions = () => {
    const styles = Object.assign(
      {},
      {
        minWidth: '100%',
        minHeight: '100%'
      }
    );

    if (height) {
      styles.minHeight = height;
    }

    if (width) {
      styles.minWidth = width;
    }

    return styles;
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <Trigger />
      </div>
      <MUIDialog open={isOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            color: (theme) => theme.palette.secondary.main
          }}
        >
          {' '}
          {title}{' '}
        </DialogTitle>
        <DialogContent style={stylesOptions()}>
          <DialogContentText
            sx={{
              color: (theme) => theme.palette.secondary.light
            }}
          >
            {description}
          </DialogContentText>
          <Box component='article'>{Content}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Enviar</Button>
        </DialogActions>
      </MUIDialog>
    </div>
  );
};

export default Dialog;
