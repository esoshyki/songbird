import React, { useState } from 'react';
import logo from './logo.svg';
import './App.sass';
import { Container, Button } from '@material-ui/core'
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
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  header: {
    backgroundImage: 'url(https://thatshelf.com/wp-content/uploads/2015/09/Dota-2-1900x560.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingLeft: '30px'
  },
  headerIcon: {
    height: '64px',
    width: '64px',
    backgroundImage: 'url(https://in-gamestore.com/uploads/games/dota-icon.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 0
  }
}))

function App() {

  const classes = useStyles({})

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gamer, setGamer] = useState();
 
  return (
    <Router>
      <Container fixed>
        <header className={classes.header}>
          <Link to="/">
            <div className={classes.headerIcon} />
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
    </Router>
  );
}

export default App;
