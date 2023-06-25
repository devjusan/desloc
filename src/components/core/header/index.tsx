import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <Box
      sx={{
        padding: '1rem',
        '&:hover': {
          '& p': {
            color: (theme) => theme.palette.primary.main,
          },
        },
        '& p': {
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
        },
      }}
      component='footer'
    >
      <Typography
        sx={{
          fontSize: '1.5rem',
          color: (theme) => theme.palette.secondary.main,
          fontWeight: 'bold',
        }}
      >
        Deslocamento
      </Typography>
    </Box>
  );
};

export default Header;
