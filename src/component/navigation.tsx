import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { Navigator } from '../router'
import Icon from './icons'

// @ts-ignore
import logo from '../assets/logo.png'

type NavigationProps = {
  history: any;
  header: any;
}

export class Navigation extends Component<NavigationProps> {
  content (r: any) {
    if (r.icon) {
      return <Icon name={r.icon} className='icon-no-hover' />
    }
    return r.name
  }

  render () {
    const home = Navigator[0];

    return (
      <div className='navigation'>
        <NavLink className="navigation-logo logo" to={home.path}>
          <img id="applogo" src={logo} alt='Cr - Color Room' />
          Color Room
        </NavLink>
        <div className="navigation-wrapper">
          <div className="navigation-body">
            {
              Navigator
                .filter((r) => !r.hidden)
                .map((route, index) => {
                  return (
                      <NavLink
                        key={index}
                        className="navigation-item"
                        activeClassName='active'
                        to={route.path}
                      >{this.content(route)}
                      </NavLink>
                  );
                })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    header: state.header
  }
}

export default withRouter(
  connect(mapStateToProps)(Navigation)
)
