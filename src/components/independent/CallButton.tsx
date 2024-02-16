import { PhoneInTalk } from '@mui/icons-material';
import { Button } from '@mui/material';
import { iRent } from '../../interfaces/index';
import MobileAdaptiveButton from '../buttons/MobileAdaptiveButton'
import { Link, } from "@mui/material";

import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

export default function CallButton({ number,  ...other }: { number: string }) {

  return (
    <MobileAdaptiveButton href={'tel:' + number} endIcon={<PhoneEnabledIcon/>} { ...other}>
      Позвонить
    </MobileAdaptiveButton>
  )
}