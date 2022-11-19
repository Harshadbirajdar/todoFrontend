import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../config";


const AxiosInstances = axios.create({
    baseURL: API,
});

AxiosInstances.interceptors.response.use((response) => response, (error) => {
    if (error.response.data.success == false) {
        let message = error.response.data.message
        message ? toast.error(message) : toast.error("Something went wrong")
    } else {
        console.log(error);
        toast.error("Something went wrong")
    }
    throw error;
});

export default AxiosInstances;