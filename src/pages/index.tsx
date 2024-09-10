
import { useEffect, useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { iCompany, iPlace } from "../interfaces";
import { ThreeDots } from 'react-loading-icons'
import SinglePlace from '../components/placeitems/place';
import { fetcher } from '../helpers/fetcher';
import { getGlobalPage } from '../lib/pages/link.service';

const Home = () => {
  const [home, setHome] = useState<Partial<IhomePage>>({});

  interface IhomePage { company: iCompany, place: iPlace, type: string }

  useEffect(() => {
    const globalPage = getGlobalPage()

    if (!home?.type) {
      fetcher.get('/home', globalPage).then(data => {
        const home: IhomePage = data;
        setHome(home)
      });
    }
  }, [home]);

  // const [channel] = useChannel(
  //   'time',
  //   async (message: Types.Message) => {
  //     console.log('Received Ably message', message.data);
  //   }
  // )

  function render() {
    switch (home?.type) {
      case 'company':
        return parseCompany(home)
      case 'place':
        return parsePlace(home)
      default:
        return <ThreeDots stroke="#1976d2" strokeOpacity={.5} />
    }
  }

  function parseCompany({ company }: Partial<IhomePage>) {
    //return placesMap(company.places);
    return <div> asdas</div>
  }

  function parsePlace({ place }: Partial<IhomePage>) {
    if (!place) {
      return null;
    }
    //return placesMap(company.places);
    return <SinglePlace place={place} />
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
      <Grid container mb={2} alignItems="center" direction="row" justifyContent="center">
        {render()}
      </Grid>
    </Grid>
  );
}


export default Home;




