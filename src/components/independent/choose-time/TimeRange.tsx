import { Grid, Typography, Box, useTheme } from '@mui/material';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from '../../../../styles/Calendar.module.css'
import { ITimeShedule } from '../../../interfaces';
import { ThreeDots } from 'react-loading-icons';
import { padTo2Digits } from '../../../lib/other';

interface props {
    schedules: ITimeShedule[], activeItems: number[], setItems: any, loading: bool
}

const TimeB = (index: number, value: ITimeShedule, handleChange: (arg0: number) => void, active: boolean) => {
    const theme = useTheme()
    const transformDates = (value: string) => {
        let date = new Date(value);

        return (padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes()))
    }

    return (
        <div
            className={
                `${styles.squareBtn} ${active ? styles.squareBtnEnable : ''}
                ${value.active ? styles.squareBtnDisabled : ''}
                ${theme.palette.mode === 'dark' ? styles.squareBtnDisabledDark : ''}`
            }
            onClick={() => { handleChange(index) }}

        >
            {transformDates(value.time)}

        </div>

    );
};

export default function TimeRange({ schedules, activeItems, setItems, loading }: props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
    const containerStyles = isTabletOrMobile ?
        {
            height: 'calc(60vh - 196px)',
            width: '100%',
            overflow: 'auto'
        }
        :
        {
            height: 'calc(80vh - 200px)',
            width: '100%',
            overflow: 'auto'
        }

    const itemStyle = {
        margin: 'auto',
        justifyItems: 'center',
        '& div': {
            margin: '3.5px',
            width: '95px',
            height: '35px',
            border: '1px solid rgba(224, 226, 231, 1)'
        }
    }

    const containerStyle = {
        padding: '20px',
        minHeight: '70vh'
    }

    const headerStyle = {
        fontWeight: 500,
        fontSize: '20px',
        alignItems: 'center',
        textAlign: 'center',
        color: '#495BE7',
        padding: '20px'
    }

    const partOfDay = [
        'Ночь',
        'Утро',
        'День',
        'Вечер'
    ]


    const handleChange = (index: number) => {
        let m = [...schedules]
        if (m[index].active) {
            return
        }

        let newItems: any = [];

        if (activeItems.length >= 1 && activeItems[activeItems.length - 1] !== index && activeItems[0] !== index) {
            if (index > activeItems[0]) {
                for (let i = activeItems[0]; i <= index; i++) {
                    if (m[i].active) {
                        newItems = [index]
                        break;
                    }
                    newItems.push(i)
                }
            } else {
                for (let i = index; i <= activeItems[0]; i++) {
                    if (m[i].active) {
                        newItems = [index]
                        break;
                    }

                    newItems.push(i)
                }
            }
        } else {
            newItems.push(index)
        }

        setItems(newItems)
    }

    let defaultContainerStyles = {
        height: '50vh',
        width: '100%',
        overflow: 'auto'
    }

    return (
        <Box style={containerStyles ? containerStyles : defaultContainerStyles}>
            <Grid container sx={containerStyle} justifyContent={'center'} alignItems={'center'}>
                {schedules && schedules.length > 2 && schedules.map((value, index) => {
                    const renderWithDayPart = (index: number, partKey: number) => (
                        <React.Fragment key={index}>
                            <Grid item xs={12} sx={itemStyle}>
                                <Typography sx={headerStyle}>{partOfDay[partKey]}</Typography>
                            </Grid>
                            <Grid item xs={isTabletOrMobile ? 4 : 3} sx={itemStyle}>
                                {TimeB(index, value, handleChange, activeItems.includes(index) ? true : false)}
                            </Grid>
                        </React.Fragment>)

                    const checkActual = (start: number, end: number) => (
                        schedules.filter(v => (new Date(v.time)).getHours() >= start && (new Date(v.time)).getHours() < end)[0]?.time === value.time
                    )

                    if (checkActual(0, 5) && index != schedules.length - 1) {
                        return renderWithDayPart(index, 0)
                    } else
                        if (checkActual(5, 12) && index != schedules.length - 1) {
                            return renderWithDayPart(index, 1)

                        } else
                            if (checkActual(12, 18) && index != schedules.length - 1) {
                                return renderWithDayPart(index, 2)

                            } else
                                if (checkActual(18, 24) && index != schedules.length - 1) {
                                    return renderWithDayPart(index, 3)
                                } else {
                                    return (
                                        <Grid key={index} item xs={isTabletOrMobile ? 4 : 3} sx={itemStyle}>
                                            {TimeB(index, value, handleChange, activeItems.includes(index) ? true : false)}
                                        </Grid>)
                                }

                })}

                {schedules && schedules.length <= 2 && !loading && 'В выбранный день не осталось мест'}
                {loading && <ThreeDots stroke="#1976d2" strokeOpacity={.5} />}
            </Grid>
        </Box>
    );
}