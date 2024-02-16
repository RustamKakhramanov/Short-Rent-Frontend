import Link from 'next/link'
import Button from '@mui/material/Button';
import { userService } from '../../lib/user';
import { useEffect, useState } from 'react';
import { ButtonGroup, useTheme, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';


export default function ProfileNav(props: any) {
    const [authorized, setAuthorized] = useState(false);
    const [user, setUser] = useState({});
    const theme = useTheme();

    // const user = useUser;

    useEffect(() => {
        setAuthorized(userService.hasUser());
        setUser(userService.userValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        userService.logout();
        setAuthorized(userService.hasUser());
        setUser({})
    }

    const router = useRouter()
    
    return (
        <div >
            {authorized ?
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => router.push('/rents')}>
                    {/* <Button onClick={() => router.push('/profile')}> */}
                        <AccountCircleIcon/> Мои аренды
                    </Button>
                    {/* <Button onClick={() => router.push('/profile')}>
                        <AccountCircleIcon/>
                    </Button> */}
                    <Button
                        sx={{ display: { sm: 'block' } }}
                        color="secondary"
                        onClick={() => logout()}
                    >
                        Выйти
                    </Button>
                </ButtonGroup>
                :

                <Typography sx={{
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '16px',
                    alignContent: 'center',
                    color: theme.palette.mode == 'dark'? '#fff':'#000'
                }}> 
                <Link href='/auth/login'>Войти</Link>
                </Typography>


            }

        </div>
    );

}