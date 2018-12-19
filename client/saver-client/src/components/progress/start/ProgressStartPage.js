import React from 'react'
import progressActions from '../../../actions/ProgressActions'
import progressStore from '../../../stores/ProgressStore'
import izitoast from 'izitoast'

class ProgressStartPage extends React.Component {
  constructor (props) {
    super(props)

    this.handleProgressStarted = this.handleProgressStarted.bind(this)

    progressStore.on(
      progressStore.eventTypes.PROGRESS_STARTED,
      this.handleProgressStarted
    )
  }

  handleProgressStarted (data) {
    if (data.success) {
      izitoast.success({
        title: 'Congratulations',
        message: 'You are all set up and ready to organize your finances!',
        timeout: 10000
      })
      this.props.history.push('/progress')
    } else {
      this.props.history.push(data.redirectUrl)
    }
  }

  componentWillMount () {
    progressActions.startProgress()
  }

  componentWillUnmount () {
    progressStore.removeListener(
      progressStore.eventTypes.PROGRESS_STARTED,
      this.handleProgressStarted
    )
  }

  render () {
    return null
  }
}

export default ProgressStartPage