import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "70%",
  height: "500px",
  margin: "auto",
};

const saContainerStyle = {
  width: "100%",
  height: "500px",
};

const Map = ({ lat, lng, places, menu }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: lat,
        lng: lng,
      });
      map.fitBounds(bounds);
  
      setMap(map);
    },
    [lat, lng]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={menu === "sa" ? saContainerStyle : containerStyle}
      center={{
        lat: lat,
        lng: lng,
      }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {menu === "sa"
        ? places.length !== 0 &&
          places.map((place) => (
            <Marker
              key={place.id}
              position={{ lat: place.lat, lng: place.lon }}
            />
          ))
        : places.length !== 0 &&
          places.map((place) => (
            <Marker
              key={place.accidentId}
              position={{ lat: place.lat, lng: place.lon }}
            />
          ))}
    </GoogleMap>
  ) : (
    <span>지도 불러오기 실패</span>
  );
};

export default React.memo(Map);
