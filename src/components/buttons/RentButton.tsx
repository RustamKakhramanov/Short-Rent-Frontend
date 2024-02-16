import { Button, ButtonProps, styled } from "@mui/material";
import { useState } from "react";
import { padTo2Digits } from '../../lib/other';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import LinearProgress from '@mui/material/LinearProgress';
import { Divider, Grid, Hidden, Box } from '@mui/material';
import React from 'react'

// const styles = 'background: #495BE7 border - radius: 16px; '
export const SimpleSaveBtn = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
  width: '100%',
  height: '45px',
  borderRadius: '16px',
  color: '#fff',
  backgroundColor: '#495BE7',
  fontSize: '14px',
  [theme.breakpoints.up('md')]: {
    margin: '25px 0px',
  },
  '&:hover': {
    background: 'linear-gradient(90.84deg, #556BF0 -8.54%, #C36EED 107.89%)'
  },
  transition: 'background-color 2s'

}));


interface BtnPrpops extends LoadingButtonProps {
  text?: string,
};



export default function RentButton({ children,  loadingIndicator, ...other }: LoadingButtonProps) {

  const transformDates = (value: string) => {
    let date = new Date(value);

    return (padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes()))
  }

  return (
    <React.Fragment>
      <SimpleSaveBtn
        variant="outlined"
        loadingIndicator={loadingIndicator ? loadingIndicator : children ? children : "В процессе..."}
        {...other}
      >
        {children ? children : "Забронировать"}
      </SimpleSaveBtn>

    </React.Fragment>

  );
};

