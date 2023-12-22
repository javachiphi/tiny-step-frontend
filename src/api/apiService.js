import axios from 'axios';
import { BACKEND_URL } from '../constants.js';

const getHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});


export const fetchData = async (endpoint, token) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/${endpoint}`, getHeaders(token));
        return response.data;
    } catch (error) {
        console.error(error);
    }
};



export const createData = async (endpoint, data, token) => {
    console.log('received data', data)
    try {
        const response = await axios.post(`${BACKEND_URL}/${endpoint}`, data , getHeaders(token));
        console.log('response data', response.data)
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// export const updateData = async (endpoint, data, token) => {
   
//     try {
//         const response = await axios.put(`${BACKEND_URL}/${endpoint}`, {data}, getHeaders(token));
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const deleteData = async (endpoint, data, token) => {
//     try {
//         await axios({
//             url: `${BACKEND_URL}/${endpoint}`,
//             method: 'delete',
//             data: data,
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         })
//     } catch (error) {
//         throw error;
//     }
// };


