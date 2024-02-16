import Button from '@mui/material/Button';
import React, { ReactFragment, ReactNode, useCallback, useContext } from 'react';
import Popup from 'reactjs-popup';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Item from '../ThemedPaper';
import Calendar from './Calendar';
import styles from '../../../../styles/Calendar.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { iPlace, iPrice, iSchedule, ITimeShedule } from '../../../interfaces';
import { fetcher } from '../../../helpers/fetcher';
import { AppContext } from '../../../providers/AppProvider';
import { userService } from '../../../lib/user/user.service';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import TimeRange from './TimeRange';
import { ThreeDots } from 'react-loading-icons';
import { Box } from '@mui/system';
import { Dialog, useTheme, SwipeableDrawer, useMediaQuery } from '@mui/material';
import { chosseTimeParse } from '../../../lib/other';
import { render } from 'react-dom';
import ChoosedTimeSaver from './ChoosedTimeSaver';
import Alert from '../Alert';
import { iShedule } from '../../../interfaces/index';
import Image from 'next/image'

interface props {
  place: iPlace; // make this optional since the data from PeopleState is optional
  activeItems: number[],
  setItems: (items: any) => void,
  dates: any[],
  setDates: (items: any) => void,
  setPrice: (price: iPrice) => void,
  openedPopup: boolean, tooglePopup: (i: boolean) => void,
}


function ChooseTime(props: props) {
  // let startDate = new Date()
  // startDate.setTime(startDate.getTime() + (6*60*60*1000))

  const { place, activeItems, setItems, dates, setDates, tooglePopup, openedPopup, setPrice } = props
  const [schedules, setShedules] = useState<ITimeShedule[]>([])
  const sheduleUrl = `/companies/${place?.company?.slug}/places/${place.slug}/schedules`
  const [date, setDate] = useState(new Date())
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const theme = useTheme()


  useEffect(() => {
    const effectChangeSchedule = (day:any) => {
      setLoading(true)
      setShedules([])

      fetcher.get(sheduleUrl, day ? { day } : {}).then((res: iShedule) => {
        setDates([])
        setItems([])
        setShedules(res.schedule)
        setPrice(res.price)
        setLoading(false)

      })
    }
    
    effectChangeSchedule(date.toISOString());

  }, [date, setDates, setItems, setShedules, setPrice, sheduleUrl])

  useEffect(() => {
    if (activeItems.length >= 1 && schedules) {
      let datesAray = [
        new Date(schedules[activeItems[0]]?.time)
      ];

      if (activeItems.length >= 2) {
        datesAray.push(new Date(schedules[activeItems[activeItems.length - 1]]?.time));
      }
      setDates(datesAray);
    }
  }, [activeItems, setDates, schedules])

  const [activeStep, setActiveStep] = useState(1)

  const isDesktop = useMediaQuery('(min-width:900px)');
  const buttonStyle = {
    '&:hover': {
      background: '#4a5be7',
      color: '#fff',
    },
    '&:hover p': {
      color: '#fff',
    }, width: '100%', height: '45px', margin: '15px 0px', borderRadius: '16px', border: '1px solid #495BE7'
  };



  const render = () => {
    const closeDrawer = () => {
      setAlert(true)
      tooglePopup(false)
    }

    return isDesktop ?
      // Desktop version
      <Dialog onClose={() => closeDrawer()} open={openedPopup}
        sx={{
          '& .MuiDialog-paper': {

            maxWidth: '80%',
            boxShadow: 'none',
            backgroundColor: 'transparent'
          },
        }}
      >
        <Grid container sx={{ padding: '5% 0', display: 'flex', flexDirection: 'row', overflow: 'hidden', flexWrap: 'nowrap' }} spacing={2}>
          <Grid item sx={{ borderRadius: '16px', maxHeight: '340px' }}>
            <Calendar data={date} setData={setDate} />
          </Grid>
          <Grid item sx={{ height: '90vh' }}>
            <Paper style={{ height: '80vh', width: '440px', overflow: 'hidden', borderRadius: '20px', }}>
              <TimeRange {...props} schedules={schedules} loading={loading}/>
              <ChoosedTimeSaver variant={'desktop'} dates={dates} setAlert={setAlert} tooglePopup={tooglePopup} />
            </Paper>
          </Grid>
        </Grid>
      </Dialog>

      :

      // Mobile version
      <SwipeableDrawer
        onOpen={() => tooglePopup(true)}
        transitionDuration={{ appear: 33, enter: 33, exit: 33 }}
        anchor='bottom'
        open={openedPopup}
        disableBackdropTransition={true}
        onClose={() => closeDrawer()}
        sx={{
          borderRadius: '20px', '.MuiPaper-root': {
            borderRadius: '44px 44px 0px 0px'
          },
          maxHeight: '30vh',
          width: '100%'
        }}
      >
        <div style={{ height: '60vh + 25px', margin: '20px' }}>
          <div style={{
            width: '60px',
            margin: '0 auto 15px',
            borderRadius: '15px',
            border: '3px solid rgb(73, 91, 231)',
          }} />

          {
            activeStep == 1 ?
              <Calendar data={date} setData={setDate}></Calendar>
              :
              <TimeRange {...props} schedules={schedules} />
          }

          <ChoosedTimeSaver variant={'mobile'} {...props} setAlert={setAlert} activeStep={activeStep} setActiveStep={setActiveStep} />
        </div>
      </SwipeableDrawer>
  }


  // Main Render
  return (
    <React.Fragment>
      <Button variant="outlined" sx={buttonStyle}
        startIcon={<Image width={14} height={14} src='/images/calendar.svg' alt={'calendar'}/>}
        endIcon={<KeyboardArrowRightIcon />}
        onClick={() => tooglePopup(true)}
      >
        <Typography sx={{ marginRight: 'auto', color:theme.palette.mode === 'dark' ?'#fff' : '#000', fontSize: isDesktop ? '14px' : '18px', textTransform: 'none' }}>
          {chosseTimeParse(dates)}
        </Typography>
      </Button>

      {openedPopup && render()}

      {dates.length > 1 && < Alert message={'сохранено'} setOpen={(bool: boolean) => setAlert(bool)} open={alert} />}
    </React.Fragment >
  )
};


export default ChooseTime;