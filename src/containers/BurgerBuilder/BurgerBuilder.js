import React, {Component} from 'react';

import Aux from '../../HOC/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../HOC/ErrorHandler/ErrorHandler';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    bacon: .7,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        viewCart: false,
        loading: false
    };

    componentDidMount () {
        console.log('props', this.props); 
        axios.get('https://react-burger-1b447.firebaseio.com/ingredients.json')
            .then(res => {
                console.log('res',res);
                this.setState({ingredients: res.data});
            });
    };

    updatePurchaseState = (ingredients) => {
       
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        this.setState({purchasable: sum > 0});
    };

    addIngredientHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = updatedCount;
        
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if( oldCount <= 0) {
            return ;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = updatedCount;
        
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    viewCartToggle = () => {
        this.setState({viewCart: !this.state.viewCart});
    };

    viewCartContinueHandler = () => {
        
        const queryParams =[];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        
    };

    render () {

        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        };

        let modalContent = null;

        if(this.state.loading) {
            modalContent = <Spinner />;
        }

        let burger = <Spinner /> 
        
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        viewCart={this.viewCartToggle}
                        price={this.state.totalPrice}
                        purchasable={!this.state.purchasable}/>
                </Aux>
            );

            modalContent = 
                <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    modalClosed={this.viewCartToggle}
                    continue={this.viewCartContinueHandler}/>
            ;
        };

        return (
            <Aux>
                <Modal show={this.state.viewCart} modalClosed={this.viewCartToggle}>
                    {modalContent}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

export default errorHandler(BurgerBuilder, axios);