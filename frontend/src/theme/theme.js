import { createTheme } from '@mui/material'
import colors from './colors'


const appTheme = createTheme({
    palette: {
        primary: {
            main: colors.GoGreen,
        },
        secondary: {
            main: colors.Camel,
        },
        background: {
            paper: colors.Isabelline
        },
        ...colors,
    },
});

export default appTheme