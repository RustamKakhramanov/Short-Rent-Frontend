import { Link, Collapse, AccordionSummary, Button, createTheme, Tooltip, Grid, Typography } from "@mui/material";
import React, { Key, useContext, useEffect, useState } from "react";
import { iPlace } from "../../interfaces";
import AdditionItem from "../independent/AdditionItem";
import Item from "../independent/ThemedPaper";
import PlaceBox from "./PlaceBox";
import ImageList from '../independent/ImageList';
import StarIcon from '@mui/icons-material/Star';
import styles from '../../../styles/Place.module.css';
import { useMediaQuery } from "react-responsive";
import { rentService } from "../../lib/place/rent.service";
import Rating from "./rating";
import MobileAdaptiveButton from "../buttons/MobileAdaptiveButton";
import RentWidget from '../rent/RentWidget';
import ImagesSlider from "../independent/ImagesSlider";
import PlaceContactsButtons from "./buttons/PlaceContactsButtons";
import ReviewForm from "../rent/review/ReviewForm";
import ContactPageIcon from '@mui/icons-material/ContactPage';
interface PlaceInterface {
  place: iPlace,
}

export default function Place({ place }: PlaceInterface) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 900px)'
  })

  const [showContact, toggleShowContact] = useState(false)

  const renderContacts = () => (
    
    <Grid item xs={12} md={12} container justifyContent={'center'} sx={{mt:1.5}}>
               {!showContact &&<Button endIcon={<ContactPageIcon/>} variant="outlined" onClick={() => toggleShowContact(!showContact)} sx={{ width:"100%"}}>Показать контакты</Button>}
              
              <Collapse in={showContact} timeout="auto" unmountOnExit>
                <PlaceContactsButtons justifyContent="flex-start"  contacts={place?.contacts}  />
              </Collapse>
            </Grid>
  )

  return (
    <React.Fragment>
      <Item sx={{ padding: '30px' }}>
        <Grid container spacing={1}
          direction="row"
          justifyContent="space-between"

        >
          <Grid item xs={12} md={8}>
            {isDesktopOrLaptop &&
              <Grid item xs={12} >
                <Typography className={styles.cardText} gutterBottom>
                  {place.name}
                </Typography>
              </Grid>
            }

            <Rating place={place} />

            {isTabletOrMobile &&
              <Grid item xs={12} >
                <Typography className={styles.cardText} gutterBottom>
                  {place.name}
                </Typography>
              </Grid>
            }

            <Grid item xs={12} sx={{ justifyContent: 'start', display: 'flex' }}>
            <Tooltip title="Кликните для перехода к навигатору" placement="bottom-end">
  
                      <Typography gutterBottom>
                        <Link sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                          href={'https://yandex.ru/maps/?rtext=~' + place?.coordinates?.latitude + ',' + place?.coordinates?.longitude + '&z=12&l=map'}
                          target={'_blank'}
                        >
                          {place.address}
                        </Link>
                      </Typography>
            </Tooltip>

            </Grid>

            <Grid item xs={12} >
              {isTabletOrMobile &&
                <ImagesSlider
                  images={place.images}
                  imageParams={{ height: 225, width: '100%' }}
                  withFull={true}
                />
              }
              {isDesktopOrLaptop && <ImageList images={place.images} h='300px' w='300px' />}
              {isTabletOrMobile && 
              <React.Fragment>
                  <RentWidget place={place} mobile={true} />
                  { place.can_review && <ReviewForm url={ `/api/companies/${place.company_slug}/places/${place.slug}/reviews`} sx={{ mt:2}}/>}
                  {renderContacts()}
                </React.Fragment>
              }
               
              <PlaceBox place={place} />

            </Grid>

          </Grid>

          {isDesktopOrLaptop && 
          <Grid item xs={12} md={3.8}>
            <RentWidget place={place} />
            { place.can_review && <ReviewForm url={ `/api/companies/${place.company_slug}/places/${place.slug}/reviews`} sx={{ mt:1}}/>}
            {renderContacts()}
          </Grid>
          
          }


        </Grid>
      </Item>
    </React.Fragment>
  );

}