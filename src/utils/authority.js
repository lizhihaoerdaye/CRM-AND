// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // return authority || ['admin'];
  return authority || ['guest'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
/**
 * 20191202 chenccsy 添加用户信息记录
 * @param {*} user 
 */
export function setSysUser(user) {
  const proUser = typeof user === 'string' ? JSON.parse(user): user;
  return localStorage.setItem('antd-pro-sysUser', JSON.stringify(proUser));
}
/**
 * 20191202 chenccsy 获得用户信息
 * @param {*} user 
 */
export function getSysUser() {
  return JSON.parse(localStorage.getItem('antd-pro-sysUser'));
}
