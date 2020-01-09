import axios from 'axios';

function Interceptor(): null {
    axios.interceptors.response.use(res => {
        console.log('响应:', res.config.url, res)
        return res.data
    })
    return null;
}

export default Interceptor;
