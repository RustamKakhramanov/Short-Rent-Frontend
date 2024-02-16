
import React, {useState}  from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import styles from '../../../../styles/Place.module.css';
import Stack from '@mui/material/Stack';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Icon from '@mui/material/Icon';
import PetsIcon from '@mui/icons-material/Pets';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import { GridView } from '@mui/icons-material';
import { Button, Grid, ListItem, ListItemAvatar, ListItemText, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useMediaQuery } from 'react-responsive';
import Item from '../../independent/ThemedPaper';
import { iReview, iPlace } from '../../../interfaces';
import { formatDate } from '../../../lib/other';
import Rating from '../rating';

interface props {
  place: iPlace
}

const ReviewItem = ({ review }: { review: iReview }) => {
  const theme = useTheme()
  return (
    <Item sx={{ margin: '10px', borderRadius: '10px' }}>
      <Grid container
      alignItems="center"
      sx={{marginBottom: 2}}
      >
        <Grid item xs={3} md={1} sx={{ marginRight: '10px' }}>
          <Avatar
            alt={review.reviewer?.name}
            src={review.reviewer.avatar?.icon_url ? review.reviewer.avatar?.icon_url : review.reviewer.name} sx={{ margin: 'auto',width: 50, height:50  }} />
        </Grid>
        <Grid item xs={8} md={10}>
          <Typography sx={{ color: theme.palette.mode === 'dark'? 'white' : '#000', overflow: 'visible' }}>{review.reviewer?.name}</Typography>
          <Typography variant="body2">{formatDate(review.created_at, true)}</Typography>
        </Grid>
      </Grid>


      <Typography sx={{ marginTop: .7 }} variant="body2" className={styles.firstWord} gutterBottom>
        <span style={{ fontWeight: 'bold',color: theme.palette.mode === 'dark'? 'white' : '#000' }}> Достоинства:</span> {review.advantages}
      </Typography>
      <Typography sx={{ marginTop: .7 }} variant="body2" className={styles.firstWord} gutterBottom>
        <span style={{ fontWeight: 'bold',color: theme.palette.mode === 'dark'? 'white' : '#000' }}> Недостатки:</span> {review.disadvantages}
      </Typography>

      {review.comment &&<Typography sx={{ marginTop: 1.3 }} variant="body2" className={styles.firstWord} gutterBottom>
        <span style={{ fontWeight: 'bold',color: theme.palette.mode === 'dark'? 'white' : '#000' }}> Комментарий:</span> {review.comment}
      </Typography>}
    </Item>
  );
}

export default function Reviews({ place }: props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
  let {reviews } = place
  const reviewItems = reviews?.map((item, i) => {
    return <ReviewItem review={item} key={i} />
  })

  return (
    <React.Fragment>
      {
        reviews.length > 0 ? 
        <React.Fragment>
        
          {!isTabletOrMobile && <Typography className={styles.subtitle}>Отзывы</Typography>}
          {!isTabletOrMobile && <Rating place={place} style={{marginTop: '10'}}/>}
    
          <Stack sx={{ display: 'flex', flexDirection: 'column'}}>
            {reviewItems}
          </Stack>
        </React.Fragment>
        :
        <Typography>Отзывов пока нет</Typography>
      }
     
    </React.Fragment>
  )
}