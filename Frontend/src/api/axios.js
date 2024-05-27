import axios from 'axios'

const axio = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

export default axio