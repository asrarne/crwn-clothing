import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-item'>
            {cartItems.length === 0 ? <span className='text'>Your cart is empty</span> :
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)}
        </div>
        <CustomButton type="button">GO TO CHECKOUT</CustomButton>    
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(CartDropdown);