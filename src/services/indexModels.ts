import { baseUrl } from '@/services/baseUrl'
import request from '@/utils/request';
import moment from 'moment';
const getBasicFactsUrl = `${baseUrl}/back/home/getBasicFacts`;
const getLivelyUserUrl = `${baseUrl}/back/home/getLivelyUser`;
const getPayedComUrl = `${baseUrl}/back/home/getPayedCom`;


export async function getBasicFacts() {
  // const { password, type, userName, moduleName, phone } = params;
  return request(getBasicFactsUrl);
}
export async function getLivelyUser(params) {
  // const { password, type, userName, moduleName, phone } = params;
  const startTime = params.startTime ? params.startTime : moment().subtract(7,'days').format('YYYY-MM-DD')
  const endTime = params.endTime ? params.endTime : moment().format('YYYY-MM-DD')
  return request(`${getLivelyUserUrl}?startTime=${startTime}&endTime=${endTime}${params.comId?'&comId='+params.comId:''}`);
  }
  export async function getPayedCom(params) {
    // const { password, type, userName, moduleName, phone } = params;
    return request(`${getPayedComUrl}?${params.comName ? 'comName=' + params.comName : ''}`);
  }
