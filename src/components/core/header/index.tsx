import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Header: FC = () => {
  const router = useRouter();

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
        onClick={() => router.push('/')}
      >
        Deslocamento
      </Typography>
    </Box>
  );
};

export default Header;
