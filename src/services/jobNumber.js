import request from '@/utils/request';
import { baseUrl } from '@/services/baseUrl';
import { getSysUser } from '@/utils/authority';

const getUserListUrl = `${baseUrl}/back/tel/getUserList`;
const updateCallModeUrl = `${baseUrl}/back/tel/updateCallMode`;
const getCompanyDataUrl = `${baseUrl}/back/com/getCompanyData`;
const getComRoleUrl = `${baseUrl}/back/com/getComRole`;
const updateCompanyUrl =`${baseUrl}/back/com/updateCompany`;
const addCompanyUrl =`${baseUrl}/back/com/addCompany`;
const verifyCompanyDataUrl =  `${baseUrl}/back/com/verifyCompanyData`;
const addCallBoxDeviceUrl =  `${baseUrl}/back/callBox/addCallBoxDevice`;
const deleteCompanyUrl = `${baseUrl}/back/com/deleteCompany`;
const updateCompanyStateUrl = `${baseUrl}/back/com/updateCompanyState`;
const roleListUrl =  `${baseUrl}/back/admin/roleList`;
const listCompanyPermissionUrl = `${baseUrl}/back/com/getComRole`;
const delRoleUrl =  `${baseUrl}/back/admin/delRole`;
const checkRoleUrl = `${baseUrl}/back/admin/checkRole`
const getPermissionUrl = `${baseUrl}/back/admin/getPermission`
const lparams = {
    keyWord:"",
    callMode:"",
  };
export async function getUserList(params) {
  if(params.keyWord){
    lparams.keyWord = params.keyWord
  }else{
    lparams.keyWord=""
  }
  if(params.callMode){
    lparams.callMode = params.callMode
  }else{
    lparams.callMode = ""
  }
  return request(
    `${getUserListUrl}?keyWord=${lparams.keyWord}&callMode=${lparams.callMode}&size=${params.size}&page=${params.page}`,
  );
}

export async function updateCallMode(params){
  return request(`${updateCallModeUrl}`,{
    method:'POST',
    headers:{"Content-Type" : "application/json;charset=UTF-8"},
    body:params,
  });
}

// 企业管理列表 及搜索

export async function getCompanyData(params) {
  // companyVal 名称
  // validateFlag 实名状态
  // isEnd 结束状态
  // 时间区间
  // endTimes 开始 
  // endTimee 结束
  // is_paying 付费状态
  return request(
    `${getCompanyDataUrl}?size=${params.size}&page=${params.page}${params.nameInputVal?"&companyVal="+params.nameInputVal:""}${params.realName?"&validateFlag="+params.realName:""}${params.overState?"&isEnd="+params.overState:""}${params.endTimes?"&endTimes="+params.endTimes:""}${params.endTimee?"&endTimee="+params.endTimee:""}${params.payment?"&isPaying="+params.payment:""}`,
  );
}
// 企业管理客户角色请求
export async function getComRole(params){
  return request(
    `${getComRoleUrl}`
  )
}

// 企业管理中修改企业
export async function updateCompany(params){
  const sysUserData =  getSysUser();
  const param = {
      company:{...params},
      sysUser:{...sysUserData}
  }
  return request(`${updateCompanyUrl}`,{
    method:'POST',
    headers:{"Content-Type" : "application/json;charset=UTF-8"},
    body:param,
  })
}

// 检查公司名称是否重复
export async function verifyCompanyData(params){
  return request(
    `${verifyCompanyDataUrl}?companyName=${params.companyName}&shortName=${params.shortName}`
  )
}

// 企业管理中新增企业
export async function addCompany(params){
  return request(`${addCompanyUrl}`,{
    method:'POST',
    headers:{"Content-Type" : "application/json;charset=UTF-8"},
    body:params,
  })
}

// 新增通话宝
export async function addCallBoxDevice(params){
  return request(`${addCallBoxDeviceUrl}`,{
    method:'POST',
    headers:{"Content-Type" : "application/json;charset=UTF-8"},
    body:params,
  })
}
// 删除客户
export async function deleteCompany(params){
  const sysUserData =  getSysUser();
  const param = {
    sysUser:{...sysUserData}
  }
  return request(`${deleteCompanyUrl}/${params.comUuid}`,{
    method:'POST',
    headers:{"Content-Type" : "application/json;charset=UTF-8"},
    body:param,
  })
}
// 启用禁用
export async function updateCompanyState(params){
  const sysUserData =  getSysUser();
  const param = {
    company:{...params},
    sysUser:{...sysUserData},
  }
  return request(`${updateCompanyStateUrl}`,{
    method:'POST',
    headers:{"Content-Type" : "application/json;charset=UTF-8"},
    body:param,
  })
}

// 平台角色管理列表
export async function roleList(params){
  return request(
    `${roleListUrl}?size=${params.size}&page=${params.page}${params.roleName?"&roleName="+params.roleName:""}`,
  );
}

// 公司角色权限
export async function listCompanyPermission(params){
  return request(
    `${listCompanyPermissionUrl}`,
  );
}
// 当前角色选中的权限
export async function getPermission(params){
  return request(
    `${getPermissionUrl}/${params.id}`
  )
}

// 删除员工角色
export async function delRole(params){
  return request(`${delRoleUrl}/${params.id}`,{
    method:'POST',
  })
}

// 员工角色的禁用与启用
export async function checkRole(params){
  return request(`${checkRoleUrl}/${params.id}`,{
    method:'POST',
    headers:{"Content-Type" : "application/json;charset=UTF-8"},
    body:{status:params.status},
  }) 
}


