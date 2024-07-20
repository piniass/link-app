import axios from "./axios";


export const registerRequest = user => axios.post('/register', user, { withCredentials: true });

export const loginRequest = user => axios.post('/login', user, { withCredentials: true });

export const editRequest = user => axios.put('/edit', user, { withCredentials: true });

export const verifyTokenRequest = () => axios.get('/auth/verify', {
  withCredentials: true
});

export const getInfo = () => axios.get('/profile', { withCredentials: true });

export const putImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.put('/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response; // Asegúrate de retornar la respuesta o manejarla según sea necesario
  } catch (error) {
    throw error; // Lanza el error para manejarlo en la función llamante
  }
};
