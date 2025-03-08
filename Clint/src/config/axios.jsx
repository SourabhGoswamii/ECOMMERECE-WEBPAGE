import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5500/api/v1',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})


export default axiosInstance;   