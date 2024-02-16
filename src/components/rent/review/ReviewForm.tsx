import * as React from 'react';
import { AlertTitle, Alert, Snackbar, Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating } from '@mui/material';
import { reviewService } from '../../../lib/place/review.service'

import RateReviewIcon from '@mui/icons-material/RateReview';

export default function ReviewForm({ url, ...other }: { url: string }) {
    const [open, setOpen] = React.useState(false);
    const [advantages, setAdvantages] = React.useState('');
    const [disadvantages, setDisadvantages] = React.useState('');
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const [stack, toggleStack] = React.useState(false);
    const [errors, setErrors] = React.useState({ disadvantages: [], advantages: [], comment: [], rating: [] });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!rating) {
            setErrors({
                advantages: [],
                    disadvantages: [],
                    comment: [],
                    rating: ['Оставьте рейтинг']
            })
            return;
        }

        reviewService.palceReview(url, {
            rating,
            advantages,
            disadvantages,
            comment
        }).then(function (response: any) {
            toggleStack(true);
        }).catch(function (error: any) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({
                    advantages: [],
                    disadvantages: [],
                    comment: [],
                    rating: ['Произошла ошибка']
                })
            }
        });
    };

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        window.location.reload()
    };

    return (
        <Box component="form" onSubmit={handleSubmit} {...other}>
            <Button sx={{ width: '100%' }} variant="outlined" onClick={handleClickOpen} endIcon={<RateReviewIcon />}>
                Оставить отзыв
            </Button>
            {stack ? 
                <Dialog open={stack} onClose={handleCloseSnack}>
                    
                <DialogTitle>Отзыв успешно отправлен</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Благодарим вас за вашш отзыв!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='success' onClick={handleCloseSnack}>Закрыть</Button>
                </DialogActions>
            </Dialog>
                :
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Мы будем благодарны оставленному отзыву</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Поставьте рейтинг кликнув на звезды.
                        </DialogContentText>
                        <Rating sx={{ mt: 3, mb: 0 }} name="rating" precision={0.5} size="large"
                            value={rating}
                            onChange={e => setRating(+ e.target.value)} />
                        <Typography variant="body2" color='error'>{errors.rating ? errors.rating.join(" ; ") : ''}</Typography>
                        <TextField
                            name='advantages'
                            margin="dense"
                            maxRows={5}
                            label="Достоинства"
                            fullWidth
                            variant="standard"
                            multiline

                            value={advantages}
                            onChange={e => setAdvantages(e.target.value)}
                            error={errors.disadvantages.length > 0 ? true : false}

                            helperText={errors.advantages ? errors.advantages.join(" ; ") : ''}
                        />
                        <TextField
                            sx={{ mt: 2, }}
                            name='disadvantages'
                            maxRows={5}
                            label="Недостатки"
                            fullWidth
                            variant="standard"
                            multiline

                            value={disadvantages}
                            onChange={e => setDisadvantages(e.target.value)}
                            error={errors.disadvantages.length > 0 ? true : false}
                            helperText={errors.disadvantages ? errors.disadvantages.join(" ; ") : ''}
                        />
                        <TextField
                            sx={{ mt: 2, }}
                            name='comment'
                            margin="dense"
                            rows={4}
                            maxRows={5}
                            label="Комментарий"
                            fullWidth
                            variant="standard"
                            multiline

                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            error={errors.disadvantages.length > 0 ? true : false}

                            required
                            helperText={errors.comment ? errors.comment.join(" ; ") : ''}
                        />
                        <DialogContentText>
                            Если поставить только рейтинг без комментариев, то он не будет отображаться в отзывах!
                        </DialogContentText>
                    </DialogContent>


                    <DialogActions>
                        <Button color='error' onClick={handleClose}>Отмена</Button>
                        <Button type='submit' onClick={handleSubmit}>Отправить</Button>
                    </DialogActions>
                </Dialog>
            }

        </Box>
    )

}