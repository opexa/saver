import React from 'react'

const SpendingsList = (props) => (
  <div>
    {props.spendings.map((spending, id) => {
      return (
        <div key={id} className='d-flex justify-content-between'>
          <h5><b>{spending.amount} $</b> {spending.subject ? `on ${spending.subject}` : ''}</h5>
          <h5 style={{ color: "rgb(160, 160, 160)" }}>{spending.date}</h5>
        </div>
      )
    })}
  </div>
)

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
