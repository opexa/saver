import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import progressActions from '../actions/ProgressActions'
import ProgressData from '../data/ProgressData'

class ProgressStore extends EventEmitter {
  getMonthTicket () {
    ProgressData
      .getMonthProgress()
      .then(data => this.emit(this.eventTypes.MONTH_PROGRESS_FETCHED, data))
  }

  startProgress () {
    ProgressData
      .startMonthProgress()
      .then(data => this.emit(this.eventTypes.PROGRESS_STARTED, data))
  }

  finishMonth () {
    ProgressData
      .finishMonth()
      .then(data => this.emit(this.eventTypes.MONTH_FINISHED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case progressActions.types.GET_MONTH_TICKET: {
        this.getMonthTicket()
        break
      }
      case progressActions.types.START_PROGRESS: {
        this.startProgress()
        break
      }
      case progressActions.types.FINISH_MONTH: {
        this.finishMonth()
        break
      }
      default: break
    }
  }
}

let progressStore = new ProgressStore()

progressStore.eventTypes = {
  MONTH_PROGRESS_FETCHED: 'month_progress_fetched',
  PROGRESS_STARTED: 'progress_started',
  MONTH_FINISHED: 'month_finished'
}

dispatcher.register(progressStore.handleAction.bind(progressStore))

export default progressStore