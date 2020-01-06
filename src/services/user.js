import request from '@/utils/request';
import {getSysUser,setAuthority} from '@/utils/authority'
import router from 'umi/router';
export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
const user = getSysUser()
if(!user){
  setAuthority("")
  router.push('/user/login')
  return
}
let tt ={
    name: user.userName||'test',
    avatar: user.head||'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: user.id||1,
    // email: 'antdesign@alipay.com',
    signature: user.remark||'蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    // title: '交互专家',
    // group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    // tags: [
    //   {
    //     key: '0',
    //     label: '很有想法的',
    //   },
    //   {
    //     key: '1',
    //     label: '专注设计',
    //   },
    //   {
    //     key: '2',
    //     label: '辣~',
    //   },
    //   {
    //     key: '3',
    //     label: '大长腿',
    //   },
    //   {
    //     key: '4',
    //     label: '川妹子',
    //   },
    //   {
    //     key: '5',
    //     label: '海纳百川',
    //   },
    // ],
    // notifyCount: 12,
    // unreadCount: 11,
    // country: 'China',
    // geographic: {
    //   province: {
    //     label: '浙江省',
    //     key: '330000',
    //   },
    //   city: {
    //     label: '杭州市',
    //     key: '330100',
    //   },
    // },
    // address: '西湖区工专路 77 号',
    // phone: '0752-268888888',
  }
  return tt;
  // return request('/api/currentUser');
}
