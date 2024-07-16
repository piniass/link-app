import axios from "./axios";

export const registerRequest = user => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const editRequest = user => axios.put(`/edit`, user);
export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
export const getInfo = () => axios.get('/profile')
export const putImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
  
      const response = await axios.put('/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
    } catch (error) {
      throw error; // Lanza el error para manejarlo en la función llamante
    }
  };