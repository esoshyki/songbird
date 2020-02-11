import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const answers = {
	right: 'ВЕРНО!',
	fail: 'НЕВЕРНО!'
}

const useStyles = makeStyles({
  root: {
    fontSize: '1.5rem',
    lineHeight: '0'
  },
  right: {
    color: 'green'
  },
  fail: {
    color: 'red'
  }
})

export default function  Answer(props) {
  const classes = useStyles({})

  return (<div className={classes.root}>
    <h3 className={props.answer === answers.right ? classes.right : classes.fail}>{props.answer}</h3>
  </div>)
}
