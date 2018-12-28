import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './App';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontSize: 16
    }
});

export default function AppRoot() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MuiThemeProvider>
    )
}
