import React from 'react'
import Input from '../../common/forms/Input'

const LoginForm = (props) => (
  <form className='col-md-5'>
    <div className='form-group'>
      <fieldset>
        <legend>Login into your account</legend>
        <span className='form-error'>{props.error}</span>
        <br/>
        <br/>
        <Input 
          name='username'
          placeholder='Username'
          value={props.user.username}
          onChange={props.onChange} />
        <Input 
          type='password'
          name='password'
          placeholder='Password'
          value={props.user.password}
          onChange={props.onChange} />
        <input type='submit' value='LOGIN' onClick={props.onSubmit} className='btn btn-primary btn-lg btn-block'/>
      </fieldset>
    </div>
  </form>
)

export default LoginForm
