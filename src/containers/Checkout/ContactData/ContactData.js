import React, { Component } from 'react';

import Button  from '../../../components/UI/Buttons/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'postal code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]   
                },
                value: 'fastest'
            },
        },
        loading: false
    };

    orderHandeler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'TestUser',
                address: {
                    street: 'test',
                    zipCode: '234234',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'ASAP'
        };
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({loading: false, viewCart: false});
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false, viewCart: false});
            });
    }

    inputChangedHandler =  (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
        console.log('test',this.state);
        
    }

    render () {

        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        };

        let form = ( 
            <form>
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandeler}>Order</Button>
            </form> );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
          <div className={classes.ContactData}>
            <h4> Enter foyr Contact Data </h4>
            {form}
        </div>  
        )
    };
};
export default ContactData;