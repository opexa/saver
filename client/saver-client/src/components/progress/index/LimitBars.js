import React from 'react'

class LimitBars extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      progress: props.progress,
      bars: {
        month: {
          percents: '',
          background: ''
        },
        week: {
          percents: '',
          background: ''
        },
        day: {
          percents: '',
          background: ''
        }
      }
    }
  }

  componentWillMount () {
    let data = this.state.progress     
    console.log(data)

    let barsProps = {
      day: this.getBarProperties(data.dailySpendingsTotal, Math.round(data.currentWeek.limit / 7 * 100) / 100),
      month: this.getBarProperties(data.monthSpendingsTotal, data.monthLimit),
      week: this.getBarProperties(data.currentWeek.spendingsTotal, data.currentWeek.limit)
    }

    console.log(barsProps)

    this.setState({ bars: barsProps })
  }

  getBarProperties(spendings, limit) {
    let percents = Math.round((spendings / limit * 100) * 100) / 100
    let background = ''

    if (percents >= 0 && percents <= 25)
      background = 'bg-success'
    else if (percents > 25 && percents <= 50)
      background = ''
    else if (percents > 50 && percents <= 75)
      background = 'bg-warning'
    else if (percents > 75)
      background = 'bg-danger'

    return {
      percents: String(percents),
      background: background
    }
  }

  render() {
    let barsProps = this.state.bars
    let progress = this.state.progress

    return (
      <div className='limits'>
        <div className='day-limit'>
          <div className='text-center'>
            <p><span className={`day-limit-text ${barsProps.day.background || 'btn-primary'}`}>Day limit</span> {progress.dailySpendingsTotal} / {Math.round(progress.currentWeek.limit / 7 * 100) / 100} $</p>
          </div>
          <div>
            <div className='progress'>
              <div className={`progress-bar ${barsProps.day.background}`} role='progressbar' style={{ width: `${barsProps.day.percents}%` }} aria-valuenow={barsProps.day.percents} aria-valuemin='0' aria-valuemax='100'>{barsProps.day.percents}%</div>
            </div>
          </div>
        </div>
        <hr /><br />

        <div className='row'>
          <div className='col-lg-3'>
            <p className='float-left'>Month limit:</p>
            <p className='float-right'>{progress.monthSpendingsTotal} / {progress.monthLimit} $</p>
          </div>
          <div className='col-lg-9'>
            <div className='progress'>
              <div className={`progress-bar ${barsProps.month.background}`} role='progressbar' style={{ width: `${barsProps.month.percents}%` }} aria-valuenow={barsProps.month.percents} aria-valuemin='0' aria-valuemax='100'>{barsProps.month.percents}%</div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-3'>
            <p className='float-left'>Week limit:</p>
            <p className='float-right'>{progress.currentWeek.spendingsTotal} / {progress.currentWeek.limit} $</p>
          </div>
          <div className='col-lg-9'>
            <div className='progress'>
              <div className={`progress-bar bg-${barsProps.week.background}`} role='progressbar' style={{ width: `${barsProps.week.percents}%` }} aria-valuenow={barsProps.week.percents} aria-valuemin='0' aria-valuemax='100'>{barsProps.week.percents}%</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LimitBars
