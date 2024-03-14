import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import style from './App.module.css';
import Logo from './assets/images/Barkwise_alliance_logo.jpg';
import Home from './pages/Home/Home.tsx'
import Breeds from './pages/Breeds/Breeds.tsx'
import Form from './pages/Form/Form.tsx';
import MatchCan from './pages/MatchCan/MatchCan.tsx';
import Events from './pages/Events/Events.tsx';
import Profile from './pages/Profile/Profile.tsx';
import DogDetail from './pages/DogDetail/DogDetail.tsx';
import NotFound from './components/containers/NotFound.jsx';

function App() {
  return (
    <div className={style.App}>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/breeds' element={<Breeds/>}>
          <Route path='/breeds/:id' element={<DogDetail/>}/>
          <Route path='/breeds/create' element={<Form/>}/>
        </Route>
        <Route path='/matcher' element={<MatchCan/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
