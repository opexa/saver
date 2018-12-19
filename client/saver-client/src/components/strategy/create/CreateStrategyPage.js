import React from 'react'
import Auth from '../../account/Auth'
import CreateStrategyForm from './CreateStrategyForm'
import StrategyTicket from './StrategyTicket'
import strategyActions from '../../../actions/StrategyActions'
import strategyStore from '../../../stores/StrategyStore'
import izitoast from 'izitoast'

class CreateStrategyPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      configuration: {
        annualAmount: '',
        monthlyAmount: '',
        weeklyAmount: '',
        monthlyIncome: ''
      },
      blockTransition: false,
      isTicketGenerated: false,
      ticket: {
        monthLimit: '',
        weekLimit: '',
        dayLimit: ''
      },
      error: ''
    }

    this.handleStrategyAdded = this.handleStrategyAdded.bind(this)

    strategyStore.on(
      strategyStore.eventTypes.STRATEGY_ADDED,
      this.handleStrategyAdded
    )
  }

  componentWillUnmount () {
    strategyStore.removeListener(
      strategyStore.eventTypes.STRATEGY_ADDED,
      this.handleStrategyAdded
    )
  }

  handleStrategyAdded (data) {
    if (data.modelState) {
      this.setState({
        error: data.modelState.error[0]
      })
    } else if (data.success) {
      this.setState({ blockTransition: false })
      izitoast.success({ message: data.message })
      this.updateUser()
      this.props.history.push('/')
    } else {
      this.setState({
        error: 'An error occured. Please try again'
      })
    }
  }

  updateUser () {
    let user = Auth.getUser()
    user.hasStrategy = true
    Auth.setUser(user)
  }

  handleConfigurationChange(event) {
    let target = event.target
    let field = target.name
    let value = target.value

    if (isNaN(value))
      return

    let type = field.replace('Amount', '');

    if (value === '') {
      if (type === 'monthlyIncome') {
        const newIncome = { ...this.state['configuration'], monthlyIncome: '' }
        return this.setState({ configuration: newIncome });
      } else {
        return this.updateConfiguration('', '', '')
      }
    }


    switch (type) {
      case 'annual': {
        let monthlyAmount = parseFloat(value) / 12
        let weeklyAmount = monthlyAmount / 4

        this.updateConfiguration(parseFloat(value), monthlyAmount, weeklyAmount)
        break
      }
      case 'monthly': {
        let annualAmount = parseFloat(value) * 12
        let weeklyAmount = parseFloat(value) / 4

        this.updateConfiguration(annualAmount, parseFloat(value), weeklyAmount)
        break
      }
      case 'weekly': {
        let annualAmount = parseFloat(value) * 52
        let monthlyAmount = parseFloat(value) * 4

        this.updateConfiguration(annualAmount, monthlyAmount, parseFloat(value))
        break
      }
      case 'monthlyIncome': {
        let configuration = this.state.configuration

        configuration.monthlyIncome = parseFloat(value)
        this.setState({ configuration: configuration, blockTransition: true })
        break
      }
      default: break
    }
  }

  updateConfiguration (annual, monthly, weekly) {
    let newConfig = this.state.configuration
    newConfig.annualAmount = annual
    newConfig.monthlyAmount = monthly
    newConfig.weeklyAmount = weekly

    this.setState({ configuration: newConfig, blockTransition: true })
  }

  generateTicket () {
    let config = this.state.configuration
    let monthlySpendings = parseFloat(config.monthlyIncome) - parseFloat(config.monthlyAmount)
    let weeklySpendings = monthlySpendings / 4
    let dailySpendings = Math.round(weeklySpendings / 7 * 100) / 100

    let ticket = {
      monthLimit: monthlySpendings,
      weekLimit: weeklySpendings,
      dayLimit: dailySpendings
    }
    this.setState({
      ticket: ticket,
      isTicketGenerated: true
    })
  }

  checkConfiguration () {
    let config = this.state.configuration
    
    if(config.annualAmount === '' || config.monthlyAmount === '' || config.weeklyAmount === '' || config.monthlyIncome === '')
      return false
    
    return true
  }

  handleConfigurationSubmit (event) {
    event.preventDefault()

    if (this.checkConfiguration())
      return this.generateTicket()
      
    this.setState({
      error: 'Please fill all fields.'
    })
  }

  handleTicketSave (event) {
    strategyActions.add(this.state.configuration)    
  }

  render() {
    return (
      <div className='content'>
        <div>
          <h2>Configure your goals</h2>
          <p>Here, you can adjust precisely how much do you want to save for the year. We will calculate your montly and weekly spendings limit for you, to make it easier.</p>
        </div>
        <br />
        <div className='form-error'>{this.state.error}</div>
        <br />
        <CreateStrategyForm
          configuration={this.state.configuration}
          isBlocking={this.state.blockTransition}
          onChange={this.handleConfigurationChange.bind(this)}
          onClick={this.handleConfigurationSubmit.bind(this)} 
          onSave={this.handleTicketSave.bind(this)} />
        <br /><br />
        { this.state.isTicketGenerated ? (
          <StrategyTicket ticket={this.state.ticket} />
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}

export default CreateStrategyPage
