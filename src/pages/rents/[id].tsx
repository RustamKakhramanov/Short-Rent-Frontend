import { useRouter } from 'next/router'
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Paper, Button, Box, useTheme, Divider, Grid, ThemeProvider, Hidden, Typography } from "@mui/material";
import { Key, useContext, useEffect, useState } from "react";
import AdditionItem from "../../components/independent/AdditionItem";
import Item from "../../components/independent/ThemedPaper";
import RentInfo from "../../components/rent/RentInfo";
import ImageList from '../../components/independent/ImageList';
import StarIcon from '@mui/icons-material/Star';
import styles from '../../../styles/Rent.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { rentService } from "../../components/../lib/place/rent.service";
import { formatDate, parseCurrency } from "../../components/../lib/other";
import { iRent, iPlace } from '../../interfaces/index';
import Carousel from 'react-material-ui-carousel'
import ImagesSlider from '../../components/independent/ImagesSlider';
import PlaceContactsButtons from '../../components/placeitems/buttons/PlaceContactsButtons';
import SimpleMap from '../../components/independent/Map';
import CancelRentButton from '../../components/rent/buttons/CancelRent';
import ErrorPage from 'next/error'
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Rent() {
    const router = useRouter()
    const { id } = router.query
    const [rent, setRent] = useState<Partial<iRent>>({})
    const [place, setPlace] = useState<Partial<iPlace>>({})
    const [error, setErrorPage] = useState(false);

    const goToRentable = (e: any) => {
        window.open('/' + place?.company_slug + '/places/' + place?.slug, '_blank');
        e.stopPropagation();
    }
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useTheme();

    useEffect(() => {
        if (id) {
            rentService.show(id).then((res: iRent) => {
                if (!res.id) {
                    console.log(res)
                    setErrorPage(404)
                }

                setRent(res)
                setPlace(res.rentable)
            })
        }


    }, [id])



    const render = () => (
        <Item sx={{ padding: '30px', mt: 3 }}>
            <Grid container spacing={1}
                direction="row"
                justifyContent="space-between"

            >
                <Grid item xs={12} md={5}>
                    <Grid container spacing={1}
                        justifyContent="center"

                    >
                        <Grid item xs={12} >
                            {place
                                &&

                                <ImagesSlider
                                    images={place.images}
                                    imageParams={{ height: 421, width: '100%' }}
                                    withFull={true}
                                    autoplay={true}
                                    bottomComponent={
                                        <Grid container
                                            sx={{ p: 4 }}

                                        >
                                            <Typography variant="h4" sx={{ color: '#fff' }} >
                                                Вас примет: {place.name}
                                            </Typography>
                                            <Button size="medium"
                                                variant="outlined"
                                                sx={{ color: '#fff', mt: 2 }}
                                                onClick={(e) => goToRentable(e)}
                                            >
                                                Посмотреть место
                                            </Button>
                                        </Grid>
                                    }
                                    bottomFirst={true}
                                />
                            }
                        </Grid>
                    </Grid>

                    <Grid item xs={12} >
                        <PlaceContactsButtons contacts={place?.contacts} sx={{mt:2}} />
                    </Grid>
                    <Divider sx={{mt:4}} />

                </Grid>


                <Grid item xs={12} md={6}>
                <Hidden mdDown={true}>
                <Typography variant="h1" sx={{ fontSize: 36, mt:2 }} >
                        Детали записи:
                    </Typography>

            </Hidden>



                   <RentInfo rent={rent}/>


                   <Grid container spacing={1}
                   sx={
                    {

                        alignItems:'center'
                    }
                   }
                direction="row"
                justifyContent="space-between"

            >
                    <Grid item xs={12} md={6} sx={{mt: 3,}}>
                        <span className={styles.amountDescription}>Цена:</span>
                        <span className={styles.amountValue}>{parseCurrency(rent?.currency)}{+rent?.amount}</span>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{
                        display:'flex',

                        [theme.breakpoints.up('sm')]: {
                            justifyContent:'flex-end' ,
                          },
                          mt: 3,
                        }}>
                        {rent && <CancelRentButton rent={rent} />}
                    </Grid>

            </Grid>



                </Grid>



                <Grid item xs={12} sx={{ mt: 5 }}>
                    <Divider />
                    {place.coordinates && <SimpleMap coordinates={place.coordinates} />}

                </Grid>
            </Grid>
        </Item>
    )

    return (
        <React.Fragment>
            {error &&<ErrorPage statusCode={error} />}

            {rent.id && place.id && render() }
        </React.Fragment>

    )


}