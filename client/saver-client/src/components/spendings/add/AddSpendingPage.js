import React from 'react'
import FormHelpers from '../../common/forms/FormHelpers'
import AddSpendingForm from './AddSpendingForm'
import {SpendingsList} from '../common/SpendingsList'
import spendingsActions from '../../../actions/SpendingsActions'
import spendingsStore from '../../../stores/SpendingsStore'
import izitoast from 'izitoast'
import moment from 'moment'

class AddSpendingPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      spending: {
        amount: '',
        subject: '',
        date: moment().format('MM/DD/YYYY')
      },
      recentSpendings: []
    }

    this.handleSpendingAdded = this.handleSpendingAdded.bind(this)
    this.handleRecentSpendingsFetched = this.handleRecentSpendingsFetched.bind(this)

    spendingsStore.on(spendingsStore.eventTypes.SPENDING_ADDED, this.handleSpendingAdded)
    spendingsStore.on(spendingsStore.eventTypes.RECENT_SPENDINGS_FETCHED, this.handleRecentSpendingsFetched)
  }

  componentWillMount () {
    spendingsActions.getRecentSpendings();
  }

  componentWillUnmount () {
    spendingsStore.removeListener(spendingsStore.eventTypes.SPENDING_ADDED, this.handleSpendingAdded)    
    spendingsStore.removeListener(spendingsStore.eventTypes.RECENT_SPENDINGS_FETCHED, this.handleRecentSpendingsFetched)    
  }

  handleSpendingAdded (data) {
    if (!data.success) {
      izitoast.error({ message: data.message || 'An error occured.Please try again.' })
    } else {
      izitoast.success({ message: data.message })

      this.updateRecentSpendings()
    }
  }

  handleRecentSpendingsFetched (recentSpendings) {
    this.setState({ recentSpendings })
  }

  handleInputChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'spending')
  }

  handleDateChange (date) {
    let spending = {...this.state.spending}
    spending.date = moment(date).format('MM/DD/YYYY')

    this.setState({ spending })
  }

  handleFormSubmit (event) {
    event.preventDefault()
    let spending = this.state.spending

    if (spending.amount <= 0) 
      return izitoast.warning({ message: 'Pleas eneter value greater than 0.'})

    spendingsActions.addSpending(spending)
  }

  updateRecentSpendings () {
    let recentSpendings = this.state.recentSpendings
    recentSpendings.unshift(this.state.spending)
    recentSpendings = this.sortRecentSpendings(recentSpendings)

    this.setState({
      recentSpendings: recentSpendings,
      spending: {
        amount: '',
        subject: '',
        date: moment().format('MM/DD/YYYY')
      }
    })
  }

  sortRecentSpendings(spendings) {
    let recentSpendings = spendings

    recentSpendings.sort(function (a, b) {
      var keyA = new Date(a.date),
          keyB = new Date(b.date)

      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
      return 0
    })

    return recentSpendings
  }

  render() {
    return (
      <div>
        <div>
          <h1>Account your spending</h1>
          <br />
          <AddSpendingForm 
            spending={this.state.spending} 
            onUpdate={this.handleDateChange.bind(this)} 
            onChange={this.handleInputChange.bind(this)} 
            onSubmit={this.handleFormSubmit.bind(this)}
          />
        </div>

        <div style={{ marginTop: '50px' }}>
          <h2>Recent spendings</h2>
          <hr/>
          { this.state.recentSpendings.length === 0 ? 
            <h5>No recent spendings</h5> :
            <SpendingsList spendings={this.state.recentSpendings}/> }
        </div>
      </div>
    )
  }
}

export default AddSpendingPage
