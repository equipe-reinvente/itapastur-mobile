import axios from 'axios';

const SSApi = axios.create({
    baseURL: "https://presently-enabled-monkey.ngrok-free.app",
})

export default SSApi;