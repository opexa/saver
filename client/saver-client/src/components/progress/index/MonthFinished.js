import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import progressActions from '../../../actions/ProgressActions'
import progressStore from '../../../stores/ProgressStore'
import { ShortSpendingsList } from '../../spendings/common/SpendingsList'
import { ShortIncomesList } from '../../incomes/common/IncomesList'
import iziToast from '../../../../node_modules/izitoast';

class MonthFinished extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      monthTicket: props.ticket,
      barProps: {
        percents: 0,
        background: ''
      }
    }
    
    this.handleMonthArchived = this.handleMonthArchived.bind(this)

    progressStore.on(progressStore.eventTypes.MONTH_FINISHED, this.handleMonthArchived)
  }

  componentWillUnmount () {
    progressStore.removeListener(progressStore.eventTypes.MONTH_FINISHED, this.handleMonthArchived)
  }

  componentDidMount () {    
    let barProps = this.getBarProperties()

    setTimeout(() => {
      this.setState({ barProps })
    }, 300);
  }

  getBarProperties() {
    let spendings = this.state.monthTicket.monthSpendingsTotal, 
        limit = this.state.monthTicket.monthLimit,
        percents = Math.round((spendings / limit * 100) * 100) / 100,
        background = ''

    if (percents >= 0 && percents <= 25)
      background = 'success'
    else if (percents > 25 && percents <= 50)
      background = ''
    else if (percents > 50 && percents <= 75)
      background = 'warning'
    else if (percents > 75)
      background = 'danger'

    return {
      percents: String(percents),
      background: background
    }
  }

  handleMonthArchived (data) {
    if (data.success) {
      iziToast.success({ message: data.message })
      window.location.reload()
    } else {
      iziToast.error({ message: data.message })
    }
  }

  handleMonthArchivation (event) {
    event.preventDefault()

    let confirm = window.confirm('Procceed to accounting new month ?')

    if (confirm)
      progressActions.finishMonth()
  }

  render() {
    let progress = this.state.monthTicket
    let barProps = this.state.barProps

    return (
      <div>
        <NewMonthMessage />
        <div className='progress-container'>
          <div className='page-header d-flex justify-content-between'>
            <div>
              <h1>Month <small style={{ color: 'rgb(100, 100, 100)' }}> {progress.month} </small></h1>
            </div>
            <div>
              <button className='btn btn-outline-primary btn-lg' onClick={this.handleMonthArchivation.bind(this)}>ARCHIVE</button>
              &nbsp;&nbsp;
              <Link className='btn btn-outline-danger btn-lg' to='/spendings/add'>I spent</Link>
              &nbsp;&nbsp;
              <Link className='btn btn-outline-success btn-lg' to='/incomes/add'>I gained</Link>
            </div>
          </div>
          <div className='current-balance'>
            <h5><b>Left amount</b>: {progress.leftAmount} $ </h5>
          </div>
          <hr /><br />

          <div className='limits'>
            <div className='row'>
              <div className='col-lg-3'>
                <p className='float-left'>You spent</p>
                <p className='float-right'><b>{progress.monthSpendingsTotal} $</b> <small>from</small> {progress.monthLimit} $</p>
              </div>
              <div className='col-lg-9'>
                <div className='progress'>
                  <div className={`progress-bar bg-${barProps.background}`} role='progressbar' style={{ width: `${barProps.percents}%` }} aria-valuenow={barProps.percents} aria-valuemin='0' aria-valuemax='100'>{barProps.percents}%</div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className='row'>
            <div className='col-lg-6'>
              <h5>
                <OverlayTrigger placement='bottom' overlay={spendingsPopover(progress.month, progress.recentSpendings)}>
                  <Link to='/' id='spendings-list' style={{ color: "rgb(36, 36, 36)" }}>
                    Check Your <b>Spendings</b> &nbsp;<i className='fas fa-sign-out-alt' style={{ color: '#d9534f' }}></i>
                  </Link>
                </OverlayTrigger>
              </h5>
            </div>
            <div className='col-lg-6'>
              <h5>
                <OverlayTrigger placement='bottom' overlay={incomesPopover(progress.month, progress.recentIncomes)}>
                  <Link to='/' style={{ color: "rgb(36, 36, 36)" }}>
                    See Your <b>Incomes</b> &nbsp;<i className='fas fa-sign-in-alt' style={{ color: '#93C54B' }}></i>
                  </Link>
                </OverlayTrigger>
              </h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const NewMonthMessage = () => {
  let now = new Date(),
    nextMonth = ''

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  nextMonth = monthNames[now.getMonth()]

  return (<div className='text-center' style={{ marginBottom: '50px' }}>
    <h1>{nextMonth} has started!</h1>
    <h4 style={{ color: "rgb(100, 100, 100)" }}>Finish the work on your previous month, Archive it and Start the new month!</h4>
  </div>
  )
}

const incomesPopover = (monthName, incomes) => (
  <Popover id='popover-positioned-top' title={`Recent incomes for ${monthName}`}>
    <ShortIncomesList incomes={incomes} />
  </Popover>
)

const spendingsPopover = (monthName, spendings) => (
  <Popover id='popover-positioned-top' title={`Recent spendings for ${monthName}`}>
    <ShortSpendingsList spendings={spendings} />
  </Popover>
)

export default MonthFinished
