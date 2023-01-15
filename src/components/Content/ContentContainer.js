import React from 'react';
import MyAccidents from './MyAccidents';
import StatisticArea from './StatisticArea';
import RouteAccidents from './RouteAccidents';

const ContentContainer = ({ selectedMenu }) => {
	return (
		<div>
			{selectedMenu === 'myAccidents' ? <MyAccidents /> : 
			selectedMenu === 'statisticArea' ? <StatisticArea /> :
			<RouteAccidents />}
		</div>
	);
};

export default ContentContainer;