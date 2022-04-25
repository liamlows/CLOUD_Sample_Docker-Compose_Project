const knex = require('../database/knex');

const EVENT_TABLE = 'event';
const USER_EVENT_TABLE = 'customer_event_interests';

const getFarmEvents = async (farmer_id) => {
    const query = knex(EVENT_TABLE).select().where('farmer_id', farmer_id);
    return query;
}

const getUsersInterestedEvents = async (user_id) => {
    console.log(user_id);
//SELECT customer_event_interests.event_id, event.event_name,event.event_description, event.event_image_url, event.farmer_id, event.date, event.time FROM customer_event_interests JOIN event ON event.event_id = customer_event_interests.event_id WHERE customer_id = 2;
    const query = knex('customer_event_interests').join('event','event.event_id','customer_event_interests.event_id').select().where({customer_id: user_id});
    return query;
}
const getAllUserEvents = async(user_id) =>{
    const query = knex(USER_EVENT_TABLE).select();
    return query;
}


module.exports = {
    getFarmEvents,
    getUsersInterestedEvents,
    getAllUserEvents
};