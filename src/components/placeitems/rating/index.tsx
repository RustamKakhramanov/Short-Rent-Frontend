import { iUser } from '../../../interfaces/user-interface';
import { iSpeciality, iPlace } from '../../../interfaces/index';
import { Accordion, AccordionDetails, AccordionSummary, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import React, { Key, useContext, useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';


interface Rating {
    rating: number
    reviews_count: number,
    reviews?: [Review]
}

interface Reviewer {
    profile_id: number
    user_id: number,
    specialty: iSpeciality
}

interface Review {
    id: number,
    reviewer: Reviewer
    body: string
}

interface props {
    variant?: string,
    place: iPlace
}

export default function Rating({ variant = 'classic', place, ...other }: props) {

    const getParsedReviewsCount = () => {
        return place?.reviews_count + ' отзывов'
    }

    const render = () => {
        switch (variant) {
            case 'stars':
                return (
                    <Typography variant='h4' sx={{ width: '50%', textAlign: 'end' }} gutterBottom {...other}>
                        <Stars count={5} />
                        <Typography sx={{ marginRight: '10px' }} variant="body1" gutterBottom>
                            {place?.rating} · {getParsedReviewsCount()}
                        </Typography>
                    </Typography>
                );
            case 'short':
                return (
                    <Grid item  sx={{ justifyContent: 'start', display: 'flex' }} {...other}>
                        <Stars count={1} />

                        <Typography sx={{ marginRight: '10px' }} variant="body1" gutterBottom>
                            {place?.rating}({place?.reviews_count})

                        </Typography>
                    </Grid>
                );
            default:
                return (
                    <Grid item xs={12}  sx={{ justifyContent: 'start', display: 'flex', flexWrap: 'nowrap' }} {...other}>
                        <Stars count={1} />

                        <Typography sx={{ marginRight: '10px' }} variant="body1" gutterBottom>
                            {place?.rating} · {getParsedReviewsCount()}

                        </Typography>

                    </Grid>
                );
        }
    }

    return (
        <React.Fragment>
            {render()}
        </React.Fragment>
    )
}

const Stars = ({ count }: { count: number }) => {
    return (
        <React.Fragment>
            {Array.from({ length: count }).map((it, index) => <StarIcon key={index} sx={{ color: '#FF9500' }}></StarIcon>)}
        </React.Fragment>
    )
}