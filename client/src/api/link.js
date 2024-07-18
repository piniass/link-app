import axios from "./axios";

export const getLinksRequest = () => axios.get('/link', { withCredentials: true })
export const getLinkRequest = () => axios.get(`/link/${link._id}`, { withCredentials: true })
export const createLinkRequest = (link) => axios.post('/link', link, { withCredentials: true })
export const updateLinkRequest = (link, id) => axios.put(`/link/${id}`, link, { withCredentials: true })
export const deleteLinkRequest = (id) => axios.delete(`/link/${id}`, { withCredentials: true })