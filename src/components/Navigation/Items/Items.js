import React from 'react';

import classes from './Items.css';
import Item from '../Item/Item';

const NavItems = props => (
  <ul className={classes.Items}>
    <Item link="/" exact>
      Burger Builder
    </Item>
    {props.isAuthenticated ? <Item link="/orders">Orders </Item> : null}
    {!props.isAuthenticated ? (
      <Item link="/auth">Auth</Item>
    ) : (
      <Item link="/logout">Logout</Item>
    )}
  </ul>
);

export default NavItems;
