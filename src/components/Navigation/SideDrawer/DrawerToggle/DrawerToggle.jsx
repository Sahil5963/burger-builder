import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    return (
        <div className={classes.MenuIcon} onClick={props.clicked}>
            <div className={classes.MenuBar}></div>
            <div className={classes.MenuBar}></div>
            <div className={classes.MenuBar}></div>
        </div>
    );
}

export default drawerToggle;
