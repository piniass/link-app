import axios from "axios";

const instance = axios.create({
    baseURL: 'https://linkeados-server.vercel.app/api/',
    withCredentials: true
})

export default instance