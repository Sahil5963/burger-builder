import React, { Component } from 'react'
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

export default class OrderSummary extends Component {


    componentWillUpdate() {
        console.log("[OrderSummary] Will Update");
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey =>
            (<li key={igKey}>
                <span style={{ textTransform: "uppercase" }}>{igKey} : </span>
                {this.props.ingredients[igKey]}
            </li>)
        );

        return (
            <>
                <h3>Order Summary</h3>
                <p>Your Deliciuos Burger is ready with:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue To Checkout </p>
                <Button clicked={this.props.purchaseCancel} Danger>Cancel</Button>
                <Button clicked={this.props.purchaseContinue} Success>Continue</Button>
            </>
        );

    }
}
