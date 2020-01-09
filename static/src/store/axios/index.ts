import axios from 'axios';

axios.defaults.timeout = 5000;
axios.interceptors.response.use(res => {
    console.log('响应:', res.config.url, res)
    return res.data
})

export default axios