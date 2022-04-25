const knex = require('../database/knex');


const FARM_TABLE = 'farmer';

//create new farm
const createFarm = async (farm_id,farm_name, farmer_id, farm_picture, farm_description, farm_rating, date_founded) => {
    //add farm to table
    const query = knex('event').insert({farm_id,farm_name, farmer_id, farm_picture, farm_description, farm_rating, date_founded});
    console.log('Raw query for createFarm:', query.toString());
    const result = await query;
    return result;
};
//find farm by name
const findFarmByName = async (farm_name) => {
    const query = knex('farm').where({ farm_name });
    const result = await query;
    return result;
}
//find farm by ID
const findFarmByID = async (farmer_id) => {
    const query = knex('farm').where({ farmer_id });
    const result = await query;
    return result;
}
// find farm rating by farm ID
const findFarmRatingByFarmID = async(farmer_id) => {
    const result = knex(FARM_TABLE).select(farm_rating).where('farmer_id', farmer_id);
    return result;
}
// find farm establish year by farm ID
const findFarmEstablishedByFarmID = async(farm_id) => {
    const result = knex(FARM_TABLE).select(date_founded).where('farmer_id', farmer_id);
    return result;
}

//delete farm
const deleteFarm = async (farm_name) => {
    const query = knex('event').where({farm_name}).del();
    console.log('Raw query for delete farm:', query.toString());
    const result = await query;
    return result;
};

const getFarmInformation = async(farm_id) =>{
    const query = knex('farmer').select().where('farmer_id', farm_id);
    return query;
};

const updateFarmInformation = async(farmer_id, farm_name, farm_description, farm_image_url, date_founded) => {
    const result = knex(FARM_TABLE).where('farmer_id', farmer_id).update({farm_name}).update({farm_description}).update({farm_image_url}).update({date_founded});
    return result;
};



module.exports = {

    getFarmInformation,
    createFarm,
    findFarmByName,
    findFarmByID,
    findFarmRatingByFarmID,
    findFarmEstablishedByFarmID,
    deleteFarm,
    updateFarmInformation
};