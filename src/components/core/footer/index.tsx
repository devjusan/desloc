import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        p: 6
      }}
      component='footer'
    >
      <Container maxWidth='sm'>
        <Typography variant='body2' align='center'>
          <Link color='inherit' href='https://google.com/'>
            Todos os direitos reservados
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
