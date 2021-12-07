import React from 'react';
import './App.css';

import Graph from './Components/Graphs'
import Cardsbar from './Components/Cardsbar'


function App() {
  
  return (
    <div className="text">
      <h1>Covid 19 summary Sweden</h1>
      <div>
        <Cardsbar />
      </div>
      <Graph /> 
      <p> API used: </p>
        <a href="https://github.com/CSSEGISandData/COVID-19">    
          <button className="button">from GitHub Repository</button>
        </a>
    </div>
  );
}

export default App;
