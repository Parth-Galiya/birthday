import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const client = axios.create({ baseURL: API_BASE });

export const api = {
  createBirthday: (data) => client.post('/birthday', data),
  getBirthday: (id) => client.get(`/birthday/${id}`),
};
