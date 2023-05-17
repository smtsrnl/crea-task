import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("api_token") || localStorage.getItem("api_token")}`
    }
})