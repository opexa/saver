import React from 'react'
import { Link } from 'react-router-dom'

const PersonalInfo = (props) => (
  <div className='card border-secondary mb-3 profile-info'>
    <div className='card-header' style={{ lineHeight: '2rem' }}>
      Your personal info
          <Link className='btn btn-secondary btn-sm float-right' to='/profile/edit'>Edit</Link>
    </div>
    <div className='card-body'>
      {props.user.firstName ? <p><b>First name</b>&nbsp; {props.user.firstName}</p> : ''}
      {props.user.lastName ? <p><b>Last Name</b>&nbsp; {props.user.firstName}</p> : ''}
      {props.user.email ? <p><b>Email</b>&nbsp; {props.user.email}</p> : ''}
      {props.user.error ? <span className='form-error'>{props.user.error}</span> : ''}
    </div>
  </div>
)

export default PersonalInfo
