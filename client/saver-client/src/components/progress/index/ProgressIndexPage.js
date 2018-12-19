import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../account/Auth'
import ProgressContainer from './ProgressContainer'
import MonthFinished from './MonthFinished'
import progressActions from '../../../actions/ProgressActions'
import progressStore from '../../../stores/ProgressStore'

class ProgressIndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasStrategy: JSON.parse(Auth.getUser().hasStrategy),
      monthTicket: null,
      startNewMonth: false
    }

    this.handleMonthLoaded = this.handleMonthLoaded.bind(this)

    progressStore.on(
      progressStore.eventTypes.MONTH_PROGRESS_FETCHED,
      this.handleMonthLoaded
    )
  }

  componentWillMount() {
    progressActions.getMonthTicket()
  }

  componentWillUnmount() {
    progressStore.removeListener(
      progressStore.eventTypes.MONTH_PROGRESS_FETCHED,
      this.handleMonthLoaded
    )
  }

  handleMonthLoaded(data) {
    if (data.success) {
      return this.setState({
        monthTicket: data.monthProgress,
        startNewMonth: data.startNewMonth ? data.startNewMonth : false
      })
    } else {
      return this.setState({
        monthTicket: 'create'
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.hasStrategy ? (
          <CreateStrategyRedirect />
        ) : this.state.monthTicket === 'create' ? (
          <BeginAccounting />
        ) : this.state.monthTicket !== null && this.state.startNewMonth === false ? ( // If we have old month and new month HASN'T started
          <ProgressContainer ticket={this.state.monthTicket} />
        ) : this.state.monthTicket !== null && this.state.startNewMonth === true ? ( // If we have old month and new month HAS started
          <MonthFinished ticket={this.state.monthTicket} />
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

const BeginAccounting = () => (
  <div className='text-center' style={{ marginTop: '100px' }}>
    <h1>You haven't started accounting yet</h1>
    <Link to='/progress/start' className='btn btn-info btn-lg' style={{ borderRadius: '19px' }}>
      <i className='fas fa-plus'></i>&nbsp; Begin accounting
    </Link>
  </div>
)

const CreateStrategyRedirect = () => (
  <div className='jumbotron jumbotron-fluid text-center'>
    <div className='container'>
      <h1 className='display-4'>Before you start</h1>
      <p className='lead'>Accounting your finances will require setting up a strategy first.</p>
      <br />
      <p>
        <Link to='/strategy/create' className='btn btn-success btn-lg' style={{ borderRadius: '18px', padding: '0.5rem 1.5rem' }}>
          <i className='fas fa-plus'></i>&nbsp; Create
        </Link>
      </p>
    </div>
  </div>
)

const Loading = () => (
  <div className='text-center'>
    <br />
    <i className='fas fa-spinner fa-spin' style={{ fontSize: '40px' }}></i>
  </div>
)

export default ProgressIndexPage
