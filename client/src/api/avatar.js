import axios from "./axios";

export const createAvatarRequest = (link) => axios.put('/images', link)
export const getAvatarRequest = (id) => axios.get(`/images/${id}`)
