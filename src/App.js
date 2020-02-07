import React, { useState } from 'react';
import logo from './logo.svg';
import './App.sass';
import { Container, Button } from '@material-ui/core'
import Game from './pages/game';
import Home from './pages/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  return (
    <Router>
      <Container fixed>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <Button variant="contained" color="primary" href="#contained-buttons">
                    Главная
                  </Button>
                </Link>
              </li>
              <li>
                <Button variant="contained" color="primary" href="#contained-buttons">
                  <Link to="/pages/game">Игра</Link>
                </Button>
              </li>
                { round ? 
              <li><h3>Score <span>{score}</span>  Round <span>{round}</span></h3>
              </li>
               : ''}
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/pages/game">
              <Game setScore={setScore} setRound={setRound} round={round} score={score}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Container>
    </Router>
  );
}

export default App;
