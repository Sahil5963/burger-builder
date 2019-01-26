import React, { Component } from "react";
import Aux from "../../hoc/Aux1";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.5,
  meat: 0.3
};
class BurgerBuilder extends Component {
  state = {
    ingredients:null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  };



  componentDidMount() {
    axios.get( '/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
  }

  updatePurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.price;
    const upadtedPrice = oldPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      price: upadtedPrice
    });

    this.updatePurchase(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.price;
    const upadtedPrice = oldPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      price: upadtedPrice
    });

    this.updatePurchase(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    // alert("You Continue")
    this.setState({loading:true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price.toFixed(2),
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
      this.setState({loading:false,purchasing:false})
      })
      .catch(err => {
        this.setState({loading:false,purchasing:false})
    })
  }

  render() {
    
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Cant Load Burger</p> : <Spinner />;
    
    if (this.state.ingredients) {
      burger = <Aux>
                  <Burger ingredients={this.state.ingredients} />
                  <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.price}
                    purchasable={!this.state.purchasable}
                    ordered={this.purchaseHandler}
                    />
                  </Aux>;
      orderSummary = <OrderSummary
                        ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder,axios);
