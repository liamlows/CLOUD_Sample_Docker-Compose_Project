// these are used to change the database of generic items a farmer can add to their farm

// This is used to edit the items belonging to farms

const apiEndpoint = apiURL + "farms/items"
const apiConfig = {
    headers: {
        Authorization: "admin"
    }

}

//MAke sure the farmer can't add the same item twice, it hsould update stock ?

//get all items, Used for adding items to farms
export const getItems = () => {
    let _apiConfig = apiConfig;
    if(params) {
        _apiConfig.params = params;
    }
    axios.get(`${apiEndpoint}/`, apiConfig)
}

export const addItemToFarm = (farmId, itemId) => {
    axios.post(`${apiEndpoint}/`, {farmId, itemId}, apiConfig)
}
export const editFarmItem = (farmId, itemId, data) => {
    axios.patch(`${apiEndpoint}/`, {farmId, itemId, data}, apiConfig)
}

export const deleteItemFromFarm = (farmId, itemId) => {
    axios.delete(`${apiEndpoint}/`, {farmId, itemId}, apiConfig)
}