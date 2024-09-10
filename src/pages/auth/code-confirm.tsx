import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios/index';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IMaskInput } from 'react-imask';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { OutlinedInput, Button } from '@mui/material';
import { userService } from '../../lib/user'
import getConfig from 'next/config';
import Router from 'next/router';
import { iAuthData } from '../../interfaces/user-interface';
import {getCookie } from 'cookies-next';
import { getRedirectLinkAndRemove } from '../../lib/pages/link.service';

const { publicRuntimeConfig } = getConfig();

export default function CodeConfirm() {
    let phone = useRouter().query['phone']
    const [image, setImage] = useState('/images/first.jpg')
    const [code, setCode] = useState<string | null>(null)
    const [errors, setErrors] = useState({ error: false });
    const [distance, setDistance] = useState(11);
    const r = useRouter();
    const getCodeFromRoute = (key: string = 'invite') => {
        let code = r.query[key];
        return typeof code == 'string' ? code : null;
    }
    const getCodeFromCookies = (key: string = 'invite') => {
        let code = getCookie(key);
        return typeof code == 'string' ? code : null;
    }

    let inviteCode = getCodeFromRoute() ? getCodeFromRoute() : getCodeFromCookies();

    useEffect(() => {
        if (typeof inviteCode == 'string') {
            axios.get(`${publicRuntimeConfig.apiUrl}/invite/${inviteCode}`)
                .then((response) => {
                    setImage(response.data.data.url);
                });
        }
    }, [image, inviteCode])

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (distance > 0) {
                setDistance(distance - 1);
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });



    const resend = async (event: any) => {
        event.preventDefault();

        axios.post(`${publicRuntimeConfig.apiUrl}/auth/sms/resend`, {
            phone: phone,
        }, {
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            setDistance(60);
        }).catch(function (error) {
            alert('Ошибка отправки')
        });

    }


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        axios.post(`${publicRuntimeConfig.apiUrl}/auth/sms/confirm`, {
            code: code,
            phone: phone,
            provider: 'sms'
        }, {
            headers: { 'Content-Type': 'application/json' }
        }).then(function ({ data }: { data: iAuthData }) {
            userService.setaAuth(data);
            const link = getRedirectLinkAndRemove('/')

            Router.push(link);

        }).catch(function (error) {
            if (error.response.status === 401) {
                setErrors(error.response.data)
            }
        });
    };

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
                            Подтверждение
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                            mt: 5, display: 'flex',
                            minWidth: '60%',
                            flexDirection: 'column',
                        }}>

                            <FormControl sx={{ mt: 1, pt: 1 }} error={errors.error ? true : false}>
                                <InputLabel htmlFor="code">Введите код</InputLabel>
                                <OutlinedInput
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    name="code"
                                    id="code"
                                    inputComponent={TextMaskCustom as any}

                                />
                                {errors.error && <FormHelperText id="component-error-text">неверный код</FormHelperText>}
                            </FormControl>


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Отправить
                            </Button>
                        </Box>

                        <Grid container style={{ justifyContent: 'center', marginTop: 20 }}>
                            <Grid item>
                                <Link href="/auth/register">
                                    {"Нет аккаунта? Регистрация"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: 'center', marginTop: 10 }}>
                            <Grid item>
                                <Link href="/auth/login">
                                    {"Есть аккаунт? Авторизация"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: 'center', marginTop: 20 }}>
                            <Grid item>
                                {distance <= 0 ? <Button onClick={(e) => resend(e)}>Отправить код</Button> : 'Отправить код повторно можно будет через ' + distance}
                            </Grid>
                        </Grid>
                    </Box>
                    <Copyright />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}


interface CodeProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CodeProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);


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