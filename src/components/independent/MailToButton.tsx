import { PhoneInTalk } from '@mui/icons-material';
import { Button } from '@mui/material';
import { iRent } from '../../interfaces/index';
import MailIcon from '@mui/icons-material/Mail';

export default function MailToButton({ mail, ...other }: { mail: string,  }) {

    return (
      <Button href={'mailto:mail@'+mail} endIcon={<MailIcon />} target='_blank' {...other}> 
      {mail}
  </Button>
    )
}