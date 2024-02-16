import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthForm from './auth-form';
import axios from 'axios/index';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { error } from 'console';
import getConfig from 'next/config';
import { useRouter } from 'next/router'
import { setCookie, getCookie, deleteCookie, getCookies } from 'cookies-next';
const { publicRuntimeConfig } = getConfig();

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/RustamKakhramanov">
                Allrents
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();

export default function Login() {
    const [image, setImage] = useState('')
    const r = useRouter();
    const getCodeFromRoute = (key: string = 'invite') => {
        let code = r.query[key];
        return typeof code == 'string' ? code : null;
    }
    const getCodeFromCookies = (key: string = 'invite') => {
        let code = getCookie(key);
        return typeof code == 'string' ? code : null;
    }

    let code = getCodeFromRoute() ? getCodeFromRoute(): getCodeFromCookies();

    useEffect(() => {
        if (typeof code == 'string') {
            axios.get(`${publicRuntimeConfig.apiUrl}/invite/${code}`)
                .then((response) => {
                    setImage(response.data.data.url);
                }).catch(error => setImage('/images/first.jpg'));
        }else {
            setImage('/images/first.jpg')
        }

    }, [image, code])

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Авторизация
                        </Typography>

                        <AuthForm variant='login' />

                        <Grid container style={{ justifyContent: 'center', marginTop: 20 }}>
                            <Grid item>
                                <Link href="/auth/register">
                                    {"Нет аккаунта? Регистрация"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Copyright />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}