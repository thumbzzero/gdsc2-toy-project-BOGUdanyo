import { GoogleMap } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { customAxios } from "./../../hooks/customAxios";
import Map from "./Map";

const containerStyle = {
  width: "70%",
  height: "500px",
};

const StatisticArea = () => {
  const [accidents, setAccidents] = useState([]);
  const [searched, setSearched] = useState(false);

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
        setAccidents(response.data);
        setSearched(true);
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
      <div className="map-container"></div>
      <div className="table-container">
        {searched ? (
          accidents.length === 0 ? (
            "검색 결과가 없습니다."
          ) : (
            <table>
              <tbody>
                <tr>
                  <th>순위</th>
                  <th>주소</th>
                </tr>
              </tbody>
              {accidents.map((accident, index) => {
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
  );
};

export default StatisticArea;
