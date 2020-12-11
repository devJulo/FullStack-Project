import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
        const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
        const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const delt = (id, personObject) => {
        const url = baseUrl + id
        const request = axios.delete(url, personObject)
    return request.then(() => getAll())
}        

const update = (id, personObject) => {
        const url = baseUrl + id
        const request = axios.put(url, personObject)
    return (request.then(response => response.data))
}

export default {getAll, create, delt, update}