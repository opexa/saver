import React from 'react'
import { Link } from 'react-router-dom'
import LimitBars from './LimitBars'
import { SpendingsList } from './SpendingsList'

class ProgressContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      progress: props.ticket
    }
  }  

  render() {
    let progress = this.state.progress

    return (
      <div className='progress-container'>
        <div className='page-header d-flex justify-content-between'>
          <div>
            <h1>Month <small style={{ color: 'rgb(100, 100, 100)' }}> {progress.month} </small></h1>
          </div>
          <div>
            <Link className='btn btn-outline-danger btn-lg' to='/spendings/add'>I spent</Link>
            &nbsp;&nbsp;
            <Link className='btn btn-outline-success btn-lg' to='/incomes/add'>I gained</Link>
          </div>
        </div>
        <div className='current-balance'>
          <h5><b>Balance</b>: {progress.balance} $ </h5>
        </div>
        <hr /><br />
        <LimitBars progress={progress}/>
        <br />
        <div className='row'>
          <div className='col-lg-6'>
            <SpendingsList spendings={progress.recentSpendings} />
          </div>
          <div className='col-lg-6'>
            <h5>Incomes &nbsp;<i className='fas fa-sign-in-alt' style={{ color: '#93C54B' }}></i></h5>
          </div>
        </div>
      </div>
    )
  }
}

export default ProgressContainer
