import React from 'react';
import Menu from './Menu';

const Header = ({ selectedMenu, setSelectedMenu }) => {
	return (
		<div className='header'>
			<h1>BOGUdanyo</h1>
			<span>사고다발지역 알리미</span>
			<Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
		</div>
	);
};

export default Header;