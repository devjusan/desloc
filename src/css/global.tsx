import {
  Container,
  GlobalStyles as GStyles,
  SxProps,
  Theme,
  useTheme
} from '@mui/material';
import { FC } from 'react';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  styles?: SxProps<Theme>;
};

export const PageContainer: FC<Props> = ({ children, styles }) => {
  return (
    <Container
      maxWidth='lg'
      component='section'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        p: '2rem',
        overflowY: 'auto',
        ...styles
      }}
    >
      {children}
    </Container>
  );
};

export const GlobalStyles: FC = () => {
  const theme = useTheme();

  return (
    <GStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          scrollBehavior: 'smooth',
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },

          '*::-webkit-scrollbar-track': {
            background: '#f1f1f1'
          },

          '*::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '$full'
          },

          '*::-webkit-scrollbar-thumb:hover': {
            background: '#999'
          },

          '::-moz-selection': {
            background: 'rgba(255, 199, 9, 0.86)'
          },

          '::selection': {
            background: ' rgba(255, 199, 9, 0.66)'
          }
        },
        '#__next': {
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: theme.palette.background.default
        },
        'html, body': {
          color: theme.palette.primary.main
        },
        a: {
          color: theme.palette.secondary.main,
          textDecoration: 'none'
        }
      }}
    />
  );
};
