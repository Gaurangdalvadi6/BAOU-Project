import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/signup', userData),
};

// Customer API
export const customerAPI = {
  getAllCars: () => api.get('/customer/cars'),
  getCarById: (id) => api.get(`/customer/car/${id}`),
  bookCar: (bookingData) => api.post('/customer/car/book', bookingData),
  getBookings: (userId) => api.get(`/customer/car/bookings/${userId}`),
  searchCars: (searchData) => api.post('/customer/car/search', searchData),
};

// Admin API
export const adminAPI = {
  getAllCars: () => api.get('/admin/cars'),
  getCarById: (id) => api.get(`/admin/car/${id}`),
  createCar: (carData) => {
    // For multipart form data, we need to set the correct headers
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/admin/car', carData, config);
  },
  updateCar: (id, carData) => {
    // For multipart form data, we need to set the correct headers
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.put(`/admin/car/${id}`, carData, config);
  },
  deleteCar: (id) => api.delete(`/admin/car/${id}`),
  getBookings: () => api.get('/admin/car/bookings'),
  changeBookingStatus: (bookingId, status) => 
    api.get(`/admin/car/booking/${bookingId}/${status}`),
  searchCars: (searchData) => api.post('/admin/car/search', searchData),
};

export default api;