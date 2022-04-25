// these are used to change the database of generic items a farmer can add to their farm
import apiURL from "./APIURL"
import axios from "axios"
// This is used to edit the items belonging to farms

const apiEndpoint = apiURL + "products"
const apiConfig = {
    headers: {
        Authorization: "admin"
    }

}

//MAke sure the farmer can't add the same item twice, it hsould update stock ?

//get all items, Used for adding items to farms
export const getItems = () => {
    let _apiConfig = apiConfig;
    if (params) {
        _apiConfig.params = params;
    }
    axios.get(`${apiEndpoint}/`, apiConfig)
}

export const addItemToFarm = (itemDetails) => {
    return axios.post(`${apiEndpoint}/`, {
        product_name: itemDetails.name,
        product_price: itemDetails.price,
        product_stock: itemDetails.stock,
        product_category: "Fruit",
        product_description: itemDetails.itemDescription,
        product_image_url: itemDetails.image,
        farmer_id: itemDetails.farmId
    }, apiConfig)
}
export const editFarmItem = (itemDetails) => {
    return axios.post(`${apiEndpoint}/itemId`, {
        product_name: itemDetails.name,
        product_price: itemDetails.price,
        product_stock: itemDetails.stock,
        product_category: "Fruit",
        product_description: itemDetails.itemDescription,
        product_image_url: itemDetails.image,
        farmer_id: itemDetails.farmId
    }, apiConfig)
}

export const deleteItemFromFarm = (itemId) => {
    return axios.delete(`${apiEndpoint}/search/${itemId}`, apiConfig)
}