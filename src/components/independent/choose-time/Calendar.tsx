
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Box from '@mui/material/Box';
import ruLocale from 'date-fns/locale/ru';
import 'dayjs/locale/ru';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import React from 'react';
import { createTheme, styled } from '@mui/material/styles';


const MyStaticDatePicker = styled(StaticDatePicker)({
  color: 'darkslategray',
 
  borderRadius: 4,
  '.MuiPickerStaticWrapper-content' : {borderRadius: 12,},
  '.MuiPickersCalendarHeader-labelContainer': {color: 'rgba(73, 91, 231, 1)'},
  '.MuiDayPicker-weekDayLabel': {fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#4C4C4C'},
  '.Mui-selected': {
    backgroundColor: 'rgba(73, 91, 231, 1)',
    
    borderRadius:10,
  },
  '.MuiPickersDay-dayWithMargin': {
    fontSize: '16px',
  }

});

interface Item {
  data: Date | null,
  setData: React.SetStateAction<any>,
}
const Calendar = ({data, setData}: Item) => {
  // const [value, setValue] = useState<Date  | null>(() =>
  // dayjs(),
  // );
  
  const setDateFromPicker = (v:any) => {
    // date.setTime(date.getTime() + (6*60*60*1000));
    setData(v.$d)
  }

  return (
    <Box sx={{}}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'} locale={'ru'}>
      <MyStaticDatePicker
        displayStaticWrapperAs="desktop"
        disablePast={true}
        onChange={(value) => setDateFromPicker(value)}
        value={data}
        renderInput={(params) => <TextField {...params} />}
     
        components={{}}
      />
    </LocalizationProvider>
    
    </Box>
  );
};




export default Calendar;