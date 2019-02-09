import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Name'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
            },
            street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Your Street'
                    },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength:3,
                },
                valid:false,
                touched:false,
            },
            locality:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Locality'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Country'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
             },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder:'Your E-Mail'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
            },
            deliveryMode:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                        
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid:true
            },
        },
        formIsValid:false,
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

    const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData,
        userId:this.props.userId,
        }
        
        this.props.onOrderBurger(order,this.props.token);


    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
        
    }


    inputChangedHandler = (e, inputIdentifier) => {
        
        
        const updatedForm = {
            ...this.state.orderForm
        }
        // console.log(updatedForm[inputIdentifier] === this.state.orderForm[inputIdentifier]) ----- Return True
        // updatedForm[inputIdentifier].value = e.target.value;

        // this.setState({orderForm:updatedForm})

        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        // console.log(updatedForm[updatedFormElement] === this.state.orderForm[inputIdentifier])  ----- Return False
        updatedFormElement.value = e.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        

        this.setState({orderForm:updatedForm , formIsValid:formIsValid})


    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => {
                return <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(e) => this.inputChangedHandler(e, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                />
            })}
            <Button Success disabled={!this.state.formIsValid}>Order</Button>
        </form>);

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
