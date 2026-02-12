const coupons = {
            'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
            'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
            'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
      };

function validateCoupon(couponCode, cartTotal, cartItems ) {
    if(coupons[couponCode] && cartTotal >= coupons[couponCode].minAmount ) {
        if(coupons[couponCode].category) {
            let categoryItems = cartItems.filter(item => item.product.category === coupons[couponCode].category);
            if(categoryItems.length === 0) {
                return false;
            }
        }
        return true;
    }
}

function calculateDiscount(couponCode, cartTotal) {
    if(coupons[couponCode].type === 'percentage') {
        return (cartTotal * coupons[couponCode].value) / 100;
    }
    else {
        return coupons[couponCode].value;
    }
}

function applyDiscount(cartTotal, couponCode, cartItems) {
    if(validateCoupon(couponCode, cartTotal, cartItems)) {
        let discount = calculateDiscount(couponCode, cartTotal);
        return {
            originalTotal: cartTotal,
            discount: discount,
            finalTotal: cartTotal - discount,
            message: `Coupon ${couponCode} applied successfully!`
        };
    }
}

export  { applyDiscount, validateCoupon, calculateDiscount };