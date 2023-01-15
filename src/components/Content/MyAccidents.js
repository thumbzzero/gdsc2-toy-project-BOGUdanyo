import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useEffect } from 'react';
import { customAxios } from './../../hooks/customAxios';
import useDidMountEffect from './../../hooks/useDidMouontEffect';
import Map from './Map';

const MyAccidents = () => {
	const [lat, setLat] = useState(-3.745);
	const [lng, setLng] = useState(38.523);
	
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
		console.log(lat, ' ', lng);
		customAxios.get("myAccidents/", {
			params: {
				startLat: lat,
				startLon: lng
			}
		}).then((response) => {
			console.log(response.data);
		})
	}, [lat, lng]);

	return (
		<div className='container'>
			<Map lat={lat} lng={lng} />
		</div>
	);
};

export default MyAccidents;