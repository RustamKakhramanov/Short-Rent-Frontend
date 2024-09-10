import axios from 'axios/index';
import CodeConfirm from './code-confirm';
import { Box, TextField, Button, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import Router from 'next/router'
import * as React from 'react';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
interface Props {
    variant: React.ReactNode,
}
interface PhoneProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, PhoneProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="+7 (#00) 000 00-00"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);


export default function AuthForm(props: Props) {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState();
    const [errors, setErrors] = useState({ name: false, phone: false });


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let prefix = props.variant == 'register' ? 'register' : 'login';

        axios.post(`${publicRuntimeConfig.apiUrl}/auth/sms/${prefix}`, {
            phone: phone,
            name: name,
        }, {
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            Router.push('/auth/code-confirm?phone=' + phone);
        }).catch(function (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }else
            if (error.response.status === 404) {
                setErrors({
                    phone: ['Номер не найден! Необходима регистрация.']
                })
            }
        });
    };

    return (

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{
            mt: 5, display: 'flex',
            minWidth:'60%',
            flexDirection: 'column',
        }}>
            {
                props.variant === 'register'
                &&
                <FormControl sx={{ mt: 1, mb:2 }}>
                    <TextField
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name" label="Имя"
                        error={errors.name ? true : false}
                        required
                        variant='outlined'
                        helperText={errors.name ? errors.name.join(" ; ") : ''}
                    />
                </FormControl>
            }


            <FormControl sx={{ mt: 1, pt:1 }} error={errors.phone ? true : false}>
                <InputLabel htmlFor="phone">Введите телефон</InputLabel>
                <OutlinedInput
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\(|\)|\+|\-|\s+/g, ''))}
                    name="phone"
                    id="phone"
                    inputComponent={TextMaskCustom as any}

                />
                {errors.phone && <FormHelperText id="component-error-text">{errors.phone.join(" ; ")}</FormHelperText>}
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
    )
}