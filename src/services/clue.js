import request from '@/utils/request';
import { baseUrl } from '@/services/baseUrl';
import { getUser, getSysUser, getUserToken } from '@/utils/authority';


const getCompanyPageUrl = `${baseUrl}/clue/getCompanyPage`;
const batchAddCompanyUrl = `${baseUrl}/clue/batchAddCompany`;


export async function getCompanyPage(params) {
  let josnData = {};
  josnData['comName'] = params.keyWord;
  let josnData1 = josnData;
  josnData1['sourceRange'] = params.sourceRange;
  let comName = encodeURIComponent(JSON.stringify(josnData1));
  return request(
    `${getCompanyPageUrl}?filter=${comName}&pageSize=${params.size}&currentPage=${params.page}`
  );
}
export async function batchAddCompany(params) {
  let formdata = new FormData();
  formdata.append("file", params.fields);
  formdata.append("source", params.source);
  // let authorization = getUserToken();
  // let userUuid = JSON.parse(getUser()).userUuid;
  return request(`${batchAddCompanyUrl}`, {
    method: 'POST',
    body: formdata,
    headers: {
      // authorization: authorization,
      // userUuid: userUuid,
    }
    
  });
}

