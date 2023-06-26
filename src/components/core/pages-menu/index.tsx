import { Box, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import MobileMenu from '../mobile-menu';

const PagesMenu: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-end' : 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {!isMobile ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <Link href='/'>Clientes</Link>
          <Link href='/drivers'>Condutores</Link>
          <Link href='/vehicles'>Veículos</Link>
          <Link href='/displacements'>Deslocamentos</Link>
        </Box>
      ) : (
        <MobileMenu />
      )}
    </Box>
  );
};

export default PagesMenu;
