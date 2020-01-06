import moment from 'moment';
import { baseUrl } from '@/services/baseUrl'
import request from '@/utils/request';

const comUuid = 745897203154948100;
const userUuid = 746177010350559200;
const getCompanybyNameUrl = `${baseUrl}/crm/solr/getCompanybyName`;
const getCompanyByIdUrl = `${baseUrl}/crm/solr/getCompanyById`;
export async function getCompanybyName (params) {
  console.log(params)
  return request(
    `${getCompanybyNameUrl}?pageSize=${params.pageSize}&currentPage=${params.currentPage}&comUuid=${comUuid}&userUuid=${userUuid}&keyword=${params.keyword}`,
  );
}
export async function getCompanyById (params) {
  console.log(params)
  return request(
    `${getCompanyByIdUrl}?comUuid=${comUuid}&keyword=${params.id}`,
  );
}

