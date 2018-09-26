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
                    placeholder: 'name',
                    touched: false
                },
                value: '',
                validation: {
                    required: true,
                    valid: false
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'postal code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    valid: false,
                    touched: false
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]   
                },
                value: 'fastest',
                validation: {
                    valid: true,
                    touched: false
                }
            },
        },
        formIsValid: false,
        loading: false
    };

    checkValid(value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== ''  && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandeler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};

        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData                
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
        updatedFormElement.validation.valid = this.checkValid(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.validation.touched = true;
        
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].validation.valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        invalid={!formElement.config.validation.valid}
                        shouldValidate={formElement.config.validation.required}
                        touched={formElement.config.validation.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandeler}>Order</Button>
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