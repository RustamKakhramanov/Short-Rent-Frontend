
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from '../../../../styles/Place.module.css';
import Stack from '@mui/material/Stack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import Avatar from '@mui/material/Avatar';
import { Button, Grid, ListItem, ListItemAvatar, ListItemText, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useMediaQuery } from 'react-responsive';
import { iAbility } from '../../../interfaces'
import { useEffect, useState } from 'react';
import Item from '../../independent/ThemedPaper';

interface Props {
    title: String;
    subtitle: String;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
const ServiceItem = ({ title, icon, subtitle }: React.PropsWithChildren<Props>,) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })


    return isTabletOrMobile ?
        <Box>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {React.createElement(icon, { className: styles.serviceMobileIcon })}
                    </Avatar>
                </ListItemAvatar>
                :
                <ListItemText primary={title} secondary={subtitle} />
            </ListItem>

        </Box>
        :
        (<Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }} className={styles.aItem}>
            {React.createElement(icon, { className: styles.serviceIcon })}
            <Typography noWrap={true} className={styles.aStartText} sx={{ overflow: 'visible' }}>{title}</Typography>
            <br />
            <Typography noWrap={true} className={styles.aEndText} sx={{ overflow: 'visible' }}>{subtitle} </Typography>
        </Stack>);

}

export default function Abilities({ abilities }: { abilities: iAbility[] }) {
    const [showed, setShowed] = useState<iAbility[]>([]);
    const limit = 3;

    useEffect(() => {
        setShowed(
            abilities.length > limit ? abilities.slice(0, limit) : abilities
        )
    }, [abilities])

    const items = showed.map((ability, index) => {
        return (
            <ServiceItem icon={TaskAltIcon}
                title={ability.name}
                subtitle={ability.value}
                key={index} />
        )
    })

    const changeShowed = () => {
        setShowed(abilities.length > showed.length ? abilities : abilities.slice(0, limit))
    }

    return (abilities && abilities.length > 0 &&
        <div style={{ marginTop: 20 }}>
            <Typography className={styles.subtitle}>Услуги</Typography>
            <div className={styles.aContainer}>
                {items}
            </div>
            {abilities.length > limit &&
                <Button
                    onClick={() => changeShowed()}

                    variant="outlined" sx={{ marginTop: 1, width: '100%', height: '45px', textTransform: 'none', backgroundColor: 'rgba(73, 91, 231, 0.05)', border: 'none', fontSize: '14px', borderRadius: '16px' }}>

                    {
                        abilities.length > showed.length ? 'Показать все услуги' : 'Свернуть список услуг'
                    }
                </Button>
            }
        </div>
    )
}