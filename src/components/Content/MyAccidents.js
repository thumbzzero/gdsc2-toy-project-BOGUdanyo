import React, { useState } from 'react';
import { customAxios } from './../../hooks/customAxios';
import useDidMountEffect from './../../hooks/useDidMouontEffect';
import Map from './Map';

const MyAccidents = () => {
	const [lat, setLat] = useState(-3.745);
	const [lng, setLng] = useState(38.523);
	const [places, setPlaces] = useState([]);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			setLat(position.coords.latitude);
			setLng(position.coords.longitude);
		}, function(error) {
			console.error(error);
		}, {
			enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity
		});
	} else {
		alert('GPS를 지원하지 않습니다.');
	}

	useDidMountEffect(() => {
		customAxios.get("myAccidents/", {
			params: {
				startLat: lat,
				startLon: lng
			}
		}).then((response) => {
			setPlaces(response.data);
		})
	}, [lat, lng]);

	return (
		<div className='container'>
			<Map lat={lat} lng={lng} places={places} menu={"ma"} />
		</div>
	);
};

export default MyAccidents;