import React from 'react'
import FormHelpers from '../../common/forms/FormHelpers'
import RegisterForm from './RegisterForm'
import accountActions from '../../../actions/AccountActions'
import accountStore from '../../../stores/AccountStore'
import izitoast from 'izitoast'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props) 

    this.state = {
      user: {
        username: 'test',
        email: 'test@test.bg',
        password: '123456',
        confirmPassword: '123456'
      },
      error: ''
    }

    this.handleUserRegistered = this.handleUserRegistered.bind(this)

    accountStore.on(accountStore.eventTypes.USER_REGISTERED, this.handleUserRegistered)
  }

  componentWillUnmount () {
    accountStore.removeListener(
      accountStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistered
    )
  }

  handleUserRegistered (data) {
    this.displayResponseErrors(data)

    if (data.success) {
      izitoast.success({ title: 'Alright!', message: 'Successfully registered!' })
      this.props.history.push('/account/login')
    }
  }

  handleInputChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user');
  }

  handleFormSubmit (event) {
    event.preventDefault();

    if (this.validateForm()) {
      accountActions.register(this.state.user)
    }
  }

  validateForm () {
    let user = this.state.user
    let isFormValid = true
    let error = ''

    if (user.username === '' || user.email === '' || user.password === '' || user.confirmPassword === '') {
      isFormValid = false
      error = 'Please fill all fields'
    }

    if (user.password !== user.confirmPassword) {
      isFormValid = false
      error = 'Passwords do not match'
    }
    
    this.setState({ error })
    return isFormValid
  }

  displayResponseErrors(model) {
    if (!model.success) {
      this.setState({
        error: model.modelState !== undefined ? model.modelState.error[0] : 'An error occured, please try again.'
      })
    }
  }

  render () {
    return (
      <div className='container'>
        <br/><br/><br/><br/><br/><br/>
        <div className='row justify-content-center align-items-center'>
          <RegisterForm 
            user={this.state.user}
            onChange={this.handleInputChange.bind(this)} 
            onSubmit={this.handleFormSubmit.bind(this)}
            error={this.state.error} /> 
        </div>
      </div>
    )
  }
}

export default RegisterPage
