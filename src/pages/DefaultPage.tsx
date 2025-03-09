import '../App.css'
import Footer from '../components/atoms/Footer';
import Container from '../components/atoms/Container';

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/molecule/Header';
import SideDrawer from '../components/molecule/SideDrawer';

const drawerWidth = 960;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const DefaultPage = (props: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };
  
  return (
    <Container>
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header handleDrawer={handleDrawer} />
                <SideDrawer handleDrawer={handleDrawer} open={open} drawerWidth={drawerWidth} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                </Box>
            </Box>
          {props.children}
        </ThemeProvider>
        <Footer />
    </Container>
  );
}

export default DefaultPage; 