import React from 'react'
import ProfileEditForm from './ProfileEditForm'
import FormHelpers from '../../common/forms/FormHelpers'
import profileActions from '../../../actions/ProfileActions'
import profileStore from '../../../stores/ProfileStore'
import izitoast from 'izitoast'

class ProfileEditPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: ''
      },
      error: ''
    }

    this.handlePersonalInfoFetched = this.handlePersonalInfoFetched.bind(this)
    this.handlePersonalInfoEdited = this.handlePersonalInfoEdited.bind(this)

    profileStore.on(
      profileStore.eventTypes.PERSONAL_INFO_FETCHED,
      this.handlePersonalInfoFetched
    )

    profileStore.on(
      profileStore.eventTypes.PERSONAL_INFO_EDITED,
      this.handlePersonalInfoEdited
    )
  }

  componentWillMount () {
    profileActions.getPersonalInfo()
  }

  componentWillUnmount () {    
    profileStore.removeListener(
      profileStore.eventTypes.PERSONAL_INFO_FETCHED,
      this.handlePersonalInfoFetched
    )
    profileStore.removeListener(
      profileStore.eventTypes.PERSONAL_INFO_EDITED,
      this.handlePersonalInfoEdited
    )
  }

  handlePersonalInfoFetched (data) {
    if (!data.success) {
      this.setState({
        user: {
          email: data.email,
          firstName: data.firstName || '',
          lastName: data.lastName || ''
        }
      })
    }
  }

  handlePersonalInfoEdited (data) {
    console.log("invoked")
    if (data.success) {
      izitoast.success({
        message: data.message
      })
      this.props.history.push('/profile')
    }
  }

  handleInputChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleFormSubmit (event) {
    event.preventDefault()

    if (!this.validateForm)
      return

    profileActions.editPersonalInfo(this.state.user)
  }

  validateForm () {
    let user = this.state.user
    let isFormValid = true
    let error = ''

    if (user.email === '') {
      isFormValid = false
      error = 'E-mail cannot be empty'
    }
     
    this.setState({ error })
    return isFormValid
  }

  render() {
    return (
      <div className='row'>
        <br /><br />
        <div className='col-md-6 offset-md-3'>
          <h1>Edit your personal info</h1>
          <ProfileEditForm
            user={this.state.user}
            error={this.state.error}
            onChange={this.handleInputChange.bind(this)}
            onSubmit={this.handleFormSubmit.bind(this)} />
        </div>
      </div>
    )
  }
}

export default ProfileEditPage
