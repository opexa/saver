import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import incomesActions from '../actions/IncomesActions'
import IncomesData from '../data/IncomesData'

class IncomesStore extends EventEmitter {
  addIncome (income) {
    IncomesData
      .addIncome(income)
      .then(data => this.emit(this.eventTypes.INCOME_ADDED, data))
  }

  getRecentIncomes () {
    IncomesData
      .getRecentIncomes()
      .then(data => this.emit(this.eventTypes.RECENT_INCOMES_FETCHED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case incomesActions.types.ADD_INCOME: {
        this.addIncome(action.income)
        break
      }
      case incomesActions.types.GET_RECENT_INCOMES: {
        this.getRecentIncomes()
        break
      }
      default: break
    }
  }
}

let incomesStore = new IncomesStore()

incomesStore.eventTypes = {
  INCOME_ADDED: 'income_added',
  RECENT_INCOMES_FETCHED: 'recent_incomes_fetched'
}

dispatcher.register(incomesStore.handleAction.bind(incomesStore))

export default incomesStore
