import Typography from '@mui/material/Typography';
import React from 'react';
import ThemedPaper from '../independent/ThemedPaper';

export default function CancelRules() {
    return (
        <React.Fragment>
            <Typography variant='body2' gutterBottom>
                Правила отмены
            </Typography>
            <ThemedPaper sx={{ width: '100%', borderRadius: '16px', height: '55px', textAlign: 'center' }}>
                Нажмите для просмотра
            </ThemedPaper>
        </React.Fragment>
    )
}