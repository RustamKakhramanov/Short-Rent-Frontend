import { Button, ButtonProps, styled } from "@mui/material";
import { useState } from "react";
import { padTo2Digits } from '../../lib/other';
import LinearProgress from '@mui/material/LinearProgress';
import { Divider, Grid, Hidden, Box } from '@mui/material';
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';


export const Btn = styled(Button)<ButtonProps>(({ theme }) => (
  {
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));


export default function MobileAdaptiveButton({ children, className, ...other }: ButtonProps) {
  return (
    <Btn
      {...other}
    >
      {children}
    </Btn>


  );
};