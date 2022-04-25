const knex = require('../database/knex');

//create new cart
const createCart = async (user_id, product_id, quantity) => {
    //add cart to table
    const query = knex('cart').insert({ customer_id: user_id, product_id, quantity });
    console.log('Raw query for createCart:', query.toString());
    const result = await query;
    //return cart
    const query2 = knex('cart').where({customer_id:user_id});
    console.log('Raw query for getCart:', query2.toString());
    const result2 = await query2;
    return result2;
}
//get product by cart
const fetchProductByID = async (product_id) => {
    //return product
    const query = knex('product').where({product_id});
    console.log('Raw query for getProduct:', query.toString());
    const result = await query;
    return result;
};
//create new order
const createOrder = async (firstName, lastName, address, city, state, zip, cardName, cardNumber, cardExprDate, purchaseDate, farmer_id, customer_id, product_id, quantity, price) => {
    //add order to table
    const query = knex('transactions').insert({ firstName, lastName, address, city, state, zip, cardName, cardNumber, cardExprDate, purchaseDate, farmer_id, customer_id, product_id, quantity, price });
    console.log('Raw query for createOrder:', query.toString());
    const result = await query;
    //get most recent order number
    const query2 = knex('transactions').max('transaction_id', {as: 'recentOrder'});
    console.log('Raw query for getOrder:', query2.toString());
    const result2 = await query2;
    //get order
    const query3 = knex('transactions').where({transaction_id: result2[0].recentOrder});
    console.log('Raw query for getOrder:', query3.toString());
    const result3 = await query3;
    return result3;
}
//get product by cart
const fetchCartProducts = async (user_id) => {
    //return product
    const query = knex('cart').join('product','product_id','cart.product_id').select().where({customer_id:user_id});
    console.log('Raw query for getProduct:', query.toString());
    const result = await query;
    return result;
};

module.exports = {
    createCart,
    fetchProductByID,
    createOrder,
    fetchCartProducts
};