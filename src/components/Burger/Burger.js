import React from 'react';

import Classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let ingredientsArr = Object.keys(props.ingredients).map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if(ingredientsArr.length === 0) {
        ingredientsArr = <p>Please start adding ingeredients!</p>
    };

    //console.log('map hell:', ingredientsArr);

    return (
        <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsArr}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;