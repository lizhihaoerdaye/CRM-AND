import { stringify } from 'qs';
import request from '@/utils/request';

export async function countsIndexNumbers() {
  // return request('http://10.168.1.147:8050/crm/countsIndexNumbers');
  return request('https://server.aimengyx.com/crm/countsIndexNumbers');
}
