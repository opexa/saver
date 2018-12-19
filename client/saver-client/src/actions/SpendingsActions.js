import dispatcher from '../dispatcher'

const SpendingsActions = {
  types: {
    ADD_SPENDING: 'ADD_SPENDING',
    GET_RECENT_SPENDINGS: 'GET_RECENT_SPENDINGS'
  },
  addSpending (spending) {
    dispatcher.dispatch({
      type: this.types.ADD_SPENDING,
      spending
    })
  },
  getRecentSpendings () {
    dispatcher.dispatch({
      type: this.types.GET_RECENT_SPENDINGS
    })
  }
}

export default SpendingsActions
