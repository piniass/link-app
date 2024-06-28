import axios from "./axios";

export const getLinksRequest = () => axios.get('/link')
export const getLinkRequest = () => axios.get(`/link/${link._id}`)
export const createLinkRequest = (link) => axios.post('/link', link)
export const updateLinkRequest = (link, id) => axios.put(`/link/${id}`, link)
export const deleteLinkRequest = (id) => axios.delete(`/link/${id}`)