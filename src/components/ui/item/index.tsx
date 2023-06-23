import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface IItem {
  title: string;
  description: string;
  index: number;
  cb: () => void;
}

const Item: FC<IItem> = ({ cb, description, title, index }) => {
  const isEven = index % 2 === 0;

  return (
    <Box
      onClick={cb}
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
          !isEven ? theme.palette.background.default : theme.palette.divider
      }}
    >
      <Typography variant='h6'>{title}</Typography>
      <Typography variant='body1'>{description}</Typography>
    </Box>
  );
};

export default Item;
