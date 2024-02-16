import React, { useEffect, useState, } from 'react';

import Ably from 'ably/promises';
import Box from '@mui/material/Box';



const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });
const channel = ably.channels.get("message.new");
  export default function AblyComponent() { 

    // useEffect(() => {
    //     channel.presence.enter("time", (error) => {
    //         if (error) throw error;
    //         console.log(error)
    //     })

    // });
    return (<Box></Box>)
  }