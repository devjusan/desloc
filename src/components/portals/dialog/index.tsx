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
  width,
  disableSubmitBtn,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stylesOptions = () => {
    const styles = Object.assign(
      {},
      {
        minWidth: '100%',
        minHeight: '100%',
      }
    ) as { [key: string]: string };

    if (height) {
      styles.height = height;
    }

    if (width) {
      styles.width = width;
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
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          {' '}
          {title}{' '}
        </DialogTitle>
        <DialogContentText
          sx={{
            padding: '0 24px',
            color: (theme) => theme.palette.secondary.light,
          }}
        >
          {description}
        </DialogContentText>
        <DialogContent style={stylesOptions()}>
          <Box component='article'>{Content}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={cbOnSubscribe}
            disabled={disableSubmitBtn}
            variant='contained'
          >
            Enviar
          </Button>
        </DialogActions>
      </MUIDialog>
    </div>
  );
};

export default Dialog;
