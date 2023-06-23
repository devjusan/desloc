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
          boxSizing: 'border-box'
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
