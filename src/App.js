import Map from './components/Content/Map';
import Header from './components/Header/Header';
import ContentContainer from './components/Content/ContentContainer';
import { useState } from 'react';
import './App.css';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('statisticArea');
  return (
    <div>
      <Header selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <ContentContainer selectedMenu={selectedMenu} />
    </div>
  );
}

export default App;
