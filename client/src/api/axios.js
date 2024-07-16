import axios from "axios";

const instance = axios.create({
    baseURL: 'https://linkeados-backend.vercel.app/api/',
    withCredentials: true
})

export default instance