import React, { useRef, useState } from "react";
import { customAxios } from './../../hooks/customAxios';
import Map from "./Map";

const RouteAccidents = () => {
  const [searched, setSearched] = useState(0);

  const [lat, setLat] = useState(-3.745);
	const [lng, setLng] = useState(38.523);
	const [places, setPlaces] = useState([]);

  const startRef = useRef();
  const goalRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const start = startRef.current.value;
    const goal = goalRef.current.value;

    customAxios
      .get("route/", {
        params: {
          start: start,
          goal: goal,
        },
      })
      .then((response) => {
  
        setPlaces(response.data);
        if (response.data.length === 0) {
          setSearched(2);
        } else {
          setLat(response.data[0].lat);
          setLng(response.data[0].lon);
          setSearched(1);
        }
      })
  };
  return (
    <div className="container">
      <form className="ra-form" onSubmit={onSubmit}>
        <input
          className="ra-start-input"
          type="text"
          placeholder="출발지를 입력하세요."
          ref={startRef}
        />
        <button className="ra-search">검색</button>
        <input type="text" placeholder="도착지를 입력하세요." ref={goalRef} />
      </form>
      <div className="r-map-container">
        {searched === 1 ? (
          <Map lat={lat} lng={lng} places={places} menu={"r"} />
        ) : null}
      </div>
    </div>
  );
};

export default RouteAccidents;
