import React from 'react'
import PVP from './components/PlayerVsPlayer/PVP'
import PVC from './components/PlayerVsComputer/PVC'
import CVC from './components/ComputerVsComputer/CVC'

function App() {
  return (
    <React.Fragment>
      <div className='container'>
        <CVC/>
      </div>
    </React.Fragment>
  );
}

export default App;
