import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import Dialog from '../../portals/dialog';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';
import { toastService } from '@/src/services';
import { messages } from '@/src/config/messages/general';

interface IItem {
  title: string;
  description: string;
  index: number;
  cb: () => void;
  cbOnDelete?: () => void | Promise<void>;
}

const Item: FC<IItem> = ({ cb, description, title, cbOnDelete, index }) => {
  const [open, setOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '85px',
        minHeight: '85px',
        borderRadius: '10px',
        cursor: 'pointer',
        paddingRight: '20px',
        background: (theme) =>
          !isEven ? theme.palette.background.default : theme.palette.divider,
      }}
    >
      <Box
        onClick={cb}
        component='div'
        style={{
          width: '100%',
          padding: '0 20px',
        }}
      >
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body1'>{description}</Typography>
      </Box>

      <Dialog
        title={PAGE_MESSAGES.GENERIC.DIALOG.DELETE.TITLE(title)}
        description={PAGE_MESSAGES.GENERIC.DIALOG.DELETE.SUBTITLE}
        isOpen={open}
        setOpen={setOpen}
        cbOnSubscribe={() => {
          try {
            cbOnDelete?.();
          } catch (error) {
            toastService.error(messages.error.default);
          } finally {
            setOpen(false);
          }
        }}
        Content={<div> </div>}
        Trigger={() => (
          <Button
            sx={{
              my: '2rem',
            }}
            variant='contained'
          >
            Excluir
          </Button>
        )}
        height='20px'
      />
    </Box>
  );
};

export default Item;
