const knex = require('../db/knex');


const PRODUCT_TABLE = 'product';

const createNewProduct = async (product_id, product_name, product_price, product_stock, product_description, farmer_id, farm_name) => {
    const query = knex(PRODUCT_TABLE).insert({product_id, product_name, product_price, product_stock, product_description, farmer_id, farm_name});
    return query;
}

const deleteProduct = async (product_id) => {
    const query = knex(PRODUCT_TABLE).where('product_id', product_id).del();
    return query;
}

const getProductThroughFarmName = async(farm_name) => {
    const result = knex(PRODUCT_TABLE).select().where('farm_name', farm_name);
    return result;
}

const getProductThroughFarmID = async(farmer_id) => {
    const result = knex(PRODUCT_TABLE).select().where('farmer_id', farmer_id);
    return result;
}

const getAvailableProducts = async() => {
    const result = knex(PRODUCT_TABLE).select.where('stock', '>', 0);
    return result;
}

module.exports = {
    createNewProduct,
    deleteProduct,
    getProductThroughFarmName,
    getProductThroughFarmID,
    getAvailableProducts
};