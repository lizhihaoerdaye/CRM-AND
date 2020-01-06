import request from '@/utils/request';
import {baseUrl} from '@/services/baseUrl'
// const baseUrl = 'http://10.168.254.145:8050';
// const baseUrl = 'https://server.aimengyx.com';
// const baseUrl = 'http://120.77.83.227:50004';


const companyListForCustomizeUrl = `${baseUrl}/crm/companyListForCustomize`;
const allCustomizeFieldUrl = `${baseUrl}/crm/allCustomizeField`;
const customizeContentUrl = `${baseUrl}/crm/customizeContent`;
const updateCustomizeContentUrl = `${baseUrl}/crm/updateCustomizeContent`;
const latestFieldCodeUrl = `${baseUrl}/crm/latestFieldCode`;


export async function queryCompanyListForCustomize(params) {
  const filter = {};
  const query = {};
  // console.log("crmCompany service - queryCompanyListForCustomize");
  const { currentPage, pageSize, sorter } = params;
  if (sorter) {
    let sorterTmp = sorter.replace(/_ascend/, '_asc');
    sorterTmp = sorterTmp.replace(/_descend/, '_desc');
    query.sort = JSON.stringify(sorterTmp.split('_'));
  } else {
    query.sort = JSON.stringify(['companyName', 'asc']);
  }
    // console.log(query.sort);
  const sortTmp={};
  sortTmp.sort= JSON.parse(query.sort)[0];
  sortTmp.order=JSON.parse(query.sort)[1];
  console.log(sortTmp);
  query.sort=encodeURIComponent(JSON.stringify(sortTmp));
  if(params.companyName){
    filter.companyName = params.companyName;
  }
  if (params.date) {
    [filter.beginTime, filter.endTime] = params.date;
  }
  query.range = encodeURIComponent(JSON.stringify([(currentPage - 1) * pageSize, (currentPage * pageSize) - 1]));
  query.filter = encodeURIComponent(JSON.stringify(filter));
  // console.log("query = " + JSON.stringify(query));
  return request(`${companyListForCustomizeUrl}?sorter=${query.sort}&range=${query.range}&filter=${query.filter}&pageSize=${pageSize}&currentPage=${currentPage}`);
}


export async function submitCompanyListForCustomize(params) {
  console.log('params--------');
  console.log(params);
  return request(`${companyListForCustomizeUrl}`, {
    method: 'POST',
    body: params,
  });
}


export async function deleteCompanyListForCustomize(params) {
  const { id } = params;
  return request(`${companyListForCustomizeUrl}/${id}`, {
    method: 'delete',
  });
}


export async function updateCompanyListForCustomize(params) {
  // const { id } = params;
  // return request(`${companyListForCustomizeUrl}/${id}`, {
  return request(`${companyListForCustomizeUrl}`, {
    method: 'PUT',
    body: params,
  });
}




export async function queryAllCustomizeField(params) {
  const filter = {};
  const query = {};
  console.log("crmCompany service - queryAllCustomizeField");
  const {companyId } = params;

  return request(`${allCustomizeFieldUrl}?companyId=${companyId}`);
}

// headers: {
// 'Content-Type': 'application/x-www-form-urlencoded'
// },
// contentType: 'application/x-www-form-urlencoded',
export async function submitCustomizeField(params) {
  console.log('params--------');
  console.log(params);
  return request(`${customizeContentUrl}`, {
    method: 'POST',
    body: params,
  });
}

// export async function updateCustomizeField(params) {
//   console.log('params--------');
//   console.log(params);
//   return request(`${updateCustomizeContentUrl}`, {
//     method: 'POST',
//     body: params,
//   });
// }


export async function updateCustomizeField(params) {
  console.log('params--------');
  console.log(params);
  // return request(`${customizeContentUrl}/${params.get("id")}`, {
    return request(`${customizeContentUrl}/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function queryLatestFieldCodeUrl(params) {
  const filter = {};
  const query = {};
  const {companyId } = params;
  return request(`${latestFieldCodeUrl}?companyId=${companyId}`);
}
