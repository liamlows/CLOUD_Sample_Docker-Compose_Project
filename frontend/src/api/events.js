import apiURL from "./APIURL"
import axios from "axios";
const apiEndpoint = apiURL + "events"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

//create an new event, should have a farmId(get the farm name with the id and store it in the record), title, description, a time, and an image
export const createEvent = (info) => {

    axios.post(`${apiEndpoint}/`, info, apiConfig)

}
// get a specific event info, should return (title, description, location, time, image)
export const getEventById = (id) => {
    axios.get(`${apiEndpoint}/${id}`, apiConfig)
}

// update event info
export const updateEventById = (eventInfo, id) => {
    axios.patch(`${apiEndpoint}/${id}`, eventInfo, apiConfig)
}


export const deleteEventById = (id) => {
    axios.delete(`${apiEndpoint}/${id}`, apiConfig)

}


