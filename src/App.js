import React from 'react';
import { Container } from '@material-ui/core'
import Game from './pages/game';
import Home from './pages/home';
import FinishGame from './pages/finishGame';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Background from './images/bg.jpg'
import './styles/style.sass'




function App() {

  return (
      <Router>
        <div className='container'>
        <Container fixed>
          <header className='header'>
            <Link to="/" >
              <div className='header-icon' />
            </Link>
          </header>
          <main 
            style={{backgroundImage: `url(${Background}`}}>
            <Switch>
              <Route path="/pages/game">
                <Game />
              </Route>
              <Route path="/pages/finishGame">
                <FinishGame />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </Container>
        </div>
      </Router>
  );
}

export default App;
