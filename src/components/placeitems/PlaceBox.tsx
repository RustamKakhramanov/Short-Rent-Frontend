
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import styles from '../../../styles/Place.module.css';
import Stack from '@mui/material/Stack';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Icon from '@mui/material/Icon';
import PetsIcon from '@mui/icons-material/Pets';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import Item from '../independent/ThemedPaper';
import { GridView } from '@mui/icons-material';
import { Button, Grid, ListItem, ListItemAvatar, ListItemText, SvgIconTypeMap } from '@mui/material';
import SimpleMap from '../independent/Map';
import { iAbility, iPlace } from '../../interfaces';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useMediaQuery } from 'react-responsive';
import Abilities from './content/Abilities'
import Reviews from './content/Reviews';



interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  let boxSx =
    useMediaQuery({ query: '(max-width: 900px)' }) ?
      {
        pt: 4
      }
      :
      {
        p: 3
      }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={boxSx}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

interface item {
  place: iPlace; // make this optional since the data from PeopleState is optional
}

export default function PlaceBox({ place }: item) {
  const { coordinates, description, } = place;

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',

    },

    [theme.breakpoints.up('xs')]: {
      margin: '25px 0 0',
    },
    '& .MuiTabs-indicatorSpan': {

      width: '100%',
      backgroundColor: 'black',

    },
  });

  return (
    <Box sx={{ bgcolor: 'background.transparent', }} >

      <StyledTabs
        value={value}
        onChange={handleChange}
        //indicatorColor="secondary"
        textColor="inherit"
        aria-label="full width tabs example"
      >
        <Tab label="Описание" />
        <Tab label="Отзывы" />
        {/* <Tab label="Карта" /> */}
      </StyledTabs>


      <TabPanel value={value} index={0} dir={theme.direction} >

        <Typography className={styles.subtitle}>Общее описание</Typography>
        <Typography variant='body1'>{description}</Typography>

        <Abilities abilities={place.abilities as iAbility[]} />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <Reviews place={place} />
      </TabPanel>

      {
        <TabPanel value={value} index={2} dir={theme.direction}>

          {!isTabletOrMobile && <Typography className={styles.subtitle}>Карта</Typography>}

          <SimpleMap coordinates={coordinates}></SimpleMap>
        </TabPanel>
      }
    </Box>
  );
}


