import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export const fetchMenu = () => API.get('/menu');
export const createOrder = (orderData) => API.post('/orders', orderData);
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users', formData);
export const getMyOrders = (token) => API.get('/orders/myorders', { headers: { Authorization: `Bearer ${token}` } });
export const getCoupons = () => API.get('/coupons');

export default API;
