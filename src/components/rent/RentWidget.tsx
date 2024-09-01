import ThemedPaper from '../independent/ThemedPaper';
import Typography from '@mui/material/Typography';
import styles from '../../styles/Place.module.css';
import StarIcon from '@mui/icons-material/Star';
import ChooseTime from '../independent/choose-time/ChooseTime';
import RentButton from '../buttons/RentButton';
import { Divider, Grid, Hidden, useTheme } from '@mui/material';
import { rentService } from '../../lib/place/rent.service';
import { iPlace, iPrice, iRent } from '../../interfaces/index';
import CancelRules from './CancelRules';
import Rating from '../placeitems/rating/index';
import PlacePrice from '../placeitems/price';
import { useMediaQuery } from 'react-responsive';
import AdditionalList from '../placeitems/additional/AdditionalList';
import Cost from './Cost';
import { calculateCost } from '../../lib/other';
import SendIcon from '@mui/icons-material/Send';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../providers/AppProvider";
import { useRouter } from 'next/router';

interface props {
    place: iPlace,
    mobile?: boolean,
}


export default function RentWidget({ place, mobile }: props) {
    const router = useRouter()
    const theme = useTheme()
    const { progress, setProgress } = useContext(AppContext);
    const [activeItems, setItems] = useState([]);
    const [additionalItems, setAdditionalItems] = useState([]);
    const [price, setPrice] = useState<iPrice>({
        name: '',
        type: '',
        currency: '',
        value: 0,
        start_date: new Date(),
        end_date: null
    });
    const [dates, setDates] = useState([]);
    const [openedPopup, tooglePopup] = useState(false);
    const [cost, setCost] = useState(0);

    const createRent = () => {
        setProgress?.(true)
        rentService.rent(
            place,
            {
                scheduled_at: dates[0],
                scheduled_end_at: dates[dates.length - 1],
                currency: price.currency,
                amount: cost,
            }
        ).then((res: iRent) => {
            router.push('/rents/' + res.id)
        }).catch((e: Response) => {
            if(e.status == 400){
                e.json().then(errorData => {
                    alert(errorData.message)
                })
            }
        })

        setProgress?.(false)
    }

    useEffect(() => {
        if (dates.length == 2) {
            setCost(calculateCost(dates, price))
        }
    }, [dates, place, price])

    // Desktop
    const Desktop = () => (
        <ThemedPaper
            className={'rent-widget'}
            sx={{ justifyContent: 'start', display: 'flex', flexWrap: 'wrap', padding: '25px' }}>
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <PlacePrice price={price} />

                <Rating variant='short' place={place} />
            </Grid>

            <Hidden xsUp={true}>
                <Typography variant='body2' sx={{ padding: '5px', fontSize: '14px' }}>
                    Выберите свободную дату и время
                </Typography>
            </Hidden>

            <ChooseTime
                place={place}
                activeItems={activeItems}
                tooglePopup={(val) => tooglePopup(val)}
                openedPopup={openedPopup}
                setPrice={setPrice}
                setItems={setItems}
                dates={dates}
                setDates={setDates} />

       {/* <AdditionalList items={additionalItems} setItems={setAdditionalItems} />  */}
       {/* <CancelRules /> */}


            <RentButton
                loading={progress}
                onClick={() => {
                    dates.length > 1 ? createRent() : tooglePopup(true)
                }}
                sx={{ color: '#fff' }} />

            <Divider sx={{ color: 'black' }}></Divider>

            {/* {dates.length > 1 && <Cost cost={cost} price={price} place={place} additionalItems={additionalItems} dates={dates} />} */}
        </ThemedPaper>
    )

    // Mobile
    const Mobile = () => (
        <React.Fragment>
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <PlacePrice price={price} />

                <Rating variant='short' place={place} />
            </Grid>


            <div className={'rent-widget'} style={{  background: theme.palette.mode === 'dark' ? '#262b32' : "#ffff" }}>
                <ChooseTime
                    place={place}
                    activeItems={activeItems}
                    tooglePopup={(val) => tooglePopup(val)}
                    openedPopup={openedPopup}
                    setItems={setItems}
                    dates={dates}
                    setPrice={setPrice}
                    setDates={setDates} />



                {/* <CancelRules /> */}

                {/* {dates.length > 1 && <Cost cost={cost} price={price} place={place} additionalItems={additionalItems} dates={dates} />} */}

                {dates.length > 1
                    &&
                    <RentButton loading={progress} onClick={() => { dates.length > 1 ? createRent() : tooglePopup(true) }} />}
                {/* {dates.length > 1 && <Cost />} */}
                <Divider sx={{ color: 'black' }}></Divider>
            </div>

        </React.Fragment>
    )


    return mobile ? Mobile() : Desktop()
}