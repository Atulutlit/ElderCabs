import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${Cookies.get('elder_cabs_admin')}`,
    }
});

export default instance;