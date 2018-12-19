import React from 'react'
import Input from '../../common/forms/Input'

const ProfileEditForm = (props) => (
  <form>
    <div className='form-group'>
      <fieldset>
        <hr />
        <div className='alert alert-light'>
          It is <strong>desirable</strong> to fill all fields, but its all left to your will.
        </div>
        {(props.error !== '') ? (
          <div className='form-error'>{props.error}</div>
        ) : ''}
        <br />
        <Input
          name='firstName'
          placeholder='First name'
          value={props.user.firstNam}
          onChange={props.onChange} />
        <Input
          name='lastName'
          placeholder='Last name'
          value={props.user.lastName}
          onChange={props.onChange} />
        <Input
          type='email'
          name='email'
          placeholder='E-mail'
          value={props.user.email}
          onChange={props.onChange} />
        <br />
        <input type='submit' value='SAVE' onClick={props.onSubmit} className='btn btn-success btn-lg btn-block' />
      </fieldset>
    </div>
  </form>
)

export default ProfileEditForm