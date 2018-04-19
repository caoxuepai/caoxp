const root = '';
const axios = require('axios');

function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params) {
  if (params) {
    params = filterNull(params);
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      baseURL: root,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      withCredentials: false
    }).then((res)=>{
      // console.log(resolve);
      if(res.status === 200) {
        resolve(res.data);
      }
      /*if(res.code === 0) {
        resolve(res.data);
      } else {
        if(res.msg) {
          alert(res.msg);
        } else {
          alert('错误');
        }
      }*/
    }, (err) => {
      reject(err);
    }).catch((error) => {
      reject(error);
    })
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params) {
    return apiAxios('GET', url, params);
  },
  post: function (url, params) {
    return apiAxios('POST', url, params);
  }
}

