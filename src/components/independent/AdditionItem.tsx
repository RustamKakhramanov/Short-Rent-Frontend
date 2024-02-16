import { createTheme, Divider, IconButton, TextField, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TextInput } from 'react-admin';
import styles from '../../../styles/Place.module.css';
import Image from 'next/image'

export default function AdditionItem() {
    const [counter, setCounter] = React.useState(0);
 
  //increase counter
  const increase = () => {
    setCounter(count => count + 1);
  };
 
  //decrease counter
  const decrease = () => {
    setCounter(count => count - 1);
  };
 
  //reset counter 
  
    
    return  <React.Fragment ><div style={{display:'flex', flexDirection:'column', margin: '10px 10px'}}> <Box sx={{display:'flex'}}>
        
            <Image layout='fill' src='./images/addition.png' alt={'addition'} style={{maxWidth:'65px',maxHeight:'70px', border:'1px solid gray', borderRadius: 16, marginRight: 10}} />
            
            <div style={{width:'70%',}}>
                <div className={styles.chip}>4 шт.</div>
                <Typography  gutterBottom>
                Godox Mini Pioneer H120-B Kit
                </Typography>
               <div style={{display:'flex', flexDirection:'row', 
             
              }}>
                <IconButton className={styles.counter} onClick={decrease}>-</IconButton>
                
                <div className={styles.counter} style={{padding:'5px 20px '}}>{counter}</div>
                <IconButton className={styles.counter} onClick={increase}>+</IconButton>
                </div>
            </div>
            
            
            <div  style={{width:'40%', textAlign:'start', display:'flex', flexDirection:'row', marginTop:'20%'}}>
                    <Typography variant='h5' className={styles.priceText}  gutterBottom>
                      $ 20 
                    </Typography>
                    <Typography variant='body1' className={styles.priceTextLow} gutterBottom>
                      /Час
                    </Typography>  
            </div>  
                
           
            
        
    </Box>
    <Typography variant='body2' className={styles.subtitlePrice} sx={{marginLeft:'auto'}} gutterBottom>
    Убрать из списка
                    </Typography>  

                    <Divider sx={{color:'black'}}></Divider>
    </div></React.Fragment>
}