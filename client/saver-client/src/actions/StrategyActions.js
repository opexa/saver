import dispatcher from '../dispatcher'

const StrategyActions = {
  types: {
    ADD_STRATEGY: 'ADD_STRATEGY'
  },
  add (strategy) {
    dispatcher.dispatch({
      type: this.types.ADD_STRATEGY,
      strategy
    })
  }
}

export default StrategyActions
