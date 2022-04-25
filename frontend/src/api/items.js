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

export const getItems = (params) => {
    let _apiConfig = apiConfig;
    if (params) {
        _apiConfig.params = params;
    }
    axios.get(`${apiEndpoint}/`, apiConfig)
}

export const addItemToFarm = (itemDetails) => {
    console.log(itemDetails);
    return axios.post(`${apiEndpoint}/`, itemDetails)
}
export const editFarmItem = (itemDetails) => {
    return axios.put(`${apiEndpoint}/${itemDetails.product_id}`, 
        itemDetails
    , apiConfig)
}

export const deleteItemFromFarm = (itemId) => {
    return axios.delete(`${apiEndpoint}/${itemId}`, apiConfig)
}