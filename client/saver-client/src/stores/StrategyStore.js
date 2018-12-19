import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import strategyActions from '../actions/StrategyActions'
import StrategyData from '../data/StrategyData'

class StrategyStore extends EventEmitter {
  add (strategy) {
    StrategyData
      .addStrategy(strategy)
      .then(data => this.emit(this.eventTypes.STRATEGY_ADDED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case strategyActions.types.ADD_STRATEGY: {
        this.add(action.strategy)
        break      
      }
      default: break
    }
  }
}

let strategyStore = new StrategyStore()

strategyStore.eventTypes = {
  STRATEGY_ADDED: 'strategy_added'
}

dispatcher.register(strategyStore.handleAction.bind(strategyStore))

export default strategyStore
