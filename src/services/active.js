import request from '@/utils/request';
import { baseUrl } from '@/services/baseUrl';
import { getUser, getSysUser, getUserToken } from '@/utils/authority';


const getDailyActiveUrl = `${baseUrl}/back/home/getDailyActive`;



export async function getDailyActive(params) {
  // console.log(params);
  // console.log("params---------------------------1");
  return request(
    `${getDailyActiveUrl}?statisticsType=${params.statisticsType}${params.startTime?'&startTime='+params.startTime:''}${params.endTime?'&endTime='+params.endTime:''}`
  );
}
