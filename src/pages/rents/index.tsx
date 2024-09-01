import { useRouter } from 'next/router'
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Paper, Button, Box, useTheme, Divider, Grid, ThemeProvider, Hidden, Typography } from "@mui/material";
import { Key, useContext, useEffect, useState } from "react";
import AdditionItem from "../../components/independent/AdditionItem";
import RootBox from "../../components/independent/ThemedPaper";
import RentInfo from "../../components/rent/RentInfo";
import ImageList from '../../components/independent/ImageList';
import StarIcon from '@mui/icons-material/Star';
import styles from '../../../styles/Rent.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { rentService } from "../../components/../lib/place/rent.service";
import { formatDate, getRandomArbitrary, parseCurrency } from "../../components/../lib/other";
import { iRent, iPlace } from '../../interfaces/index';
import Carousel from 'react-material-ui-carousel'
import ImagesSlider from '../../components/independent/ImagesSlider';
import PlaceContactsButtons from '../../components/placeitems/buttons/PlaceContactsButtons';
import SimpleMap from '../../components/independent/Map';
import CancelRentButton from '../../components/rent/buttons/CancelRent';
import ErrorPage from 'next/error'
import { ThreeDots } from 'react-loading-icons'
import RentCard from '../../components/rent/RentCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';


export default function Rents() {
    const [rents, setRents] = useState<iRent[]>([])
    const [rentTouchedCounts, setRentTouchedCounts] = useState(0)
    const [loader, setLoader] = useState(true)
    const theme = useTheme();

    useEffect(() => {
        rentService.list().then((res: iRent[]) => {
            setRents(res)
            setLoader(false)
        })
    }, [rentTouchedCounts])



    const renderRents = () => {
        if (rents) {
            return (
                <Grid container spacing={1}
                    justifyContent="center"
                >
                    <Grid item xs={12} md={10}>
                        <Typography variant="h1" sx={{ fontSize: '3.5rem', mb: 4, textAlign: 'center' }} >
                            Мои записи
                        </Typography>
                    </Grid>

                        <Grid container
                            spacing={1}
                            justifyContent="center"
                            direction="row"
                        >


                            {
                                rents.length > 0 && rents?.map((item, i) => (
                                    <Grid item xs={12} md={i === 3? 12 : 4}  key={i} >
                                        {
                                            i === 3?

                                            <RentCard
                                            rent={item}
                                            style={{padding:'0 0 8px'}}
                                            infoCol={6}
                                             sliderCol={6}
                                             rentTouchedCounts={rentTouchedCounts} setRentTouchedCounts={setRentTouchedCounts}
                                            />
                                            :
                                            <RentCard
                                            rent={item}
                                            style={{padding:'0 0 8px'}}
                                            infoCol={12}
                                             sliderCol={12}
                                             rentTouchedCounts={rentTouchedCounts} setRentTouchedCounts={setRentTouchedCounts}
                                            />
                                        }

                                    </Grid>

                                ))
                            }
                        </Grid>
                </Grid>
            )


        } else {
            return <Typography variant='h2'>Аренд нет</Typography>
        }

    }


    return (
            <Grid container
                justifyContent="center"
                sx={{ [theme.breakpoints.up('md')]: {
                    p:3,
                  }, mt: 3, minHeight: '80vh', alignItems: 'center' }}

            >
                {loader ? <ThreeDots stroke="#1976d2" strokeOpacity={.5} /> : renderRents()}
            </Grid>
    )


}