import { PhoneInTalk } from '@mui/icons-material';
import { Button } from '@mui/material';
import { iRent } from '../../interfaces/index';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function InstagramButton({ login, ...other }: { login: string }) {

    return (
        <Button href={'https://www.instagram.com/'+login?.replace('@', '')} endIcon={<InstagramIcon />} target='_blank' {...other}>
            {login}
        </Button>
    )
}
