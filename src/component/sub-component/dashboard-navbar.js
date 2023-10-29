import React from 'react'
import Logout from './logout'
import Quote from './quote'

export default function DashboardNavbar(props){

    return(
        <div className='dashboard-navbar'>
            <div className='dashboard-navbar-logo'>
                <h2>Your Dashing Board </h2>
            </div>
            <div className='dashboard-navbar-container'>
                <Quote/>
                <Logout/>
            </div>
        </div>
    )
}