import React from 'react';

import Backdrop from '../../UI/Backdrop/backdrop';
import Aux from '../../../HOC/Auxx';
import Logo from '../../Logo/Logo';
import NavItems from '../Items/Items';
import classes from './SideDrawer.css';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.menuOpen) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop clicked={props.toggle} show={props.menuOpen} />
      <div className={attachedClasses.join(' ')} onClick={props.toggle}>
        <Logo height="11%" />
        <nav>
          <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
