import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CustomerCreate from './CustomerCreate'
import CustomerEdit from './CustomerEdit'
import CustomerDetail from './CustomerDetail'
import CustomerList from './CustomerList'

export default () => {
  const match = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${match.path}/new`}>
        <CustomerCreate/>
      </Route>
      <Route path={`${match.path}/:id/edit`}>
        <CustomerEdit/>
      </Route>
      <Route path={`${match.path}/:id`}>
        <CustomerDetail/>
      </Route>
      <Route path={match.path}>
        <CustomerList/>
      </Route>
    </Switch>
  </>
}
