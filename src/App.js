import './css/App.css';
import React, {useState} from 'react';
import { Typography } from '@material-ui/core';

import Initial from './components/Initial'
import Game from './components/Game'

function App() {
  const [component, setComponent] = useState(0)
  return (
    <div className="App">
      <Typography style={{padding: 16}} variant="h1">
        Da Movie Quizz
      </Typography>
      {component === 0 ? <Initial stateChanger={setComponent}/> : <Game/>}
    </div>
  );
}

export default App;
