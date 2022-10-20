import axios from "axios";

const http = axios.create({
    baseURL:'/api',
    timeout:10000, 


})

http.interceptors.request.use(function(config) {
    return config;
},function(erro){
    return Promise.reject(erro)
})


http.interceptors.response.use(function(response) {
    return response;
},function(erro){
    return Promise.reject(erro)
})

export default http