import { PhoneInTalk } from '@mui/icons-material';
import { Button } from '@mui/material';
import { iRent } from '../../interfaces/index';
import TelegramIcon from '@mui/icons-material/Telegram';


export default function TelegramChatButton({ login, ...other }: { login: string }) {

    return (
        <Button href={'tg://resolve?domain='+login?.replace('@', '')} endIcon={<TelegramIcon />} {...other}>
            {login}
        </Button>
    )
}