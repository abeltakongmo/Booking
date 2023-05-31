import axios from "axios";

const baseURL = import.meta.env.VITE_PROD_BASE_URL;

const _axios = axios.create({ baseURL });

// load categories
export const loadCategories = () => _axios.get(`/api/types`);
