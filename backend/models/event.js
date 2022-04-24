const knex = require('../database/knex');

const EVENT_TABLE = 'event';

const getFarmEvents = async (farmer_id) => {
    const query = knex(EVENT_TABLE).select().where('farmer_id', farmer_id);
    return query;
}


module.exports = {
    getFarmEvents
};