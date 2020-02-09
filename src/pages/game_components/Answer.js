import React, {useState} from 'react';
import './AudioPlayer.sass';

export default function  Answer(props) {
  const [answer, setAnswer ] = useState(props.answer);
  
  const handleChange = () => {
    setAnswer(props.answer)
  }

  return (<div>
    <h3 onChange={handleChange}>{props.answer}</h3>
  </div>)
}
