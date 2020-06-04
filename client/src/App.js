import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {

  const [data, setData] = useState([])

  const handleGetData = () => {
    axios.get('/api/getSampleJsonData')
      .then((res) => {
        setData(res)
        console.log(res)
      })
      .catch((error) => {
        setData(error)
        console.log(error)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          <h1>Sample API calls</h1>
          <button onClick={handleGetData}>Get Data</button>
          <div>
            {JSON.stringify(data)}  
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
