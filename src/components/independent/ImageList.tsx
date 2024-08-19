import React, { useState, useEffect } from "react";
import { Box, ImageList as List, Typography } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { iImage } from '../../interfaces';
import { Stack } from '@mui/system';
import styles from '../../../styles/Place.module.css';
import ImageViewer from "react-simple-image-viewer";
import ImagePreview from "./ImagePreview";
import Image from 'next/image'


function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}


interface iImageList {
    images: [iImage],
    h: string,
    w: string,
}


export default function ImageList({ images, h = '300', w = '500', ...other }: iImageList) {
    let fulls = images.map(({ url }) => url)
    let previews = images.map(({ preview_url }) => preview_url)
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [showed, setShowed] = useState<(string | null)[]>([]);
    const limit = 5;

    const setAllPreviews = () => {
        setShowed(previews)
    };

    useEffect(() => {
        const initial = images.map(({ preview_url }) => preview_url)
        setShowed(
            initial.length > limit ? initial.slice(0, limit) : initial
        )
    }, [images])

    const closeImageViewer = () => {
        setIsViewerOpen(false);
    };

    const openViewer = (i: number) => {
        setIsViewerOpen(true)
        setActiveStep(i)
    }


    return (
        <React.Fragment>
            {isViewerOpen && (
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
            <List
                {...other}

                variant="quilted"
                cols={4}
                rowHeight={150}

                sx={{
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: 'translateZ(0)',
                    padding: '20px 0px',
                    overflow: 'initial'
                }}>

                {showed.map((url: string | null, index: number) => {
                    let cols = index == 0 ? 2 : 1;
                    let rows = index == 0 ? 2 : 1;

                    if (previews.length === showed.length) {
                        if (index == 0) {
                            cols = 4
                            rows = 4
                        } else {
                            cols = 2
                            rows = index % 2 == 0 ? 3 : 2
                        }

                    }

                    return (
                        <ImageListItem
                            key={index}
                            cols={cols}
                            rows={rows}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => previews.length > showed.length && index === limit - 1 ? null : openViewer(index)}
                        >
                            <Image
                                layout='fill'
                                className={styles.borderRadius}
                                {...srcset(url ? url : 'undefined', 100, 100, rows, cols)}
                                alt={'place_preview-' + index}
                                loading="lazy"
                                objectFit={'cover'}
                            />
                            {
                                previews.length > showed.length && index === limit - 1 && <ImagePreview count={images.length - index - 1} onClick={() => setAllPreviews()} />
                            }
                        </ImageListItem>

                    )
                })}



            </List>
        </React.Fragment>

    );
}


