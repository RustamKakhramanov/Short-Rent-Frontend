
import { Box, ImageList as List, Typography } from '@mui/material';
import React from 'react';

interface props extends React.Props{
    count: number
}

const style = {
    text: {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
        color: "#FFFFFF",
        
    },
    container: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'16px',
        cursor:'pointer',
        background:'rgb(0 0 0 / 55%)',
        '&:hover': {
            background:'#2f2e32'
        }
    }
}

export default function ImagePreview({ count,...other }: props) {
    return (
        <Box  sx={style.container} {...other}>
            <Typography sx={style.text}>
                + {count} фото

                </Typography >
        </Box>
    )
}