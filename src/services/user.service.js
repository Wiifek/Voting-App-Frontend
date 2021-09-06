import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAllUsers = ()=>{
    return axios({
        method: 'get',
        url: `${BASE_URL}/users/`
      });
}

const getUserById = (id)=>{
    return axios({
        method: 'get',
        url: `${BASE_URL}/users/${id}`
      });
}

const editUser = (id, playload)=>{
    return axios({
        method: 'put',
        url: `${BASE_URL}/users/edituser/${id}`,
        data: playload
      });
}

const deleteUserById = (id)=>{
    return axios({
        method: 'delete',
        url: `${BASE_URL}/users/deleteuser/${id}`
      });
}

const getUserTickets = (id)=>{
    return axios({
        method: 'get',
        url: `${BASE_URL}/users/showtickets/${id}`
      });
}

const cancelUserTicket = (id, ticketId)=>{
    return axios({
        method: 'delete',
        url: `${BASE_URL}/users/cancelticket/${id}/${ticketId}`
      });
}

export default {getAllUsers, getUserById, editUser, deleteUserById, getUserTickets, cancelUserTicket}