import { useRouter } from 'next/router'
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Paper, Button, Box, createTheme, Divider, Grid, ThemeProvider, Hidden, Typography, styled, SxProps } from "@mui/material";
import { Key, useContext, useEffect, useState } from "react";
import AdditionItem from "../independent/AdditionItem";
import RootBox from "../independent/ThemedPaper";
import RentInfo from "./RentInfo";
import ImageList from '../independent/ImageList';
import StarIcon from '@mui/icons-material/Star';
import styles from '../../../styles/Rent.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from "react-responsive";
import { rentService } from "../../lib/place/rent.service";
import { formatDate, parseCurrency } from "../../lib/other";
import { iRent, iPlace } from '../../interfaces/index';
import PlaceContactsButtons from '../placeitems/buttons/PlaceContactsButtons';
import CancelRentButton from './buttons/CancelRent';
import PlaceListItem from '../placeitems/PlaceListItem';
import MobileAdaptiveButton from '../buttons/MobileAdaptiveButton';
import Cost from './Cost';


const theme = createTheme({
    components: {

        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1rem',
                },
            },
        },
    }
});

interface props {
    rent: iRent,
    sx?: SxProps,
    sliderSx?: SxProps,
    infoSx?: SxProps,
    infoCol?: number,
    sliderCol?: number,
    rentTouchedCounts?: number,
    setRentTouchedCounts?: (i:number) => void,
}

export default function RentCard({ rent, rentTouchedCounts, setRentTouchedCounts, infoCol = 6, sliderCol = 6, sliderSx = { height: 321 }, infoSx = {}, ...other }: props) {
    const router = useRouter()

    const getToRent = () => router.push('/rents/'+rent?.id)

    return (
        <PlaceListItem
            place={rent?.rentable}
            sliderSx={sliderSx}
            infoSx={infoSx}
            sliderCol={sliderCol}
            infoCol={infoCol}

            {...other}
        >
            <Box sx={{p:2}}>
                <RentInfo rent={rent} micro={true} />
                <PlaceContactsButtons micro= {true} contacts={rent?.rentable?.contacts}  />

                <Grid container direction='row' sx={{justifyContent:'space-between', mt:2}}>
                    <Grid item xs={12} md={infoCol >6 ? 12 : 'auto'}>
                        <Cost  justifyContent="center" cost={+ rent.amount} price={rent.rentable.price} place={rent.rentable} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    </Grid>
                    <Grid item xs={12} md={infoCol >6 ? 12 : 6}>
                        <MobileAdaptiveButton sx={{mt:2, width:'100%'}} onClick={() => getToRent()} variant='outlined'>
                            Посмотреть детально
                        </MobileAdaptiveButton>
                    </Grid>

                    <Grid item xs={12} md={infoCol >6 ? 12 : 6}>

                        <CancelRentButton sx= {{mt:2}} rentTouchedCounts={rentTouchedCounts} setRentTouchedCounts={setRentTouchedCounts} rent={rent} >
                            Отменить
                        </CancelRentButton>

                    </Grid>
                </Grid>
            </Box>
        </PlaceListItem>
    )


}
