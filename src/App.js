import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './layout/Header'
import Home from './layout/Home'
import CustomerList from './app/customers/CustomerList'
import CustomerCreate from './app/customers/CustomerCreate'
import CustomerDetail from './app/customers/CustomerDetail'

export default () => (
  <Router>
    <Header/>
    <Container id="app-container" fluid>
      <Switch>
        <Route path="/customers/new">
          <CustomerCreate/>
        </Route>
        <Route path="/customers/:id">
          <CustomerDetail/>
        </Route>
        <Route path="/customers">
          <CustomerList/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Container>
  </Router>
)
