import { Collapse, List, Grid, ListItemButton, useMediaQuery, Typography, useTheme } from "@mui/material";
import CallButton from "../../independent/CallButton";
import WhatsAppChatButton from "../../independent/WhatsAppChatButton";
import TelegramButton from "../../independent/TelegramButton";
import MailToButton from "../../independent/MailToButton";
import InstagramButton from "../../independent/InstagramButton";
import { iContact } from "../../../interfaces";
import { searchFromArray, formatPhone } from "../../../lib/other";
import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Link from '@mui/material/Link';


export default function PlaceContactsButtons({ contacts,
    micro = false,
    onlyChat = false,
    onlyMedia = false,
    justifyContent = 'center',
    ...otherProps
}: { micro: boolean, onlyChat: boolean, onlyMedia: boolean, justifyContent: string, contacts: [iContact] }) {
    let phone = searchFromArray('phone', contacts, 'type')?.value
    let whatsapp = searchFromArray("whatsApp", contacts, 'type')?.value

    let other = contacts?.filter(contact => contact.type != 'whatsApp' && contact.type != 'phone')
    const theme = useTheme();

    const renderMicro = () => (
        <React.Fragment>
            {
                phone &&
                <Typography sx={{ textAlign: 'left' }} component={'span'} variant={'body2'}>
                    <div style={{ display: 'flex', flexWrap: "nowrap", alignItems: 'center', marginTop: 10, }}>
                        <PhoneIphoneIcon sx={{ marginRight: .5 }} />
                        <Link href={'tel:' + phone} color={theme.palette.mode === 'dark' ? '#fff' : '#000'} sx={{ fontSize: 18 }}>
                            {formatPhone(phone)}
                        </Link>
                    </div>
                </Typography>
            }

        </React.Fragment>
    )

    const renderFull = () => (
        <Grid container spacing={1}
            sx={{ mt: 1, maxWidth: '100%' }}
            {...otherProps}
        >
            {!onlyMedia && !onlyChat &&
                 <React.Fragment>
                    <Grid item xs={12} justifyContent={justifyContent} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {phone && <CallButton number={phone} variant='outlined' xs={12} />}
                        {whatsapp && <WhatsAppChatButton number={whatsapp} variant='outlined' />}
                    </Grid>
                    <Grid item xs={12} justifyContent={justifyContent} sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1 }}>
                        {
                            other && other.map((contact, i) => {
                                switch (contact.type) {
                                    case 'mail':
                                        return <MailToButton sx={{ fontSize: '16px', textTransform: 'unset' }} size="small" mail={contact.value} key={i} />
                                    case 'telegram':
                                        return <TelegramButton sx={{ fontSize: '16px', textTransform: 'unset' }} size="small" login={contact.value} key={i} />
                                    case 'instagram':
                                        return <InstagramButton sx={{ fontSize: '16px', textTransform: 'unset' }} size="small" login={contact.value} key={i} />
                                    default:
                                        return null
                                }
                            })
                        }
                    </Grid>
                </React.Fragment>
            }

            {onlyMedia &&
                 <Grid item xs={12} justifyContent={justifyContent} sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1 }}>
                    {
                        other && other.map((contact, i) => {
                            switch (contact.type) {
                                case 'instagram':
                                    return <InstagramButton sx={{ fontSize: '16px', textTransform: 'unset' }} size="small" login={contact.value} key={i} />
                                default:
                                    return null
                            }
                        })
                    }
                </Grid>

            }

            {onlyChat &&
                <React.Fragment>
                    <Grid item xs={12} justifyContent={justifyContent} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {whatsapp && <WhatsAppChatButton number={whatsapp} variant='outlined' />}
                    </Grid>
                    <Grid item xs={12} justifyContent={justifyContent} sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1 }}>
                        {
                            other && other.map((contact, i) => {
                                switch (contact.type) {
                                    case 'telegram':
                                        return <TelegramButton sx={{ fontSize: '16px', textTransform: 'unset' }} size="small" login={contact.value} key={i} />
                                   default:
                                        return null
                                }
                            })
                        }
                    </Grid>
                </React.Fragment>
            }

        </Grid>
    )

    return micro ? renderMicro() : renderFull()

}