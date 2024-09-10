import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { iPlace } from '../../interfaces';

const AnyReactComponent = () => <LocationOnIcon></LocationOnIcon>;


const api = process.env.NEXT_PUBLIC_MAPS_KEY

interface props {
  coordinates: {
    latitude: string,
    longitude: string,
  }
}

const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer' }}
      title={name}
    />
  );
};

export default function SimpleMap({ coordinates }: props) {
  // let keyValuePairs = coordinates.slice(1, -1) //remove first and last character
  // .split(/\s*,\s*/)                     //split with optional spaces around the comma
  // .map(chunk => chunk.split(":"));      //split key=value
  const defaultProps = {
    center: {
      lat: Number(coordinates.latitude),
      lng: Number(coordinates.longitude),
    },
    zoom: 11
  };
  console.log(defaultProps)
  return (
    <div style={{ height: '40vh', width: '100%', borderRadius: '16px', marginTop: '10px' }}>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBLgHfyZyApYBKP1JSENuCfiS_Sg-BP7j0' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        }}
      >

        <Marker
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          name="My Marker"
          color="blue"
        />
      </GoogleMapReact> */}
    </div>
  );
}
