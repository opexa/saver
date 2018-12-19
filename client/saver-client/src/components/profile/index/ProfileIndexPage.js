import React from 'react'
import Auth from '../../account/Auth'
import profileActions from '../../../actions/ProfileActions'
import profileStore from '../../../stores/ProfileStore'
import PersonalInfo from './PersonalInfo'
import StrategyInfo from './StrategyInfo'

class ProfileIndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        error: ''
      },
      currentStrategy: null
    }

    this.personalInfoFetched = this.personalInfoFetched.bind(this)

    profileStore.on(
      profileStore.eventTypes.USER_INFO_FETCHED,
      this.personalInfoFetched
    )
  }

  componentWillUnmount() {
    profileStore.removeListener(
      profileStore.eventTypes.USER_INFO_FETCHED,
      this.personalInfoFetched
    )
  }

  personalInfoFetched(data) {
    if (!data.error) {
      this.setState({
        personalInfo: data.personalInfo,
        currentStrategy: data.currentStrategy
      })
    } else {
      this.setState({
        personalInfo: {
          error: data.error
        }
      })
    }
  }

  componentWillMount() {
    profileActions.getUserInfo()
  }

  render() {
    return (
      <div>
        <div className='page-header'>
          <h1>Profile <small style={{ color: 'rgb(150, 150, 150' }}>( {Auth.getUser().username} )</small></h1>
        </div>
        <br />

        <div className='row'>
          <div className='col-md-4'>
            <PersonalInfo user={this.state.personalInfo} />
          </div>
          <div className='col-md-8'>
            <StrategyInfo strategy={this.state.currentStrategy} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileIndexPage
