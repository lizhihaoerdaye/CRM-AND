import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

// const Authority = ;
// console.log("Authority ==== "+Authority);
const Authorized = RenderAuthorized(getAuthority());

export default ({ children }) => {    
  return (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
      {children}
  </Authorized>
  )
};
