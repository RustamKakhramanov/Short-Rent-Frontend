import { useRouter } from 'next/router'
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Paper, Button, Box, createTheme, Divider, Grid, ThemeProvider, Hidden, Typography, styled, SxProps } from "@mui/material";
import { Key, useContext, useEffect, useState } from "react";
import AdditionItem from "../../components/independent/AdditionItem";
import RootBox from "../../components/independent/ThemedPaper";
import RentInfo from "../../components/rent/RentInfo";
import ImageList from '../../components/independent/ImageList';
import StarIcon from '@mui/icons-material/Star';
import styles from '../../../styles/Rent.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from "react-responsive";
import { rentService } from "../../components/../lib/place/rent.service";
import { formatDate, parseCurrency } from "../../components/../lib/other";
import { iRent, iPlace } from '../../interfaces/index';
import Carousel from 'react-material-ui-carousel'
import ImagesSlider from '../../components/independent/ImagesSlider';
import PlaceContactsButtons from '../../components/placeitems/buttons/PlaceContactsButtons';
import SimpleMap from '../../components/independent/Map';
import CancelRentButton from '../../components/rent/buttons/CancelRent';
import { abort } from "../../lib/pages/route.service"
import ErrorPage from 'next/error'
import { ThreeDots } from 'react-loading-icons'

const ParentBox = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        margin: '25px 0px',
    },
    color: theme.palette.text.secondary,
}));


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
    children?: React.ReactNode,
    place: iPlace,
    sx: SxProps,
    sliderSx: SxProps,
    infoSx: SxProps,
    infoCol: number,
    sliderCol: number,
}

export default function PlaceListItem({ place, children, sx, infoCol = 6, sliderCol = 6, sliderSx = { height: 321 }, infoSx = {}, ...other }: props) {


    const initialRender = () => {
        return (
            <div>Add children</div>
        )
    }

    const goToRentable = (e: any) => {
        window.open('/' + place?.company_slug + '/places/' + place?.slug, '_blank');
        e.stopPropagation();
    }

    return (
        <ParentBox sx={sx ? sx : { mt: 6, mb: 2, borderRadius: 2 }} {...other}>
            <Grid container spacing={1}
                justifyContent="center"
            >
                {place
                    &&
                    <Grid item xs={12} md={sliderCol} sx={{pt:'0!important'}}>
                        <ImagesSlider
                            images={place.images}
                            imageParams={{ height: 321, width: '100%' }}
                            withFull={true}
                            bottomComponent={
                                <Grid container
                                    sx={{ p: 4 }}
                                    direction={'column'}
                                    alignItems={'start'}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{ color: '#fff', textAlign: 'left', lineHeight: '1.2' }} >
                                            Вас будет ожидать: <br />{place.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button size="medium"
                                            variant="outlined"
                                            sx={{ color: '#fff', mt: 2 }}
                                            onClick={(e) => goToRentable(e)}
                                        >
                                            Посмотреть анкету
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                            sx={sliderSx}
                            bottomFirst={true}
                        />
                    </Grid >

                }
                <Grid item xs={12} md={infoCol} sx={infoSx}>
                    {children ? children : initialRender()}
                </Grid>

            </Grid>
        </ParentBox>
    )


}