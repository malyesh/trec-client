/*global google*/
import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import LocationPin from '../LocationPin/LocationPin';
import './Map.scss';

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const markers = [
    { lat: 18.5204, lng: 73.8567 },
    { lat: 18.5314, lng: 73.8446 },
    { lat: 18.5642, lng: 73.7769 },
  ];

  const onLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  return (
    <div className='map'>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName='map-container' onLoad={onLoad}>
          {markers.map(({ lat, lng }) => (
            <Marker position={{ lat, lng }} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}
