import React, { useRef, useState } from "react";
import { customAxios } from "./../../hooks/customAxios";
import Map from "./Map";

const StatisticArea = () => {
  const [searched, setSearched] = useState(0);

  const [lat, setLat] = useState(-3.745);
	const [lng, setLng] = useState(38.523);
	const [places, setPlaces] = useState([]);

  const regionRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const region = regionRef.current.value
      .replace(/^ +/, "")
      .replace(/ +$/, "")
      .replace(/ /g, "_");

    customAxios
      .get("statisticArea/", {
        params: {
          region: region,
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
      });
  };

  return (
    <div className="container">
      <form className="st-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="지역을 입력하세요. (예 : 서울특별시 강남구)"
          ref={regionRef}
        />
        <button className="st-search">검색</button>
      </form>
      <div className="result-container">
      <div className="map-container">
        {searched === 1 ? (
          <Map lat={lat} lng={lng} places={places} menu={"sa"} />
        ) : null}
      </div>
      <div className="table-container">
        {searched !== 0 ? (
          places.length === 0 ? (
            "검색 결과가 없습니다."
          ) : (
            <table className="table">
              <tbody style={{backgroundColor: '#d3d3d350'}}>
                <tr>
                  <th>순위</th>
                  <th>주소</th>
                </tr>
              </tbody>
              {places.map((accident, index) => {
                return (
                  <tbody key={accident.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{accident.address}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          )
        ) : null}
        {}
      </div>
    </div>
    </div>
  );
};

export default StatisticArea;
