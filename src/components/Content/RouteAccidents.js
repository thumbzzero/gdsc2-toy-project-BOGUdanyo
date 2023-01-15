import React from "react";

const RouteAccidents = () => {
  return (
    <div>
      <form className="ra-form">
        <input className="ra-start-input" type="text" placeholder="출발지를 입력하세요." />
        <button className="ra-search">검색</button>
				<input type="text" placeholder="도착지를 입력하세요." />
      </form>
    </div>
  );
};

export default RouteAccidents;
