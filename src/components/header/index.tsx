import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link'
import ProfileNav from './ProfileNav';
import Grid from '@mui/material/Grid';
import Profile from './ProfileNav';
import LinearProgress from '@mui/material/LinearProgress';
import { useContext } from "react";
import { AppContext } from "../../providers/AppProvider";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../pages/_app';

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems:any = [];
// const navItems = ['Home', 'About', 'Contact'];



export default function Header(props: Props) {
    const { progress, setProgress } = useContext(AppContext);
    const colorMode = React.useContext(ColorModeContext);
    const theme = useTheme();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', padding: '20px' }}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{


                    color: theme.palette.primary.light,
                    //fontFamily: 'apple-system',
                    //fontWeight: 700,
                    //letterSpacing: '.3rem',
                    //color: 'inherit',
                    //textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '36px',
                    lineHeight: '43px',
                }}
            >
                Rent
            </Typography>
            <Divider />
            <List>
                {navItems.map((item:number) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}

                {/* <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText
                            primary={
                                <Link href='/auth/login'>
                                    Войти
                                </Link>
                            } />
                    </ListItemButton>
                </ListItem> */}
                <Button sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Войти</Button>

            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', }}>
            <AppBar component="nav">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: 'blue' }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: theme.palette.primary.light,
                            //fontFamily: 'apple-system',
                            //fontWeight: 700,
                            //letterSpacing: '.3rem',
                            //color: 'inherit',
                            //textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '36px',
                            lineHeight: '43px',
                        }}
                    >
                        Rent
                    </Typography>
                    
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color={theme.palette.primary.light}>
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness7Icon />}
                        </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{}}>
                                <Link href="/">
                                    {item}
                                </Link>

                            </Button>
                        ))}
                   
                    </Box>

                    <ProfileNav />
                </Toolbar>

                {
                    progress && <Box sx={{ width: '100%', mt: 1 }}><LinearProgress /></Box>

                }
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
