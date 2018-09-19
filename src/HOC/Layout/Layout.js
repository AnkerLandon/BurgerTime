import React, {Component} from 'react';

import Aux from '../../HOC/Auxx';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Tooolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    render () {
        return (
            <Aux>
                <Toolbar toggle={this.sideDrawerToggle}/>
                <SideDrawer 
                    toggle={this.sideDrawerToggle} 
                    menuOpen={this.state.showSideDrawer}
                />
                <main className={classes.content}>
                    { this.props.children }
                </main>        
            </Aux>
        );
    };
};
export default Layout;