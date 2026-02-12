import { getAllProducts, getProductbyId, getProductsByCategory } from './product.js';

let cartItems = [];

function addToCart(productId, quantity) {
    let prod = getProductbyId(productId);
    if(prod.stock >= quantity) {
        if(cartItems.find(item => item.product.id === productId)) {
            cartItems.find(item => item.product.id === productId).quantity += quantity;
            return (`Added ${quantity} more of ${prod.name} to cart.`);
        }
        else {
            cartItems.push({ product: prod, quantity: quantity });
            return (`Added ${prod.name} (x${quantity}) to cart.`);
        }
    }
}

function removeFromCart(productId) {
    cartItems =cartItems.filter(item => item.product.id !== productId);
    return (`Removed product with ID ${productId} from cart.`);
}

function updateQuantity(productId, newQuantity) {
    let cartprod = cartItems.find(item => item.product.id === productId);
    let prod = getProductbyId(productId);
    if(prod.stock >= newQuantity) {
        cartprod.quantity = newQuantity;
        return (`Updated quantity of ${prod.name} to ${newQuantity}.`);
    }
    else {
        return (`Insufficient stock for ${prod.name}.`);
    }
}

function getCartItems() {
    return cartItems;
}

function getCartTotal() {{
    return cartItems.reduce((total, item) => total +(item.product.price * item.quantity),0);
}}

function clearCart() {
    cartItems = [];
    return "Cart cleared.";
}


export  { addToCart, removeFromCart, updateQuantity, getCartItems, getCartTotal, clearCart };