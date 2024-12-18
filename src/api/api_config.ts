import axios from 'axios'
import { BASE_URL } from "src/constants/baseUrl";
import { store } from "src/redux/store";




const TIME_OUT = 60000


export const publicAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: TIME_OUT
});


export const protectedAxios = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "application/json"
    },
    timeout: TIME_OUT
});


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
},
  timeout: TIME_OUT
})
axiosInstance.interceptors.request.use(
  function (config){
    // console.log('config instance', config)
    return config
    
},
function (error){
    console.log('loi request')
    return Promise.reject(error)
}
)
axiosInstance.interceptors.response.use(
  function (response) {
    console.log('response axios instance', response)
    const responseObj = {
        ...response,
        statusCode: response.status,
    };

    return responseObj;
},
function (error) {
  const statusCode = error
  console.log('error axios instance', error.message)
    // const statusCode = error.response.data
    if (error.response && error.response.status === 400) {
       
    }
    return statusCode;
}
)

publicAxios.interceptors.request.use(
    function (config){
        return config
        
    },
    function (error){
        console.log('loi request')
        return Promise.reject(error)
    }
);

publicAxios.interceptors.response.use(
    function (response) {
      
        const responseObj = {
            ...response.data,
            statusCode: response.status,
        };
        // console.log('response api', responseObj)
        return responseObj;
    },
    function (error) {

        const statusCode = error.response.data
        if (error.response && error.response.status === 400) {
           
        }
        return statusCode;
    }
);

protectedAxios.interceptors.request.use(
    function (config) {
      const accessToken = store.getState().user?.accessToken;
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
     
      }
  
      return config;
    },
    function (error) {
      
      return Promise.reject(error);
      
    }
  );
  
  protectedAxios.interceptors.response.use(
    function (response: any) {
      
      const responseObj = {
        ...response.data,
        statusCode: response.status,
      };
      // console.log('vào congif API', responseObj)
      return responseObj;
    },
    function (error): number {
      console.log('loi trong function Axios Error', error)
      // console.log('Status code 400 error:', error.response);
        const statusCode = error.response
      if(error?.response?.status == statusCode){
        // store.dispatch(removeUser());
        // RootNavigation.navigate(SCREENS.LOGIN)
      } else if (error.response && error.response.status === 400) {
        console.log('Status code 400 error:', error.response.data);
        console.log('Status code 400 error:', error.response.errors);
    }
      return statusCode;
    }
  );

