import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AppContext } from '../../providers/AppProvider';
import { useState, useEffect } from 'react';

const AlertComponent = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface props {
  variant?: 'success' | 'warning' | 'info' | 'error',
  message: string,
  onClose?: () => void,
}

interface alertProps extends props {
  open: boolean,
  setOpen: (bool:boolean) => void
}

interface smartProps extends props {
  message: string,
  onClose?: () => void,
  isOpen: boolean
}



export default function Alert({ variant = 'success', message, onClose, open, setOpen }: alertProps) {

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      onClose={() => setOpen(false)}
    >

      <AlertComponent onClose={onClose ? onClose : () => setOpen(false)} severity={variant} sx={{ width: '100%' }}>
        {message}
      </AlertComponent>
    </Snackbar>
  );
}

export const SmartAlert = ({ variant = 'success', message, onClose, isOpen }: smartProps) => {
  const [open, setOpen] = useState(false);
  const [initOpen, setInitOpen] = useState(false);


  useEffect(() => {
    if (isOpen && !initOpen) {
      setInitOpen(true)
      setOpen(true)
    }

  }, [isOpen, initOpen])

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      onClose={() => setOpen(false)}
    >

      <AlertComponent onClose={onClose ? onClose : () => setOpen(false)} severity={variant} sx={{ width: '100%' }}>
        {message}
      </AlertComponent>
    </Snackbar>
  );
}