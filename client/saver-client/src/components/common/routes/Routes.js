import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import HomePage from '../HomePage'
import RegisterPage from '../../account/register/RegisterPage'
import LoginPage from '../../account/login/LoginPage'
import LogoutPage from '../../account/LogoutPage'

import CreateStrategyPage from '../../strategy/create/CreateStrategyPage'

import ProfileIndexPage from '../../profile/index/ProfileIndexPage'
import ProfileEditPage from '../../profile/edit/ProfileEditPage'

// import ProgressIndexPage from '../../progress/index/ProgressIndexPage'
import ProgressStartPage from '../../progress/start/ProgressStartPage'

import AddSpendingPage from '../../spendings/add/AddSpendingPage'

import AddIncomePage from '../../incomes/add/AddIncomePage'

const Routes = (props) => (
  <Switch>
    <Route path='/' exact component={HomePage} />

    <Route path='/account/register' component={RegisterPage} />
    <Route path='/account/login' component={LoginPage} />
    <PrivateRoute path='/account/logout' component={LogoutPage} />

    <PrivateRoute path='/strategy/create' component={CreateStrategyPage} />

    <PrivateRoute exact path='/profile' component={ProfileIndexPage} />
    <PrivateRoute path ='/profile/edit' component={ProfileEditPage} />

    {/* <PrivateRoute exact path='/progress' component={ProgressIndexPage} /> */}
    <PrivateRoute path='/progress/start' component={ProgressStartPage} />

    <PrivateRoute path='/spendings/add' component={AddSpendingPage} />

    <PrivateRoute path='/incomes/add' component={AddIncomePage} />
  </Switch>
)

export default Routes
