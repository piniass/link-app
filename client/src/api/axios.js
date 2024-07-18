import axios from "axios";

const instance = axios.create({
    baseURL: 'https://link-app-back.vercel.app/api',
    withCredentials: true
})

export default instance