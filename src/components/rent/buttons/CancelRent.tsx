import { iRent } from '../../../interfaces/index';
import { rentService } from '../../../lib/place/rent.service';
import MobileAdaptiveButton from '../../buttons/MobileAdaptiveButton';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cacncelrent({ rent, children, rentTouchedCounts, setRentTouchedCounts, ...other }:
    {
        rentTouchedCounts?: number, setRentTouchedCounts?: (i:number) => void, rent: iRent, children: any
}) {
    const [dialog, showDialog] = useState(false)
    const [alert, showAlert] = useState(false)
    const router = useRouter()

    const deleteRent = () => {
        showDialog(false)


        rentService._delete(rent.id).then(() => {
            if (router.query.id) {
                router.push('/rents')
            } else {
                showAlert(true)
                if(rentTouchedCounts != undefined) {
                    setRentTouchedCounts?.(rentTouchedCounts + 1)
                }
            }

        })

    }

    const showDialogHandle = () => {
        showDialog(true)
    }

    return (
        <React.Fragment>
            {
                alert &&
                <Snackbar open={alert} autoHideDuration={6000} onClose={() => showAlert(false)} >
                    <Alert severity="success">Аренда отменена успешно</Alert>
                </Snackbar>
            }
            {
                dialog &&
                <Dialog
                    open={dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Вы действительно хотите отменить запись на прием?</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            Данное действие приведет к отмене записи к специалисту
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => showDialog(false)}>Отменить действие</Button>
                        <Button onClick={deleteRent} color="error">Удалить</Button>
                    </DialogActions>
                </Dialog>
            }
            <MobileAdaptiveButton onClick={() => showDialogHandle()} variant='outlined' color="error" {...other}>
                {children ? children : 'Отменить запись'}
            </MobileAdaptiveButton>
        </React.Fragment>
    )
}