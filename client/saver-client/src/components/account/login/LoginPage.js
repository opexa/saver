import React from 'react'
import LoginForm from './LoginForm'
import FormHelpers from '../../common/forms/FormHelpers'
import accountActions from '../../../actions/AccountActions'
import accountStore from '../../../stores/AccountStore'
import Auth from '../Auth'
import izitoast from 'izitoast'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        username: 'test',
        password: '123456',
        grant_type: 'password'
      },
      error: ''
    }

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

    accountStore.on(
      accountStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn
    )
  }

  componentWillUnmount () {
    accountStore.removeListener(
      accountStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn
    )
  }

  handleInputChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user');
  }

  handleFormSubmit (event) {
    event.preventDefault();

    accountActions.login(this.state.user)
  }

  handleUserLoggedIn (data) {
    if (data.error) {
      this.setState({ error: data.error_description || data.error })
    } else {
      Auth.authenticateUser(data.access_token)
      Auth.setUser({
        username: data.username,
        hasStrategy: data.hasStrategy
      })
      izitoast.info({ message: `Welcome back, ${data.username}`, timeout: 2000 })
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div className='container'>
        <br/><br/><br/><br/><br/><br/>
        <div className='row justify-content-center align-items-center'>
          <LoginForm 
            user={this.state.user}
            onChange={this.handleInputChange.bind(this)} 
            onSubmit={this.handleFormSubmit.bind(this)}
            error={this.state.error} /> 
        </div>
      </div>
    )
  }
}

export default LoginPage
