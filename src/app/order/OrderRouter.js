import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OrderCreate from './OrderCreate'
// import OrderEdit from './OrderEdit'
// import OrderDetail from './OrderDetail'
import OrderList from './OrderList'

export default () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <OrderCreate/>
      </Route>
      {/*<Route path={`${match.path}/:id/edit`}>*/}
      {/*  <OrderEdit/>*/}
      {/*</Route>*/}
      {/*<Route path={`${match.path}/:id`}>*/}
      {/*  <OrderDetail/>*/}
      {/*</Route>*/}
      <Route path={match.path}>
        <OrderList/>
      </Route>
    </Switch>
  )
}
