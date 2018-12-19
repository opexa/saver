import React from 'react'
import Input from '../../common/forms/Input'
import DatePicker from 'react-datepicker'

const AddSpendingForm = (props) => (
  <form>
    <div className='form-group'>
      <fieldset>
        <div className='alert alert-light row d-flex justify-content-between'>
          <Input
            className='col'
            type='number'
            name='amount'
            value={props.spending.amount}
            onChange={props.onChange}
            placeholder='Amount' />
          <Input
            className='col'
            name='subject'
            value={props.spending.subject}
            onChange={props.onChange}
            placeholder='Subject' />
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='date'>Date</label>
              <DatePicker className='form-control' value={props.spending.date} onChange={props.onUpdate} placeholder='Date' id='date' name='date'/>
            </div>
          </div>
          <div className='col-lg-1' style={{ lineHeight: '64px' }}>
            <input type='submit' value='Add' onClick={props.onSubmit} className='btn btn-success align-bottom' style={{ width: '80px' }} />
          </div>
        </div>
      </fieldset>
    </div>
  </form>
)

export default AddSpendingForm
