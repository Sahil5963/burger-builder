import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css';
import {Link} from 'react-router-dom'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We Hope It Taste Well</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>

            <Button
                Danger
                clicked={props.checkoutCancel}
            >Cancel</Button>
            <Button
                Success
                clicked={props.checkoutContinue}
            >Continue</Button>
            
        </div>
    );
}

export default checkoutSummary;