import dispatcher from '../dispatcher'

const IncomesActions = {
  types: {
    ADD_INCOME: 'ADD_INCOME',
    GET_RECENT_INCOMES: 'GET_RECENT_INCOMES'
  },
  addIncome (income) {
    dispatcher.dispatch({
      type: this.types.ADD_INCOME,
      income
    })
  },
  getRecentIncomes () {
    dispatcher.dispatch({
      type: this.types.GET_RECENT_INCOMES
    })
  }
}

export default IncomesActions