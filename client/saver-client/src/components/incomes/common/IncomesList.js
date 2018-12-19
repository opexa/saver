import React from 'react'

const IncomesList = (props) => (
  <div>
    {props.incomes.map((income, id) => {
      return (
        <div key={id} className='d-flex justify-content-between'>
          <h5><b>{income.amount} $</b> {income.from ? `from ${income.from}` : ''}</h5>
          <h5 style={{ color: "rgb(160, 160, 160)" }}>{income.date}</h5>
        </div>
      )
    })}
  </div>
)

const ShortIncomesList = (props) => {
  let incomesList = props.incomes.map((income, id) => (
    <div key={id} className='d-flex justify-content-between'>
        <div style={{ fontSize: '15px' }}>
          <b>{income.amount} $</b> {income.subject ? `on ${income.subject}` : ''}
        </div>
        <div style={{ color: 'rgba(130, 130, 130, 1)', fontSize: '15px' }}>{convertDate(income.date)}</div>
      </div>
  ))

  return (
    <div>
      {incomesList}      
    </div>
  )
}

const convertDate = (date) => {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(date);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

export {
  IncomesList,
  ShortIncomesList
}
