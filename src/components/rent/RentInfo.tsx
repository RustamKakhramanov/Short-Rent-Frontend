import { Accordion, Link, Tooltip, Paper, Button, Box, createTheme, Divider, Grid, ThemeProvider, ButtonGroup, Typography } from "@mui/material";
import styles from '../../../styles/Rent.module.css';
import { iRent } from '../../interfaces';
import React from 'react'
import { isOneDay, formatDate, getTimeDate } from '../../lib/other';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function RentInfo({ rent, micro = false }: { micro: boolean, rent: iRent }) {
    console.log(isOneDay(new Date(rent.scheduled_at), new Date(rent.scheduled_end_at)))

    const renderMicro = () => (
        <React.Fragment>
            {
                isOneDay(new Date(rent.scheduled_at), new Date(rent.scheduled_end_at)) ?
                    <div style={{ display: 'flex', flexWrap: "nowrap", alignItems: 'center', marginTop: 10, marginLeft: -1 }}>

                        <AccessTimeIcon sx={{ marginRight: .5 }} />



                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }} component={'span'} variant={'body2'}>
                            {getTimeDate(rent.scheduled_at)}
                            -
                            {getTimeDate(rent.scheduled_end_at)}
                            {" "}
                            {formatDate(rent.scheduled_end_at, true)}
                        </Typography>

                    </div>

                    :
                    <div style={{ display: 'flex', flexWrap: "nowrap", alignItems: 'center', marginTop: 10, marginLeft: -1 }}>

                        <AccessTimeIcon sx={{ marginRight: .5 }} />



                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }} component={'span'} variant={'body2'}>
                            C {formatDate(rent.scheduled_at)}
                            {" "}

                            {getTimeDate(rent.scheduled_at)}
                            {" "}

                            -
                            По {formatDate(rent.scheduled_end_at)}
                            {" "}

                            {getTimeDate(rent.scheduled_end_at)}
                        </Typography>

                    </div>
            }
            <Tooltip title="Кликните для перехода к навигатору" placement="bottom-end">

                <Typography sx={{ textAlign: 'left' }} component={'span'} variant={'body2'}>

                    <div style={{ display: 'flex', flexWrap: "nowrap", alignItems: 'center', marginTop: 10, marginLeft: -5 }}>
                        <LocationOnIcon sx={{ fontSize: 30, marginRight: .5 }} />

                        <Link sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                            href={'https://yandex.ru/maps/?rtext=~' + rent.rentable?.coordinates?.latitude + ',' + rent.rentable?.coordinates?.longitude + '&z=12&l=map'}
                            target={'_blank'}
                        >
                            {rent.rentable.address}
                        </Link>


                    </div>
                </Typography>
            </Tooltip>

        </React.Fragment>

    )

    const renderFull = () => (
        <Grid container spacing={1}
            direction="row"
            justifyContent="space-between"
            sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                p: 3,
                pt: 5,
                pb: 5,
                mt: 5
            }}

        >

            <Grid item xs={12} >
                <span className={styles.detailDescription}>Начало:</span>
                <span className={styles.detailValue}>{formatDate(rent.scheduled_at, true, true)}</span>

            </Grid>
{/*
            <Grid item xs={12} >
                <span className={styles.detailDescription}>Конец:</span>
                <span className={styles.detailValue}>{formatDate(rent.scheduled_end_at, true, true)}</span>
            </Grid> */}



            <Grid item xs={12} sx={{ mt: 1 }} >
                <Typography>
                    <span className={styles.detailDescription}>Адрес:</span>
                    <span className={styles.detailValue}>{rent.rentable.address} </span>
                </Typography>

            </Grid>
        </Grid>
    )

    return (
        <React.Fragment>
            {
                rent.rentable &&
                <React.Fragment>
                    {micro ? renderMicro() : renderFull()}
                </React.Fragment>
            }
        </React.Fragment>


    )
}