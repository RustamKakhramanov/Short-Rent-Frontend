
// import { useChannel } from '@ably-labs/react-hooks';
import { Types } from 'ably';
import { useRouter } from 'next/router'
import React, { useState, useContext, useEffect } from 'react';
import { fetcher } from '../../../helpers';
import { iPlace } from '../../../interfaces';
import SinglePlace from '../../../components/placeitems/place';
import Grid from '@mui/material/Grid';
import { saveGlobalPage } from '../../../lib/pages/link.service';
import { getPlaceByCompany } from '../../../lib/place/main.service';
import { Abort } from '../../../lib/pages/route.service';
import { AppContext } from '../../../providers/AppProvider';

export default function CompanyPlace() {
  const router = useRouter()
  const place_slug = router.query.place as string
  const company_slug = router.query.company as string
  const [place, setPlace] = useState<iPlace>({})
  const { setError } = useContext(AppContext);

  useEffect(() => {
    if (place_slug && company_slug) {
      const data = {
        place_slug,
        company_slug
      }

      getPlaceByCompany(data).then((r) => {
        setPlace(r)
        const urlParams = new URLSearchParams(window.location.search);
        const globalParam = urlParams.get('global');

        if (globalParam) {
          saveGlobalPage(data)
        }
      })
        .catch((e) => {
          setError?.({code:e.status, })
        })
    }

  }, [place_slug, company_slug])

  function render() {
    if (place.id) {
      return <SinglePlace place={place} />
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
      <Grid container mb={2} alignItems="center" direction="row" justifyContent="center">
        {render()}
      </Grid>
    </Grid>
  );
}