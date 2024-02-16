import React, { ReactNode, useState } from 'react';
import { Accordion, AccordionDetails, CardMedia, AccordionSummary, Paper, Button, createTheme, Divider, Grid, ThemeProvider, Typography, SxProps, Theme } from "@mui/material";
import { iImage } from '../../interfaces/index';
import Carousel from 'react-material-ui-carousel'
import ImageViewer from "react-simple-image-viewer";
import styles from '../../../styles/Slider.module.css';
import Image from 'next/image'

interface SliderProps {
    images?: iImage[],
    withFull?: boolean,
    autoPlay?: boolean,
    imageParams?: {
        height?: string | number,
        width?: string | number,
    },
    children?: ReactNode;
    bottomComponent?: ReactNode;
    bottomFirst?: boolean,
    sx?: SxProps<Theme>;
    className?: string;
    navButtonsAlwaysInvisible?: boolean;
    cycleNavigation?: boolean;
    animation?: 'fade' | 'slide'
    onChange?: (now?: number, previous?: number) => any;
    next?: (now?: number, previous?: number) => any;
    prev?: (now?: number, previous?: number) => any;
}

export default function ImagesSlider(props: SliderProps) {
    const { images, children, animation, onChange, sx, withFull, bottomFirst, bottomComponent, autoPlay, ...others } = props
    let fulls = images ? images.map(({ url }) => url) : []
    let previews = images ? images.map(({ preview_url }) => preview_url) : []
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const defaultChange = (now?: number, previous?: number) => {
        setActiveStep(now ? now : 0)
    }

    const closeImageViewer = () => {
        setIsViewerOpen(false);
    };

    const openViewer = () => {
        setIsViewerOpen(true)
    }
    const renderBottom = (index:number|null) => {
        if (bottomFirst && index === 0) {
            return (
                <div className={styles.sliderBottomFull} >
                    <div className={styles.sliderBottomContainer}>
                        {bottomComponent}
                    </div>
                </div>
            )
        } else if (!bottomFirst) {
            return (
                <div className={styles.sliderBottom} >
                    <div className={styles.sliderBottomContainer}>
                        {bottomComponent}
                    </div>
                </div>
            )
        }

    }

    return (
        <div>
            {isViewerOpen && withFull && (
                <ImageViewer
                    src={fulls}
                    currentIndex={activeStep}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            )}
            <Carousel
                animation={animation ? animation : 'slide'}
                autoPlay={autoPlay ? autoPlay : false}
                swipe={true}
                indicators={true}
                navButtonsAlwaysVisible={true}
                stopAutoPlayOnHover={true}
                sx={sx ? sx : { minHeight: 200, height: '100%', width: '100%', borderRadius: '16px' }}
                onChange={onChange ? onChange : defaultChange}
                indicatorContainerProps={{
                    style: {
                        position: 'absolute', // 5
                        bottom: 10, // 5
                        zIndex: 1, // 5
                        // textAlign: 'right' // 4
                    }

                }}
                {...others}
            >
                {images ?
                    previews.map((preview: string | null, index: number) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    'borderRadius': '16px',
                                    'display': '100%',
                                    width: props.imageParams?.width ? props.imageParams.width : '100%',
                                    height: props.imageParams?.height ? props.imageParams.height : '100%',
                                    'overflow': 'hidden',
                                    cursor: 'pointer'
                                }}
                                onClick={withFull ? () => openViewer() : () => { }}
                            >
                                <Image
                                    layout='fill'
                                    draggable="false"
                                    style={{
                                        
                                        objectPosition: 'center',
                                        width: props.imageParams?.width ? props.imageParams.width : '100%',
                                        height: props.imageParams?.height ? props.imageParams.height : '100%'
                                    }}
                                    src={preview + '?w=161&fit=crop&auto=format'}
                                    alt={'place_preview-' + index}
                                    loading="lazy"
                                    objectFit={'cover'}
                                />
                                {
                                    bottomComponent && renderBottom(index)

                                }
                            </div>
                        )
                    })
                    :
                    children
                }
            </Carousel>
        </div>

    )
}