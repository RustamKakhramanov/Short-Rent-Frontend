import * as React from 'react';
import Divider from '@mui/material/Divider';
import AdbIcon from '@mui/icons-material/Adb';

import { iPlace } from '../../interfaces';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardActions, CardContent, createTheme, Paper, Stack, Switch, ThemeProvider } from '@mui/material';
import Place from './place';


export default function Places(places: [iPlace]) {


  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      width='100%'
    >
      {places.map((place, key) => (
        <div key={key} >
          <Place place={place} key={key} ></Place>
        </div>

      ))}

    </Stack>
  )
}
