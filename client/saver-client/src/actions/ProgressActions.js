import dispatcher from '../dispatcher'

const ProgressActions = {
  types: {
    GET_MONTH_TICKET: 'GET_MONTH_TICKET',
    START_PROGRESS: 'START_PROGRESS',
    FINISH_MONTH: 'FINISH_MONTH'
  },
  getMonthTicket () {
    dispatcher.dispatch({
      type: this.types.GET_MONTH_TICKET
    })
  },
  startProgress () {
    dispatcher.dispatch({
      type: this.types.START_PROGRESS
    })
  },
  finishMonth () {
    dispatcher.dispatch({
      type: this.types.FINISH_MONTH
    })
  }
}

export default ProgressActions