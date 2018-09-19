import React from 'react';

import classes from './Items.css';
import Item from '../Item/Item';

const NavItems = (props) => (
    <ul className={classes.Items}>
        <Item link="/" exact >Burger Builder</Item>
        <Item link="/orders">Orders </Item>
    </ul>
);

export default NavItems; 