import React from 'react'

const StrategyTicket = (props) => (
  <div className='savings-strategy'>
    <h2>According to your configuration, your limits will be: </h2>
    <div className='spending-plan'>
      <ul className='plan-list'>
        <li><i className='fa fa-caret-right'></i>&nbsp; Your <b>monthly</b> spendings must be less than: {props.ticket.monthLimit}</li>
        <li><i className='fa fa-caret-right'></i>&nbsp; Your <b>weekly</b> spendings must be less than: {props.ticket.weekLimit}</li>
        <li><i className='fa fa-caret-right'></i>&nbsp; And that makes {props.ticket.dayLimit} a <b>day</b></li>
      </ul>
    </div>
  </div>
)

export default StrategyTicket
