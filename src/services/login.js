import md5 from 'md5';
import request from '@/utils/request';
import {baseUrl} from '@/services/baseUrl'
// const baseUrl = 'http://101.132.116.192:3008';
// const baseUrl = 'https://server.aimengyx.com';
// const baseUrl = 'http://10.168.1.147:8050';
// const baseUrl = 'http://120.77.83.227:50004';
const loginUrl = `${baseUrl}/user/login`;


export async function accountLogin(params) {
  // const { password, type, userName, moduleName, phone } = params;
  return request(loginUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body:params,
  });
}
