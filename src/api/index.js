//前端接口连接后端处
import axios from "axios";
const baseURL = '/api';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("api请求数据",config);
    //请求地址
    config.url =baseURL+ config.url;

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("api响应数据",response);
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
  //接口后端==前端
  //查询
  export const getData= ()=>{
    return axios.get('/main');
  }
  //查询：审核员 相关权限配置
  export const main_authority= ()=>{
    return axios.get('/main_authority');
  }
  //查询：权限分配表audit_authority
  export const audit_authority= ()=>{
    return axios.get('/audit_authority');
  }
