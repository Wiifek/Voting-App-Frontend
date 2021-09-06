import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const login = (playload)=>{
    return axios({
        method: 'post',
        url: `${BASE_URL}/login`,
        data: playload
      });
}

const register = (playload)=>{
    return axios({
        method: 'post',
        url: `${BASE_URL}/register`,
        data: playload
      });
}


const isExpired=(token)=>{
  const decoded = jwt_decode(token)
  if(!decoded)
    return false
  else {
    const currentDate = Date.now();
    const tokenDate = decoded.exp;
    if(tokenDate < currentDate) return true
    else return false;
  }
}

const isAuthentificated = ()=>{
  const token = localStorage.getItem('token')
  if(token)
    return isExpired(token)
  else return false
}

const currentUser = (token)=>{
  const decoded = jwt_decode(token)
  if(!decoded)
    return false
  else {
    const user = decoded.user_id;
    return user;
  }
}

export default {login, register, isAuthentificated, currentUser}