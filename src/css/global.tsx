import { GlobalStyles as GStyles, useTheme } from '@mui/material';
import { FC } from 'react';

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
          justifyContent: 'space-between',
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
