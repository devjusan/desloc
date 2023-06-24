import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import Dialog from '../../portals/dialog';
import { PAGE_MESSAGES } from '@/src/config/messages/pages';

interface IItem {
  title: string;
  description: string;
  index: number;
  cb: () => void;
  cbOnDelete?: () => void;
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
        padding: '0 20px',
        borderRadius: '10px',
        cursor: 'pointer',

        background: (theme) =>
          !isEven ? theme.palette.background.default : theme.palette.divider,
      }}
    >
      <Box onClick={cb} component='div'>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body1'>{description}</Typography>
      </Box>

      <Dialog
        title={PAGE_MESSAGES.CLIENT.DIALOG.DELETE.TITLE(title)}
        description={PAGE_MESSAGES.CLIENT.DIALOG.DELETE.SUBTITLE}
        isOpen={open}
        setOpen={setOpen}
        cbOnSubscribe={cbOnDelete || (() => {})}
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
      />
    </Box>
  );
};

export default Item;
