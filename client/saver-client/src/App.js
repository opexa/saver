import React, { Component } from 'react'
import './App.css'

import Routes from './components/common/routes/Routes'
import Navbar from './components/common/Navbar'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Routes />
        </div>
      </div>
    )
  }
}

export default App
