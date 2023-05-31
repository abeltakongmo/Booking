import axios from "axios";

const baseURL = import.meta.env.VITE_PROD_BASE_URL;

const _axios = axios.create({ baseURL });

// auth
export const login = (creds) =>
  _axios.post(`/api/auth/login`, {
    username: creds.username,
    password: creds.password,
  });
export const register = (creds) =>
  _axios.post(`/api/auth/register`, {
    username: creds.username,
    email: creds.email,
    password: creds.password,
  });

// load categories
export const loadCategories = () => _axios.get(`/api/types`);
export const loadRentItems = () => _axios.get(`/api/items`);
