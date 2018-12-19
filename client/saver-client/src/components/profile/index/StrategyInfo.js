import React from 'react'
import { Link } from 'react-router-dom'

const StrategyInfo = (props) => (
  <div className='card border-info mb-3 profile-info'>
    <div className='card-header' style={{ lineHeight: '2rem' }}>
      Your current strategy
        <Link className='btn btn-info btn-sm float-right' to='/strategy/create'>Update</Link>
    </div>
    <div className='card-body'>
      {props.strategy === null ? <span style={{ color: 'rgb(110, 110, 110' }}>You don't have any strategy set.</span> : (
        <div className='row'>
          <div className='col-md-6'>
            <p><b>Monthly Income</b>&nbsp;&nbsp;&nbsp; {props.strategy.monthlyIncome} $</p>
          </div>
          <div className='col-md-6'>
            <p><b>Annual Savings</b>&nbsp;&nbsp;&nbsp; {props.strategy.annualAmount}  $</p>
            <p><b>Monthly Savings</b>&nbsp;&nbsp;&nbsp; {props.strategy.monthlyAmount} $</p>
            <p><b>Weekly Savings</b>&nbsp;&nbsp;&nbsp; {props.strategy.weeklyAmount}  $</p>
          </div>
        </div>
      )}
    </div>
  </div>
)

export default StrategyInfo
