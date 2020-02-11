import React, { useState } from 'react';
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


  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gamer, setGamer] = useState();
  
  const handleClick = () => {
    setScore(0);
    setRound(0);
    setGamer(undefined)
  }

  return (
    <Router>
      <div className='container'>
      <Container fixed>
        <header className='header'>
          <Link to="/" onClick={handleClick}>
            <div className='header-icon' />
          </Link>
        </header>
        <main 
          style={{backgroundImage: `url(${Background}`}}>
          <Switch>
            <Route path="/pages/game">
              <Game setScore={setScore} setRound={setRound} round={round} score={score} gamer={gamer}/>
            </Route>
            <Route path="/pages/finishGame">
              <FinishGame gamer={gamer} score={score} setRound={setRound} setScore={setScore} />
            </Route>
            <Route path="/">
              <Home setGamer={setGamer}/>
            </Route>
          </Switch>
        </main>
      </Container>
      </div>
    </Router>
  );
}

export default App;
