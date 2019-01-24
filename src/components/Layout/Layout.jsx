import React from 'react'
import Aux from '../../hoc/Aux1'
import classes from './Layout.module.css';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const layout = (props) => (

    <Aux>
        <div className={classes.AppBar}>Toolbar, Sidebar , Backdrop</div>
        <main className={classes.Content}>
           <BurgerBuilder />
        </main>
    </Aux>


);

export default layout;