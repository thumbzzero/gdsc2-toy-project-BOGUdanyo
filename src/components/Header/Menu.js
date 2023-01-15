import React from 'react';

const Menu = ({ selectedMenu, setSelectedMenu }) => {

	const onStatisticArea = () => {
		setSelectedMenu('statisticArea');
	}

	const onMyAccidents = () => {
		setSelectedMenu('myAccidents');
	}

	const onRoute = () => {
		setSelectedMenu('route');
	}

	return (
		<div className='menu-container'>
			<span onClick={onStatisticArea} className={selectedMenu === 'statisticArea' ? 'selected menu' : 'menu'}>지역으로 검색</span>
			<span onClick={onMyAccidents} className={selectedMenu === 'myAccidents' ? 'selected menu' : 'menu'}>내 위치로 검색</span>
			<span onClick={onRoute} className={selectedMenu === 'route' ? 'selected menu' : 'menu'}>경로로 검색</span>
		</div>
	);
};

export default Menu;