const products = [ 
        { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
        { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
        { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
        { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
        { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
  ];

function getProductbyId(id) {
    return products.find(product => product.id === id);
}

function getAllProducts() {
    return products;
}

function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

function searchProducts(query) {
    return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
}

function checkStock(productid, quantity) {
    return getProductbyId(productid).stock >= quantity;
}

function reduceStock(productid, quantity) {
    return getProductbyId(productid).stock -= quantity;
}

export  { getProductbyId, getAllProducts, getProductsByCategory, searchProducts, checkStock, reduceStock };