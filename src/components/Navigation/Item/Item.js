import React from 'react';

import classes from './Item.css';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => (
    <li className={classes.Item}>
        <NavLink 
            to={props.link} 
            exact={props.exact}
            activeClassName={classes.active}>{props.children} </NavLink>
    </li>
);

export default NavItem;