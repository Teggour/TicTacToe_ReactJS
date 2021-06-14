import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import PVP from './components/PlayerVsPlayer/PVP'
import CVC from './components/ComputerVsComputer/CVC'
import PVC from './components/PlayerVsComputer/PVC'
import Other from './components/Other/Other'


function App() {
  return (
    <Router>
      <div className='container'>
        <div className='buttons'>
          <Link to='/PVP'><button className='button'>Player Vs Player</button></Link>
          <Link to='/PVC'><button className='button'>Player Vs Computer</button></Link>
          <Link to='/CVC'><button className='button'>Computer Vs Computer</button></Link>
        </div>
        <Switch>
          <Route exact path='/'></Route>
          <Route exact path='/PVP'><PVP/></Route>
          <Route exact path='/PVC'><PVC/></Route>
          <Route exact path='/CVC'><CVC/></Route>
          <Route><Other/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
