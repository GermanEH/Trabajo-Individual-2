import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import style from './App.module.css';
import Home from './pages/Home'
import Breeds from './pages/DoggyPedia'
import Form from './pages/Form/Form';
import MatchCan from './pages/MatchCan/MatchCan';
import Events from './pages/Events/Events';
import Profile from './pages/Profile/Profile';
import DogDetail from './pages/DogDetail/DogDetail';
import NotFound from './components/containers/NotFound.jsx';
import NavBar from './modules/core/components/NavBar.jsx'

const App:React.FC = () => {
  return (
    <div className={style.App}>
        <NavBar/>
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
