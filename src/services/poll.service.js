import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAllPolls = ()=>{
    return axios({
        method: 'get',
        url: `${BASE_URL}/polls/`
      });
}

const addPoll = (playload)=>{
  return axios({
      method: 'post',
      url: `${BASE_URL}/polls/add-poll`,
      data: playload
    });
}

const getPollById = (id)=>{
  return axios({
      method: 'get',
      url: `${BASE_URL}/polls/${id}`
    });
}

const editPoll = (id, playload)=>{
  return axios({
      method: 'put',
      url: `${BASE_URL}/polls/edit-poll/${id}`,
      data: playload
    });
}

const deletePoll = (id)=>{
  return axios({
      method: 'delete',
      url: `${BASE_URL}/polls/delete-poll/${id}`
    });
}

const getPollVoters = (id)=>{
  return axios({
      method: 'get',
      url: `${BASE_URL}/polls/show-poll-voters/${id}`
    });
}


export default {getAllPolls, addPoll, editPoll, deletePoll, getPollById, getPollVoters}