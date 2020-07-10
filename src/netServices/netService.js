import axios from 'axios'
import util from '@/utils/util'
import constant from '@/config/constant.js'

axios.defaults.baseURL = constant.SERVER_BASE_URL

axios.interceptors.request.use(
    con => {
        return con
    },
    error => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    res => {
        return res
    },
    error => {
        return Promise.resolve(error)
    }
)

//返回状态判断
function checkStatus(response) {
    if (!response.status) {
        throw new Error(response.statusText)
    }

    if (response.status === 200 || response.status === 304) {
        if (util.isJson(response.data)) return JSON.parse(response.data)
        let result = response.data
        if (result.data && util.isJson(result.data)) {
            result.data = JSON.parse(result.data)
            let keys = Object.keys(result.data)
            if (keys.length) {
                for (let i = 0, len = keys.length; i < len; i++) {
                    if (!Number.isInteger(Number(result.data[keys[i]])) && util.isJson(result.data[keys[i]])) {
                        result.data[keys[i]] = JSON.parse(result.data[keys[i]])
                    }
                }
            }
        }
        return result;
    }

    return {
        status: false,
        data: response.statusText
    }
}

export default {
    post(url, data, contentType = 'application/json') {
        if (contentType == 'application/x-www-form-urlencoded') {
            data = util.arrayObjectKeyValues(data).join('&')
        }
        let authToken = util.encrypt(`${constant.APP_KEY}&${(new Date().getTime())}`, constant.APP_SECRET.slice(0, 16))
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: axios.defaults.baseURL + url,
                data: data,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': contentType,
                    'appKey': constant.APP_KEY,
                    'authToken': authToken
                }
            }).then(res => checkStatus(res))
                // 最后一个then 启用 resolve,reject
                .then(res => resolve(res))
                .catch(err => { reject(err) })
        })
    },
    get(url, params) {
        let authToken = util.encrypt(`${constant.APP_KEY}&${(new Date().getTime())}`, constant.APP_SECRET.slice(0, 16))
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: axios.defaults.baseURL + url,
                params,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'appKey': constant.APP_KEY,
                    'authToken': authToken
                }
            })
                .then(res => checkStatus(res))
                .then(res => resolve(res))
                .catch(err => { reject(err) })
        })
    },
    upload(url, data) {
        let authToken = util.encrypt(`${constant.APP_KEY}&${(new Date().getTime())}`, constant.APP_SECRET.slice(0, 16))
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: axios.defaults.baseURL + url,
                data: data,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'multipart/form-data',
                    'appKey': constant.APP_KEY,
                    'authToken': authToken
                }
            })
                .then(res => checkStatus(res))
                // 最后一个then 启用 resolve,reject
                .then(res => resolve(res))
                .catch(err => { reject(err) })
        })
    },
    upPic(url, data) {
        let authToken = util.encrypt(`${constant.APP_KEY}&${(new Date().getTime())}`, constant.APP_SECRET.slice(0, 16))
        let formParam = new FormData(); //创建form对象
        formParam.append('file', data);
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url ? (axios.defaults.baseURL + url) : (axios.defaults.baseURL + 'file/upload'),
                data: formParam,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'multipart/form-data',
                    'appKey': constant.APP_KEY,
                    'authToken': authToken
                }
            })
                .then(res => checkStatus(res))
                .then(res => resolve(res))
                .catch(err => { reject(err) })
        })
    }
}
