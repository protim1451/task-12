

import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: 'https://b9a12-server-side-protim1451.vercel.app', 
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`, 
        'Content-Type': 'application/json' 
    }
});

const useAxiosPrivate = () => {
   return axiosPrivate;
};

export default useAxiosPrivate;
