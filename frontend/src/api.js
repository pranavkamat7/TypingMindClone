import axios from 'axios';


const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`, // Backend base URL
});

export default api;
