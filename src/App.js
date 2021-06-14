import React from 'react'
import PVP from './components/PlayerVsPlayer/PVP'
import CVC from './components/ComputerVsComputer/CVC'
import PVC from './components/PlayerVsComputer/PVC'

function App() {
  return (
    <React.Fragment>
      <div className='container'>
        <PVC/>
      </div>
    </React.Fragment>
  );
}

export default App;
