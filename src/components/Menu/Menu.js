import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import PVP from '../PlayerVsPlayer/PVP'
import CVC from '../ComputerVsComputer/CVC'
import PVC from '../PlayerVsComputer/PVC'
import Other from '../Other/Other'


function Menu() {
  return (
    <Router>
      <div className='container'>
        <div className='buttons'>
          <button className='button'><Link to='/PVP'>Player Vs Player</Link></button>
          <button className='button'><Link to='/PVC'>Player Vs Computer</Link></button>
          <button className='button'><Link to='/CVC'>Computer Vs Computer</Link></button>
        </div>
      </div>

      <Switch>
        <Route exact path='/PVP'><PVP/></Route>
        <Route exact path='/PVC'><PVC/></Route>
        <Route exact path='/CVC'><CVC/></Route>
        <Route component={Other}></Route>
      </Switch>
    </Router>
  );
}

export default Menu;
