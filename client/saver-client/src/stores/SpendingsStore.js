import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import spendingsActions from '../actions/SpendingsActions'
import SpendingsData from '../data/SpendingsData'

class SpendingsStore extends EventEmitter {
  addSpending (spending) {
    SpendingsData
      .addSpending(spending)
      .then(data => this.emit(this.eventTypes.SPENDING_ADDED, data))
  }

  getRecentSpendings () {
    SpendingsData
      .getRecentSpendings()
      .then(data => this.emit(this.eventTypes.RECENT_SPENDINGS_FETCHED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case spendingsActions.types.ADD_SPENDING: {
        this.addSpending(action.spending)
        break
      }
      case spendingsActions.types.GET_RECENT_SPENDINGS: {
        this.getRecentSpendings()
        break
      }
      default: break
    }
  }
}

let spendingsStore = new SpendingsStore()

spendingsStore.eventTypes = {
  SPENDING_ADDED: 'spending_added',
  RECENT_SPENDINGS_FETCHED: 'recent_spendings_fetched'
}

dispatcher.register(spendingsStore.handleAction.bind(spendingsStore))

export default spendingsStore
