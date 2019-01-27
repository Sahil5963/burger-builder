import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

export default class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            locality:''
        },
        loading:false,
    }

    orderHandler = (e) => {
        e.preventDefault();

    this.setState({loading:true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Sahil',
        address: {
          street: '554',
          locality:'Nayagoan'
        },
        email:'sk950121@gmail.com'
      },
      deliveryMode:'fastest'
    }
    axios.post('/orders.json', order)
      .then(res => {
          this.setState({ loading: false });
          this.props.history.push('/');
      })
      .catch(err => {
        this.setState({loading:false})
      })

    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Enter Your Name"></input>
            <input className={classes.Input} type="text" name="email" placeholder="Your Email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="Your Street"></input>
            <input className={classes.Input} type="text" name="locality" placeholder="Your Locality"></input>
            <Button Success clicked={this.orderHandler}>Order</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner/>
        }
      
    return (
        <div className={classes.ContactData}>
            <h2>Enter Contact Data</h2>
            {form}
      </div>
    )
  }
}
