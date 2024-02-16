import Typography, { TypographyProps } from '@mui/material/Typography';
import { Grid, GridProps, styled } from '@mui/material';
import { iPlace, iPrice, iSchedule, ITimeShedule } from '../../interfaces';
import { parseCurrency, calculateCost } from '../../lib/other';

const Container = styled(Grid)<GridProps>(({ theme }) => ({
    justifyContent: 'flex-end',

    [theme.breakpoints.up('xs')]: {
        padding: '0 25px',
        justifyContent: 'space-between'
    },
    [theme.breakpoints.up('md')]: {
        padding: '0 0',
    },
}));

const CoastText = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontSize: '14px',
    color: '#4C4C4C',
    [theme.breakpoints.up('xs')]: {
    },

    [theme.breakpoints.up('md')]: {
        fontSize: '19px',
    },
}));

const CoastPrice = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: '#4C4C4C',
    fontSize: '22px',
    [theme.breakpoints.up('xs')]: {
        marginLeft: 20
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '32px',
    },
}));

interface iProps {
    place: iPlace; // make this optional since the data from PeopleState is optional
    additionalItems: any[],
    dates: any[],
    cost: number,
    justifyContent: string,
    price: iPrice
}

export default function Cost(props: iProps) {
    const { place, additionalItems, dates, price, cost, ...other } = props

    return (
        <Container container
            direction="row"
            justifyContent={props.justifyContent ? props.justifyContent : "space-between"}
            alignItems="center"
            style={{ marginBottom:10 }}
            {...other}
        >
            <CoastText gutterBottom>
                Всего:
            </CoastText>
            <CoastPrice gutterBottom>
                {parseCurrency(price.currency)}{isNaN(cost) ? '0' :cost} 
            </CoastPrice>
        </Container>
    )
}