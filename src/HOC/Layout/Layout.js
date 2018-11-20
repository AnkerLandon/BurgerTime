import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../HOC/Auxx';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Tooolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggle = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          toggle={this.sideDrawerToggle}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          toggle={this.sideDrawerToggle}
          menuOpen={this.state.showSideDrawer}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
