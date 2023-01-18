import axios from "axios";
import { environment } from "src/environments/environment";

const { baseURL } = environment
const axiosInstance = axios.create({
    baseURL
});

axiosInstance.interceptors.response.use(({data}) => data);

export default axiosInstance;