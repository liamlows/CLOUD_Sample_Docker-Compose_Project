const knex = require('../database/knex');

const PRODUCT_TABLE = 'product';
const FARM_TABLE = 'farmer';
const EVENT_TABLE = 'event';

const createNewProduct = async (product_name, product_price, product_stock, product_category, product_description,product_image_url, farmer_id) => {
    const query = knex(PRODUCT_TABLE).insert({product_name, product_price, product_stock, product_category, product_description, product_image_url, farmer_id});
    return query;
}

const updateProduct = async (product_id, product_name, product_price, product_stock, product_category, product_description,product_image_url, farmer_id) =>{
    const query = knex(PRODUCT_TABLE).where('product_id', product_id).update({product_name}).update({product_price}).update({product_stock}).update({product_category}).update({product_description}).update({product_image_url}).update({farmer_id});
    return query;
}

const deleteProduct = async (product_id) => {
    const query = knex(PRODUCT_TABLE).where('product_id', product_id).del();
    return query;
}

const getProductsAllFilters = async(farm_id, product_category, product_name)=>{
    const result = knex(PRODUCT_TABLE).select().whereIn('product.farmer_id', farm_id).whereIn('product_category', product_category).where('product_name', 'like', product_name);
    return result;
}

const getProductThroughFarmNameCategory = async(farm_id, product_category)=>{
    const result = knex(PRODUCT_TABLE).select().whereIn('product.farmer_id', farm_id).whereIn('product_category', product_category);
    return result;
}

const getThroughFarmNameProductName = async(farm_id, product_name)=>{
    const result = knex(PRODUCT_TABLE).select().whereIn('product.farmer_id', farm_id).where('product_name','like', product_name);
    return result;
}

const getProductThroughCategoryName = async(product_category, product_name)=>{
    const result = knex(PRODUCT_TABLE).select().whereIn('product_category', product_category).where('product_name','like', product_name);
    return result;
}//

const getProductThroughCategory = async(product_category)=>{
    const result = knex(PRODUCT_TABLE).select().whereIn('product_category', product_category);
    return result;
}//

const getProductThroughName = async( product_name)=>{
    const result = knex(PRODUCT_TABLE).select().where('product_name','like', product_name);
    return result;
}//

const getProductThroughFarmName = async(farmer_id) => {
    const result = knex(PRODUCT_TABLE).select().whereIn('product.farmer_id', farmer_id);
    return result;
}

const getProductThroughFarmID = async(farmer_id) => {
    const result = knex(PRODUCT_TABLE).select().where('product.farmer_id', farmer_id);
    return result;
}


const getAvailableProducts = async() => {
    const result = knex(PRODUCT_TABLE).select().where('product_stock', '>', 0);
    return result;
}//

module.exports = {
    createNewProduct,
    deleteProduct,
    getProductThroughFarmName,
    getProductThroughCategory,
    getProductThroughName,
    getAvailableProducts,
    getProductsAllFilters,
    getProductThroughCategoryName,
    getThroughFarmNameProductName,
    getProductThroughFarmNameCategory,
    updateProduct,
    getProductThroughFarmID
};