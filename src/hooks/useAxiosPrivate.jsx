

import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: 'http://localhost:3000', 
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`, 
        'Content-Type': 'application/json' 
    }
});

const useAxiosPrivate = () => {
   return axiosPrivate;
};

export default useAxiosPrivate;
