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
        url: `${BASE_URL}/users/edit-user/${id}`,
        data: playload
      });
}

const deleteUserById = (id)=>{
    return axios({
        method: 'delete',
        url: `${BASE_URL}/users/delete-user/${id}`
      });
}

const getUserCreatedPolls = (id)=>{
    return axios({
        method: 'get',
        url: `${BASE_URL}/users/show-created-polls/${id}`
      });
}

const cancelVote = (id, pollId)=>{
    return axios({
        method: 'delete',
        url: `${BASE_URL}/users/cancel-vote/${id}/${pollId}`
      });
}

const votePoll = (id, pollId,playload)=>{
  return axios({
      method: 'post',
      url: `${BASE_URL}/users/vote-poll/${id}/${pollId}`,
      data: playload
    });
}

export default {getAllUsers, getUserById, editUser, deleteUserById, getUserCreatedPolls, cancelVote, votePoll}