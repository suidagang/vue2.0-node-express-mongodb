import axios from 'axios';
import router from './../router'
//处理post请求请求参数为From Data的情况
import qs from 'qs';
import { MessageBox  } from 'element-ui';

axios.defaults.timeout = 20000;
//axios.defaults.baseURL ='http://iot.ideyee.com';
// axios.defaults.baseURL ='http://localhost:3000';

//http request 拦截器(请求前的拦截 做公交加token等操作)
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        // const token = this.$cookie.get('userId');
        config.data = config.data;
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        };
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器(请求成功的统一处理，比如后台返回code=10001 就表示没登录跳转商品列表页面)
axios.interceptors.response.use(
    response => {
        if(response.data.status == '10001'){
            console.log("拦截到没登录");
            MessageBox('未登录', '温馨提示', {
                confirmButtonText: '确定',
            }).then(()=>{
                console.log("确定按钮后的操作");
                router.push({
                    path: '/',
                    query: {redirect: router.currentRoute.fullPath}
                });
            }).catch((err)=>{
                console.log(err);
            });
        }else if(response.data.status != '0'){
            MessageBox(response.data.msg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                
                }
            });
        };
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
                params:params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,qs.stringify(data))
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}
