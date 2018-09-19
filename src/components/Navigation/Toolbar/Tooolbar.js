import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../Items/Items';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div onClick={props.toggle} className={classes.Menu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
        
    </header>
);

export default toolbar;