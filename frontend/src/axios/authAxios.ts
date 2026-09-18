import axios from 'axios';
import { auth } from '../firebase/firebase';

const authAxios = axios.create();

// automatically attach a fresh Firebase ID token to every request
authAxios.interceptors.request.use(async (config) => {
    const token = await auth.currentUser?.getIdToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default authAxios;
