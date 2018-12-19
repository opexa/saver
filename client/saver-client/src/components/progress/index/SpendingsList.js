import React from 'react'

const SpendingsList = (props) => {
  let spendingsList = props.spendings.map((spending, id) => (
    <div key={id} className='d-flex justify-content-between'>
        <div style={{ fontSize: '15px' }}>
          <b>{spending.amount} $</b> {spending.subject ? `on ${spending.subject}` : ''}
        </div>
        <div style={{ color: 'rgba(130, 130, 130, 1)', fontSize: '15px' }}>{convertDate(spending.date)}</div>
      </div>
  ))

  return (
    <div>
      <h5>Spendings &nbsp;<i className='fas fa-sign-out-alt' style={{ color: '#d9534f' }}></i></h5>
      {spendingsList}
      
    </div>
  )
}

const ShortSpendingsList = (props) => {
  let spendingsList = props.spendings.map((spending, id) => (
    <div key={id} className='d-flex justify-content-between'>
        <div style={{ fontSize: '15px' }}>
          <b>{spending.amount} $</b> {spending.subject ? `on ${spending.subject}` : ''}
        </div>
        <div style={{ color: 'rgba(130, 130, 130, 1)', fontSize: '15px' }}>{convertDate(spending.date)}</div>
      </div>
  ))

  return (
    <div>
      {spendingsList}      
    </div>
  )
}

const convertDate = (date) => {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(date);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

export {
  SpendingsList,
  ShortSpendingsList
}

