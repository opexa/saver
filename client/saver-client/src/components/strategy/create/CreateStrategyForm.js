import React from 'react'
import { Prompt } from 'react-router-dom'
import Input from '../../common/forms/Input'

const ConfigureGoalsForm = (props) => (
  <div>
    <div className='row d-flex justify-content-between'>
      <div className='col-lg-5'>
        <form>
          <Prompt
            when={props.isBlocking}
            message={location =>
              `Are you sure you want to leave`
            }
          />
          <fieldset>
            <legend>Calculator</legend>
            <Input
              name='annualAmount'
              label='Annual savings goal'
              value={props.configuration.annualAmount}
              onChange={props.onChange}
              placeholder='Amount' />
            <Input
              name='monthlyAmount'
              label='Monthly savings goal'
              value={props.configuration.monthlyAmount}
              onChange={props.onChange}
              placeholder='Amount' />
            <Input
              name='weeklyAmount'
              label='Weekly savings goal'
              value={props.configuration.weeklyAmount}
              onChange={props.onChange}
              placeholder='Amount' />
          </fieldset>
        </form>
      </div>
      <div className='col-lg-7'>
        <form>
          <fieldset>
            <legend>&nbsp;</legend>
            <Input
              name='monthlyIncome'
              label='Your monthly income'
              value={props.configuration.monthlyIncome}
              onChange={props.onChange}
              placeholder='Amount' />
            <div className='form-group d-flex flex-row-reverse'>
              <button type='button' className='btn btn-success btn-lg' onClick={props.onSave}>SAVE</button>&nbsp;
              <button type='button' className='btn btn-outline-primary btn-lg' onClick={props.onClick}>GENERATE</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
)

export default ConfigureGoalsForm
