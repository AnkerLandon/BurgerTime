import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = ( ingredients )=> {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = (  )=> {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        console.log('props', this.props); 
        axios.get('https://react-burger-1b447.firebaseio.com/ingredients.json')
            .then(res => {
                console.log('res',res);
                dispatch(setIngredients(res.data));
            }).catch( err => {
                console.log('err', err);
                dispatch(fetchIngredientsFailed());
            });
    };
};