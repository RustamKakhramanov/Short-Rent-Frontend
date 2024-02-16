import Typography from '@mui/material/Typography';
import styles from '../../../styles/Place.module.css';
import { iPrice } from '../../interfaces';
import { parseCurrency } from '../../lib/other';

interface props { price: iPrice }

export default function PlacePrice({ price }: props) {
    const render = (price: iPrice) => {
        switch (price.type) {
            case 'per_hour':
                return (
                    <div style={{ width: '50%', textAlign: 'start', display: 'flex', flexDirection: 'row' }}>
                        <Typography variant='h5' className={styles.subtitle} gutterBottom>
                            {parseCurrency(price.currency)}{isNaN(+ price.value) ? '' : + price.value}
                        </Typography>
                        <Typography variant='body1' className={styles.subtitlePrice} gutterBottom>
                            /{price.name}
                        </Typography>
                    </div>
                )
                break;
        }
    }

    return (<div>{price && render(price)}</div>)
}