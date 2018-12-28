import React, { Component } from 'react'
import EventAppBar from '../components/EventAppBar';
import DashboardRoutes from '../components/dashboard/DashboardRoutes';
import { Redirect } from 'react-router-dom';
import {AuthConsumer} from '../context/AuthContext'

export default class Dashboard extends Component {
  render() {
    return (
      <AuthConsumer>
        {({currentUser}) => {
          if(currentUser !== null && currentUser.isAdmin) {
            return (
            
              <React.Fragment>
                <EventAppBar/>
                <DashboardRoutes/>
              </React.Fragment>
            )
          } else {
            return (<Redirect to='/'/>)
          }
          }}
      </AuthConsumer>)
  }
}
