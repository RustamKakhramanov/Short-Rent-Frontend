
import { useEffect, useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useContext } from "react";
import { AppContext } from '../providers/AppProvider';
import { iCompany, iPlace } from "../interfaces";
import { ThreeDots } from 'react-loading-icons'
import Place from "../components/placeitems/places";
// import { useChannel, usePresence } from '@ably-labs/react-hooks'
import type { Types } from 'ably'
import { userService } from '../lib/user/user.service';
import { Abort } from '../lib/pages/route.service';
import { fetcher } from '../helpers/fetcher';

const Home = () => {
  const [home, setHome] = useState<Partial<IhomePage>>({});

  interface IhomePage { company: iCompany, type: string }


  useEffect(() => {
  
    if (!home.type) {
      fetcher.get('/home').then(res => {
        const home: IhomePage = res.data;
        setHome(home)
      }).catch(e => <Abort code={e.response.status}/>);
    }
  }, [home, ]);

  // const [channel] = useChannel(
  //   'time',
  //   async (message: Types.Message) => {
  //     console.log('Received Ably message', message.data);
  //   }
  // )

  function render() {
    switch (home.type) {
      case 'company':
        return parseCompany(home)
    }
  }

  function parseCompany({company}: IhomePage) {
    //return placesMap(company.places);
    return Place(company.places)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      flexDirection="column"
      justifyContent='space-around'
      minHeight='40vh'
      width='100%'
      mt={5}
    >
      <Grid container mb={2}  alignItems="center" direction="row" justifyContent="center">
        {render()}
      </Grid>
    </Grid>
  );
}


export default Home;




