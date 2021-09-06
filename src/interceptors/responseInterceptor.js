import axios from "axios";

const createResponseInterceptor  = (history)=>{
    // console.log(history)
    const responseInterceptor = axios.interceptors.response.use(
        response=>{
            return response
        },
        error=>{
            if(error.response.status === 401){
                //redirect to sign in & clear token
                localStorage.removeItem('token')
                history.push("/sign-in")
            }
            if(error.response.status === 404){
                //redirect to 404
                history.push("/404")
            }
            if(error.response.status === 500){
                //redirect to 500
                history.push("/500")
            }
            return Promise.reject(error)
        }
    )
}

export default createResponseInterceptor;