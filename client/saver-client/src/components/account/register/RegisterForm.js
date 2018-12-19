import React from 'react'
import Input from '../../common/forms/Input'

const RegisterForm = (props) => (
  <form className='col-md-5'>
    <div className='form-group'>
      <fieldset>
        <legend>Organize your finances</legend>
        { (props.error !== '') ? (
          <div className='form-error'>{props.error}</div>
        ) : (
          <span></span>
        )}
        <br/>
        <Input
          name='username'
          placeholder='Username'
          value={props.user.username}
          onChange={props.onChange} />
        <Input 
          type='email'
          name='email'
          placeholder='E-mail'
          value={props.user.email}
          onChange={props.onChange} />
        <Input 
          type='password'
          name='password'
          placeholder='Password'
          value={props.user.password}
          onChange={props.onChange} />
        <Input 
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={props.user.confirmPassword}
          onChange={props.onChange} />
        <input type='submit' value='Register' onClick={props.onSubmit} className='btn btn-primary btn-lg btn-block'/>
      </fieldset>
    </div>
  </form>
)

export default RegisterForm
