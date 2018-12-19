import React from 'react'
import FormHelpers from '../../common/forms/FormHelpers'
import AddIncomeForm from './AddIncomeForm'
import { IncomesList } from '../common/IncomesList'
import incomesActions from '../../../actions/IncomesActions'
import incomesStore from '../../../stores/IncomesStore'
import izitoast from 'izitoast'
import moment from 'moment'


class AddIncomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      income: {
        amount: '',
        from: '',
        date: moment().format('MM/DD/YYYY')
      },
      recentIncomes: []
    }

    this.handleIncomeAdded = this.handleIncomeAdded.bind(this)
    this.handleRecentIncomesFetched = this.handleRecentIncomesFetched.bind(this)

    incomesStore.on(incomesStore.eventTypes.INCOME_ADDED, this.handleIncomeAdded)
    incomesStore.on(incomesStore.eventTypes.RECENT_INCOMES_FETCHED, this.handleRecentIncomesFetched)
  }

  componentWillMount() {
    incomesActions.getRecentIncomes();
  }

  componentWillUnmount() {
    incomesStore.removeListener(incomesStore.eventTypes.INCOME_ADDED, this.handleIncomeAdded)
    incomesStore.removeListener(incomesStore.eventTypes.RECENT_INCOMES_FETCHED, this.handleRecentIncomesFetched)
  }

  handleIncomeAdded(data) {
    if (!data.success) {
      izitoast.error({ message: data.message || 'An error occured.Please try again.' })
    } else {
      izitoast.success({ message: data.message })

      this.updateRecentIncomes()
    }
  }

  handleRecentIncomesFetched(recentIncomes) {
    this.setState({ recentIncomes })
  }

  handleInputChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'income')
  }

  handleDateChange(date) {
    let income = { ...this.state.income }
    income.date = moment(date).format('MM/DD/YYYY')

    this.setState({ income })
  }

  handleFormSubmit(event) {
    event.preventDefault()
    let income = this.state.income

    if (income.amount < 0)
      return izitoast.warning({ message: 'Amount should be greater than zero :) .'})

    incomesActions.addIncome(income)
  }

  updateRecentIncomes() {
    let recentIncomes = this.state.recentIncomes
    recentIncomes.unshift(this.state.income)
    recentIncomes = this.sortRecentIncomes(recentIncomes)

    this.setState({
      recentIncomes: recentIncomes,
      income: {
        amount: '',
        from: '',
        date: moment().format('MM/DD/YYYY')
      }
    })
  }

  sortRecentIncomes(incomes) {
    let recentIncomes = incomes

    recentIncomes.sort(function (a, b) {
      var keyA = new Date(a.date),
          keyB = new Date(b.date)

      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
      return 0
    })

    return recentIncomes
  }

  render() {
    return (
      <div>
        <div>
          <h1>Account your income</h1>
          <br />
          <AddIncomeForm
            income={this.state.income}
            onUpdate={this.handleDateChange.bind(this)}
            onChange={this.handleInputChange.bind(this)}
            onSubmit={this.handleFormSubmit.bind(this)}
          />
        </div>

        <div style={{ marginTop: '50px' }}>
          <h2>Recent incomes</h2>
          <hr />
          {this.state.recentIncomes.length === 0 ?
            <h5>No recent incomes</h5> :
            <IncomesList incomes={this.state.recentIncomes} />}
        </div>
      </div>
    )
  }
}

export default AddIncomePage
