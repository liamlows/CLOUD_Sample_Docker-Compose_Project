const knex = require('../database/knex');

//Get all transactions by user
const fetchTransactions = async (user_id) => {
    const query = knex('transactions').where({farmer_id: user_id}).orWhere({customer_id: user_id});
    const result = await query;
    return result;
}
//get transaction by ID
const fetchTransactionByID = async (transaction_id) => {
    //return transaction
    const query = knex('transactions').where({transaction_id});
    console.log('Raw query for getTransaction:', query.toString());
    const result = await query;
    return result;
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
const deleteInterestedEvent = async (customer_event_interests_id) => {
    const query = knex('customer_event_interests').where({customer_event_interests_id}).del();
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

module.exports = {
    fetchTransactions,
    fetchTransactionByID,

    fetchMostCommonCustomers,

    fetchInterestedEvents,
    deleteInterestedEvent,
    deleteAllInterestedEvents
};