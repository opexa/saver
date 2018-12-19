import React from 'react'
import Auth from '../account/Auth'
import ProgressIndexPage from '../progress/index/ProgressIndexPage'

class HomePage extends React.Component {
  render() {
    return Auth.isUserAuthenticated() ? (<ProgressIndexPage />) : (<UnauthenticatedView/>)
  }
}

const UnauthenticatedView = () => (
  <div className='home-content'>
    <div className='d-flex justify-content-between bd-highlight mb-3'>
      <div className='card text-white bg-warning mb-3' style={{ 'maxWidth': '20rem' }}>
        <div className='card-header'>Problem ?</div>
        <div className='card-body'>
          <h4 className='card-title'>You always running out of money</h4>
          <p className='card-text'>This is a common issue among the modern society. You are not the first and you won't be the last experiencing this problem.</p>
        </div>
      </div>

      <div className='card border-success mb-3' style={{ 'maxWidth': '20rem' }}>
        <div className='card-header'><b>Idea.</b></div>
        <div className='card-body'>
          <h4 className='card-title'>Danger card title</h4>
          <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>

      <div className='card text-white bg-info mb-3' style={{ 'maxWidth': '20rem' }}>
        <div className='card-header'>Solution!</div>
        <div className='card-body'>
          <h4 className='card-title'>Danger card title</h4>
          <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  </div>
)

export default HomePage
