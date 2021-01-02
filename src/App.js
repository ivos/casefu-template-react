import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './layout/Header'
import Home from './layout/Home'
import CustomerRouter from './app/customer/CustomerRouter'
import OrderRouter from './app/order/OrderRouter'

export default () =>
  <Router>
    <Header/>
    <Container id="app-container" fluid>
      <Switch>
        <Route path="/customers">
          <CustomerRouter/>
        </Route>
        <Route path="/orders">
          <OrderRouter/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Container>
  </Router>
