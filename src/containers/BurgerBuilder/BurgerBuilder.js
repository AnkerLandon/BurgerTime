import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../HOC/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../HOC/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

    state = {
        viewCart: false,
        loading: false
    };

    componentDidMount () {
        // console.log('props', this.props); 
        // axios.get('https://react-burger-1b447.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         console.log('res',res);
        //         this.setState({ingredients: res.data});
        //     });
    };

    updatePurchaseState = (ingredients) => {
       
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    };

    viewCartToggle = () => {
        this.setState({viewCart: !this.state.viewCart});
    };

    viewCartContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render () {

        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        };

        let modalContent = null;

        if(this.state.loading) {
            modalContent = <Spinner />;
        }

        let burger = <Spinner /> 
        
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        viewCart={this.viewCartToggle}
                        price={this.props.price}
                        purchasable={!this.updatePurchaseState(this.props.ings)}/>
                </Aux>
            );

            modalContent = 
                <OrderSummary 
                    price={this.props.price}
                    ingredients={this.props.ings}
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
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (errorHandler(BurgerBuilder, axios));