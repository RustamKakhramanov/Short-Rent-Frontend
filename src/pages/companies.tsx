import { Box} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useEffect, useState } from "react";
import { ThreeDots } from "react-loading-icons";
import { fetcher } from "../helpers/fetcher";
import { iCompany } from "../interfaces";
import { AppContext } from '../providers/AppProvider';
import { Abort } from '../lib/pages/route.service';
import Image from "next/image";

export default function Companies() {
    const [companies, setCompany] = useState<Array<iCompany>>([]);
    
    
    useEffect(() => {
        if (!companies.length) {
          fetcher.get('/companies').then(res => {
            const companies: Array<iCompany> = res.data;
            setCompany(companies)
          }).catch(e => <Abort code={e.response.status}/>);
        }
      }, [companies]);

      
    function render() {
        if (companies.length) 
            return parseCompanies(companies)
          else
            return <ThreeDots mt={4} stroke="#1976d2" strokeOpacity={.5} />
        
      }

    function parseCompanies(companies: Array<iCompany>) {
        return (<Box>
            <List>
            {companies.map
             ((item, 
              key
            ) => (
                
                <ListItemButton href={`/companies/${item.slug}`} key={key}>
                    
                    <ListItemIcon>
                        <Image
                        src={`${item.logo.url}`}
                        alt="image"
                        loading="lazy"
                        width={30}
                        height={30}
                        />
                    
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
                </ListItemButton>))}
            </List>
        </Box>)
    }
    return (
        <Grid
      container
      direction="row"
      alignItems="center"
      flexDirection="column"
      justifyContent='space-around'
      minHeight='40vh'
      width='100%'
      mt={5}
    >
      <Typography variant="h1" component="h2">
        Companies
      </Typography>

      <Grid container mb={2}  alignItems="center" direction="row" justifyContent="center">
        {render()}
      </Grid>
    </Grid>
    );
}