import React from 'react';
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
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/pages/game">
              <Game />
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
