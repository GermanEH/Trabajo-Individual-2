import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import './App.css';
import Logo from './assets/perro-con-un-hueso-10959.gif'
import Home from './components/containers/Home.jsx'
import NavBar from './components/containers/NavBar.jsx'
import Form from './components/containers/Form.jsx'
import DogDetail from './components/renders/DogDetail.jsx'
import DogKennel from './components/containers/DogKennel.jsx'
import NotFound from './components/containers/NotFound.jsx'

function App() {
  return (
    <div className="App">
      <Link to="/"><div className="banner_to_home"></div></Link>
        <header className="App-header">
        </header>
      <div className="body">
        <Switch>
          <Route 
            exact path="/home">
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
            exact path="/dogKennel">
              <NavBar/>
              <DogKennel />
          </Route>
          <Route 
          exact path="/">
            <Link to="/home" style={{ textDecoration: 'none' , color: 'black'}}>
              <div className="landing">
                <h1>Bienvenido</h1>
                <img src={Logo} alt="loading..." widht="150" height="150"/>
              </div>
            </Link>
          </Route>
          <Route
          path="*"
          component={NotFound}/>
        </Switch>
        
      </div>
    </div>
  );
}

export default App;
