
import { Accordion, AccordionDetails, AccordionSummary, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdditionItem from "../../independent/AdditionItem";
import styles from '../../../../styles/Place.module.css';

interface props {
    items: any[],
    setItems: (i: any) => void
}

export default function AdditionalList({ items, setItems }: props) {
    return (
        <Accordion
            sx={{ border: 'none', boxShadow: 'none', backgroundColor: 'rgba(0, 0, 0, 0)', '&:before': { display: 'none', }, }}>
            <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: 0 }}
            >
                <div style={{ width: '100%', textAlign: 'start', display: 'flex', flexDirection: 'row' }}>
                    <Typography className={styles.subtitleAccordion} gutterBottom>
                        Добавленное оборудование
                    </Typography>
                    <KeyboardArrowDownIcon />
                </div>

            </AccordionSummary>
            <AccordionDetails
                sx={{ padding: 0 }}>
                <AdditionItem />
            </AccordionDetails>
        </Accordion>
    )
}