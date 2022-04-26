const knex = require('../database/knex');

const EVENT_TABLE = 'event';
const USER_EVENT_TABLE = 'customer_event_interests';

const getFarmEvents = async (farmer_id) => {
    const query = knex(EVENT_TABLE).select().where('farmer_id', farmer_id);
    return query;
}


const createEvent = async (event_name, event_description, event_image_url, farmer_id, date, time) => {
    const query = knex('event').insert({ event_name, event_description, event_image_url, farmer_id, date, time });
    console.log('Raw query for createEvent:', query.toString());
    const result = await query;
    return result;
};

const deleteUserInterestedEvents = async(event_id)=>{
    const result = knex('customer_event_interests').where({event_id}).del();
    return result;
}

const getUsersInterestedEvents = async (user_id) => {
//SELECT customer_event_interests.event_id, event.event_name,event.event_description, event.event_image_url, event.farmer_id, event.date, event.time FROM customer_event_interests JOIN event ON event.event_id = customer_event_interests.event_id WHERE customer_id = 2;
    const query = knex('customer_event_interests').join('event','event.event_id','customer_event_interests.event_id').select().where({customer_id: user_id});
    return query;
}
const getAllUserEvents = async(user_id) =>{
    const query = knex(USER_EVENT_TABLE).select();
    return query;
}

const signUserForEvent = async(user_id, event_id) => {
    const result = knex(USER_EVENT_TABLE).insert({event_id, customer_id: user_id});
    return result;
}
//edit event
const updateEvent = async(event_id, event_name,event_description, event_image_url,farmer_id,date,time) => {
    const query = knex(EVENT_TABLE).where('event_id', event_id).update({event_name}).update({event_description}).update({event_image_url}).update({farmer_id}).update({date}).update({time});
    return query;
}
//find event by name
const findEventByName = async (event_name) => {
    const query = knex('event').where({ event_name });
    const result = await query;
    return result;
}

//find event by date
const findEventByDate = async (date) => {
    const query = knex('event').where({ date });
    const result = await query;
    return result;
}
//delete event
const deleteEvent = async (event_id) => {
    const query = knex('event').where({event_id}).del();
    console.log('Raw query for delete event:', query.toString());
    const result = await query;
    return result;
};




module.exports = {

    createEvent,
    findEventByName,
    findEventByDate,
    deleteEvent,
    updateEvent,
    getFarmEvents,
    getUsersInterestedEvents,
    getAllUserEvents,
    signUserForEvent,
    deleteUserInterestedEvents
};
