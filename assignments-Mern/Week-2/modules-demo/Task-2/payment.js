import { reduceStock } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';


function validatePaymentMethod(method) {
    return ['card', 'cod', 'upi'].includes(method.toLowerCase()) ? true : false;
}

function generateOrderID() {
    return 'ORD' + Date.now();
}

function processPayment(paymentMethod, couponCode = null) {
    let cartItems = getCartItems();
    let cartTotal = getCartTotal();
    let finalAmount = couponCode ? applyDiscount(cartTotal, couponCode, cartItems).finalTotal : cartTotal;

    if(validatePaymentMethod(paymentMethod)) {
        console.log(`Processing payment of ₹${finalAmount} via ${paymentMethod}...`);
        console.log("Payment successful!");
    }

    cartItems.forEach(item => {
        reduceStock(item.product.id, item.quantity);
    });

    clearCart();

    return {
        orderID: generateOrderID(),
        items: cartItems,
        subtotal: cartTotal,
        discount: couponCode ? applyDiscount(cartTotal, couponCode, cartItems).discount : 0,
        total: finalAmount,
        paymentMethod: paymentMethod,
        status: 'Paid',
        message: 'Order placed successfully!'
    }
}

export  { processPayment, validatePaymentMethod, generateOrderID };