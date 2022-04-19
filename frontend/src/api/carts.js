// calls to add items to user carts

import axios from "axios"
import apiURL from "./APIURL"

const apiEndpoint = apiURL + "carts"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

//expected return, list of items user has added to their cart
const getCart = (userId) => {
    axios.get(`${apiEndpoint}/${userId}`);
}

const deleteItemFromCart = (userId, itemId) =>{
    axios.delete(`${apiEndpoint}/${userId}/${itemId}`)
}

// create an order from the items in the carts
// should remove the purchased # from the stock total of the item being bought
// should create seperate orders for items belonging to different farms
const checkout = (userId) =>{
    axios.post(`${apiEndpoint}/${userId}`);
}