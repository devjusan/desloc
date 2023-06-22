import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
    display: 'swap',
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
})

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(239, 240, 235)',
        },
        secondary: {
            main: '#ffc709',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#191919',
            paper: '#1e1e1e'
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily
    }
});

export default theme;