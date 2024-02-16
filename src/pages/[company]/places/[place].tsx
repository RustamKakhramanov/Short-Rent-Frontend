
// import { useChannel } from '@ably-labs/react-hooks';
import { Types } from 'ably';
import { useRouter } from 'next/router'
import React, { useState, useContext, useEffect } from 'react';
import { ThreeDots } from 'react-loading-icons';
import { fetcher } from '../../../helpers';
import { iCompany, iPlace } from '../../../interfaces';
import { AppContext } from '../../../providers/AppProvider';
import { abort } from '../../../lib/pages/route.service';
import SinglePlace from '../../../components/placeitems/place';
import Grid from '@mui/material/Grid';

export default function CompanyPlace() {
    const router = useRouter()
    const place_slug = router.query.place as string
    const company_slug = router.query.company as string
    const [place, setPlace] = useState<iPlace>({})

    useEffect(() => {
        if(place_slug && company_slug) {
            fetcher.get('/companies/' + company_slug + '/places/' + place_slug).then((r) => setPlace(r))
        }

    }, [place_slug, company_slug])

    function render() {
     if(place.id){
        return  <SinglePlace place={place} />
     }
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