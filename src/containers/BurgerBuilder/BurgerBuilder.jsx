import React, { Component } from "react";
import Aux from "../../hoc/Aux1";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error:false
  };



  componentDidMount() {
    this.props.onInitIngredients();  
  }

  updatePurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0 
  };


  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');

    
  }

  render() {
    
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Cant Load Burger</p> : <Spinner />;
    
    if (this.props.ings) {
      burger = <Aux>
                  <Burger ingredients={this.props.ings} />
                  <BuildControls
                    addIngredient={this.props.onAddIngredient}
                    removeIngredient={this.props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={!this.updatePurchase(this.props.ings)}
                    ordered={this.purchaseHandler}
                    />
                  </Aux>;
      orderSummary = <OrderSummary
                        ingredients={this.props.ings}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                      />
    }
                  
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger }
        
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error:state.burgerBuilder.error,
  }  
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase : () => dispatch(actions.purchaseInit()),
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
