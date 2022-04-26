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
const createOrder = async (firstName, lastName, address, city, state, zip, cardName, cardNumber, cardExprDate, farmer_id, customer_id) => {
    //add order to table
    const query = knex('transactions').insert({ firstName, lastName, address, city, state, zip, cardName, cardNumber, cardExprDate, farmer_id, customer_id });
    console.log('Raw query for createOrder:', query.toString());
    const result = await query;
    console.log('result:',result);
    //get most recent order number
    const query2 = knex('transactions').max('transaction_id', {as: 'recentOrder'});
    console.log('Raw query for getOrder:', query2.toString());
    const result2 = await query2;
    //get order
    const query3 = knex('transactions').where({transaction_id: result2[0].recentOrder});
    console.log('Raw query for getOrder:', query3.toString());
    const result3 = await query3;
    //get products from cart
    const query4 = knex('cart').where({customer_id});
    console.log('Raw query for getCart:', query4.toString());
    const result4 = await query4;
    //add products to transaction
    for(let i=0;i<result4.length;i++){
        //add to transaction products
        const query0 = knex('transaction_products').insert({ transaction_id: result2[0].recentOrder, product_id: result4[i].product_id, quantity: result4[i].quantity});
        console.log('Raw query for addProductsToTransaction:', query0.toString());
        const result0 = await query0;
        //get product
        const product_query = knex('product').where({product_id: result4[i].product_id});
        console.log('Raw query for getCart:', product_query.toString());
        const products = await product_query;
        //update product inventory
        const newInventory = products[0].product_stock - result4[i].quantity;
        const inventory_query = knex('product').where({product_id: result4[i].product_id}).update({product_stock:newInventory});
        console.log('Raw query for updateProductInventory:', inventory_query.toString());
        const inventory_result = await inventory_query;
    }
    //remove products from cart
    const query5 = knex('cart').where({customer_id}).del();
    console.log('Raw query for deleteCart:', query5.toString());
    const result5 = await query5;
    //get transaction products FIX
    const result6 = await fetchTransactionWithProducts(result2[0].recentOrder);
    return result6;
}
//get product by cart
const fetchCartProducts = async (customer_id) => {
    //return product
    const query = knex('cart').join('product','product.product_id','cart.product_id').select().where({customer_id});
    console.log('Raw query for getProduct:', query.toString());
    const result = await query;
    return result;
};
//clear cart
const clearCart = async (customer_id) => {
    const query = await knex('cart').where({customer_id}).del();
    console.log('Raw query for clearCart:', query.toString());
    return null;
}
//delete item from cart
const deleteCartProduct = async (product_id,customer_id) => {
    const query = knex('cart').where({product_id}).andWhere({customer_id}).del();
    console.log('Raw query for deleteCartProdcut:', query.toString());
    const result = await query;

    return result;
};
//update cart quantity
const updateCartQuantity = async (product_id,customer_id,quantity) => {
    const query = await knex('cart').where({product_id}).andWhere({customer_id}).update({quantity});
    console.log('Raw query for deleteCartProdcut:', query.toString());
    const result = await query;
    return null;
}
//get transaction with products
const fetchTransactionWithProducts = async (transaction_id) => {
    //get order
    const query1 = knex('transactions').where({transaction_id});
    console.log('Raw query for getTransaction:', query1.toString());
    const result1 = await query1;
    //return product
    const query2 = knex('transaction_products').join('product','product.product_id','transaction_products.product_id').select().where({transaction_id});
    console.log('Raw query for getProduct:', query2.toString());
    const result2 = await query2;
    return {result1, result2};
};

module.exports = {
    createCart,
    fetchProductByID,
    createOrder,
    fetchCartProducts,
    clearCart,
    deleteCartProduct,
    updateCartQuantity,
    fetchTransactionWithProducts
};