import { Box } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

const PagesMenu: FC = () => {
  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
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
        <Link href='/displacements'>Deslocamentos</Link>
        <Link href='/vehicles'>Veículos</Link>
      </Box>
    </Box>
  );
};

export default PagesMenu;
