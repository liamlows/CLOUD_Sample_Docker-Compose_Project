// This is used to edit the items belonging to farms

import apiURL from "./APIURL"
import axios from "axios"
const apiEndpoint = apiURL + "farms"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}




export const getFarmItems = (farmId, params) => {
    let _apiConfig = apiConfig;
    if(params) {
        _apiConfig.params = params;
    }
    axios.get(`${apiEndpoint}/${farmId}/items`, _apiConfig)
}

export const addItemToFarm = (farmId, itemDetails) => {
    axios.post(`${apiEndpoint}/${farmId}/items`, {farmId, itemDetails}, apiConfig)
}
export const editFarmItem = (farmId, itemId, data) => {
    axios.patch(`${apiEndpoint}/${farmId}/items/${itemId}`, {farmId, itemId, data}, apiConfig)
}

export const deleteItemFromFarm = (farmId, itemId) => {
    axios.delete(`${apiEndpoint}/${farmId}/items/${itemId}`, apiConfig)
}