import { Button, Grid } from "@mui/material";
import { chosseTimeParse, padTo2Digits } from "../../../lib/other";
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { SimpleSaveBtn } from "../../buttons/RentButton";
import { useState } from 'react';
import Alert from "../Alert";

interface props {
    dates: any[],
    tooglePopup: (val: boolean) => void,
    setAlert: (b: boolean) => void
    variant?: 'desktop' | 'mobile',
}
interface mobileProps extends props {
    activeStep: number,
    setActiveStep: (val: number) => void,
}

//  chosseTimeParse()
const buttonStyle = {

}

export const MobileChoosedTimeSaver = ({ dates, tooglePopup, activeStep, setActiveStep, setAlert }: mobileProps) => {
    const [startDate, endDate] = getDates(dates);

    const handleOnClick = () => {
        if (activeStep > 1 && dates.length == 2) {
            setAlert(true)
            setActiveStep(3)
            tooglePopup(false)

        } else if (activeStep === 1) {
            setActiveStep(2)

        } else if (activeStep > 1 && dates.length < 2) {
            setActiveStep(1)
        }
        // return dates.length == 2 ? tooglePopup(false) : {};
    }

    const renderButtonText = () => {
        if (activeStep > 1 && dates.length == 2) {
            return 'Сохранить'

        } else if (activeStep === 1) {
            return 'Продолжить'

        } else if (activeStep > 1 && dates.length < 2) {
            return 'Назад'
        }
    }

    return (
        <Grid container p={'20px'} flexDirection={"column"}>

            <div className="items-title">Ваше выбранное время</div>
            <Grid container >
                <Grid item md={6} xs={6} className={'theme-saver-dates'} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, }}>
                    <Grid style={{ opacity: '0.5' }}>
                        <Grid className={"light-text"}>
                            Начало
                        </Grid>

                        <Grid>
                            {startDate}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} xs={6} className={'theme-saver-dates'} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, }}>
                    <Grid style={{ opacity: '0.5' }}>
                        <Grid className={"light-text"}>
                            Конец
                        </Grid>

                        <Grid>
                            {endDate}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <SimpleSaveBtn sx={{ marginTop: 3 }} variant="contained" onClick={() => handleOnClick()} style={buttonStyle}>
                {renderButtonText()}
            </SimpleSaveBtn>
        </Grid>
    )
}

export const DesktopChoosedTimeSaver = ({ dates, tooglePopup, setAlert }: props) => {
    const [startDate, endDate] = getDates(dates);
    const closePopup = () => {
        setAlert(true)
        tooglePopup(false)
    }

    return (
        <Grid container p={'20px'} flexDirection={"column"}>

            <div className="items-title">Ваше выбранное время</div>
            <Grid container >
                <Grid item md={6} xs={6} className={'theme-saver-dates'} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, }}>
                    <Grid style={{ opacity: '0.5' }}>
                        <Grid className={"light-text"}>
                            Начало
                        </Grid>

                        <Grid>
                            {startDate}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} xs={6} className={'theme-saver-dates'} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, }}>
                    <Grid style={{ opacity: '0.5' }}>
                        <Grid className={"light-text"}>
                            Конец
                        </Grid>

                        <Grid>
                            {endDate}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <SimpleSaveBtn variant="contained" onClick={() => dates.length === 2 ? closePopup() : {}} style={buttonStyle}>
                Сохранить
            </SimpleSaveBtn>
        </Grid>
    )
}

const getDates = (dates: props["dates"]) => {
    return [
        dates[0] ? padTo2Digits(dates[0].getHours()) + ':' + padTo2Digits(dates[0].getMinutes()) : '--:--',
        dates[1] ? padTo2Digits(dates[1].getHours()) + ':' + padTo2Digits(dates[1].getMinutes()) : '--:--'
    ]
}

export default function ChoosedTimeSaver(props: any) {


    return props.variant == 'desktop' && props ?
        <DesktopChoosedTimeSaver {...props} />
        :
        <MobileChoosedTimeSaver {...props} />
}