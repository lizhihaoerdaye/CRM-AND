import request from '@/utils/request';
import { baseUrl } from '@/services/baseUrl';
import { getSysUser } from '@/utils/authority';


const getCompanyAttesDataUrl = `${baseUrl}/back/com/getCompanyAttesData`;
const companyAttesInfoUrl = `${baseUrl}/back/com/companyAttesInfo`;
const checkAttestationUrl = `${baseUrl}/back/com/CheckAttestation`;  


export async function getCompanyAttesData(params) {
  return request(
    `${getCompanyAttesDataUrl}?companyName=${params.keyWord}&size=${params.size}&page=${params.page}`,
  );
}
export async function companyAttesInfo(params) {
  return request(
    `${companyAttesInfoUrl}/${params.comUuid}`,
  );
}
export async function checkAttestation(params) {
  const sysUserData = getSysUser();
  const param = {
    ...params ,
    sysUser: { ...sysUserData }
  }
  return request(`${checkAttestationUrl}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: param,
  });
}

