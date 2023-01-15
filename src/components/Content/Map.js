import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import useGeolocation from "react-hook-geolocation";

const containerStyle = {
  width: '70%',
  height: '500px'
};

const Map = ({ lat, lng }) => {
	const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
			lat: lat,
			lng: lng
		});
    map.fitBounds(bounds);

    setMap(map)
  }, [lat, lng])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
					lat: lat,
					lng: lng
				}}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
  ) : <span>현재 위치 불러오기 실패</span>
  
};

export default Map;