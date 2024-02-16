import { PhoneInTalk } from '@mui/icons-material';
import { Button } from '@mui/material';
import { iRent } from '../../interfaces/index';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MobileAdaptiveButton from '../buttons/MobileAdaptiveButton'

export default function WhatsAppChatButton({ number, ...other }: { number: string }) {
  let value = 'https://wa.me/' + number;
  // let value = 'https://wa.me/' + number?.replace('+7', '8');

  return (
    <MobileAdaptiveButton href={value} endIcon={<WhatsAppIcon />} target='_blank' {...other}>
      Написать в WhatsApp
    </MobileAdaptiveButton>
  )
}