const knex = require('../database/knex');

//Get all transactions by user
const fetchTransactions = async (user_id) => {
    //get transactions by user
    const query = knex('transactions').where({customer_id: user_id});
    const result = await query;
    //get transaction + products for each transaction
    var transactions = [];
    for(let i=0;i<result.length;i++){
        const txn = await fetchTransactionWithProducts(result[i].transaction_id);
        transactions.push(txn);
    }
    return transactions;
};
//get most common customers    //untested
const fetchMostCommonCustomers = async (farmer_id) => {
    //return transaction
    const query = knex('transactions').select().where({farmer_id}).groupBy(customer_id).orderBy(name,desc).limit(3);
    console.log('Raw query for fetchMostCommonCustomerTransaction:', query.toString());
    const result = await query;
    return result;
};

//Get all interested events by customer
const fetchInterestedEvents = async (user_id) => {
    const query = knex('customer_event_interests').join('event','event.event_id','customer_event_interests.event_id').select().where({customer_id: user_id});
    const result = await query;
    return result;
}
//delete interested events
const deleteInterestedEvent = async (event_id,customer_id) => {
    const query = knex('customer_event_interests').where({event_id}).andWhere({customer_id}).del();
    console.log('Raw query for delete interested event:', query.toString());
    const result = await query;

    return result;
};
//delete interested events
const deleteAllInterestedEvents = async (customer_id) => {
    const query = knex('customer_event_interests').where({customer_id}).del();
    console.log('Raw query for delete all interested events:', query.toString());
    const result = await query;

    return result;
};
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
    fetchTransactions,
    fetchTransactionWithProducts,
    fetchMostCommonCustomers,
    fetchInterestedEvents,
    deleteInterestedEvent,
    deleteAllInterestedEvents
};