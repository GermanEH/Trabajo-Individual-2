import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import style from './App.module.css';
import Logo from './assets/perro-con-un-hueso-10959.gif'
import Home from './components/containers/Home.jsx'
import NavBar from './components/containers/NavBar.jsx'
import Form from './components/containers/Form.jsx'
import DogDetail from './components/renders/DogDetail.jsx'
import Adoption from './components/containers/Adoption.jsx'
import NotFound from './components/containers/NotFound.jsx'

function App() {
  return (
    <div className={style.App}>
        <Switch>
          <Route 
            exact path="/home">
              <Link to="/"><header className={style.App_header}></header></Link>
              <NavBar/>
              <Home />
          </Route>
          <Route 
            exact path="/dog/create">
              <Form />
          </Route>
          <Route 
            exact path="/dogs/:id"
            component={DogDetail}>
          </Route>
          <Route 
            exact path="/adoption">
              <Link to="/"><header className={style.App_header}></header></Link>
              <NavBar/>
              <Adoption />
          </Route>
          <Route 
          exact path="/">
            <div className={style.landing_page}>
              <Link to="/home" style={{ textDecoration: 'none' , color: 'black'}}>
                <div className={style.landing_title}>
                  <h1>¡Bienvenidos a la biblioteca canina!</h1>
                  <div className={style.landing_body}></div>
                  <img src={Logo} alt="loading..." widht="150" height="150"/>
                </div>
              </Link>
            </div>
          </Route>
          <Route
          path="*"
          component={NotFound}/>
        </Switch>
      </div>
  );
}

export default App;
