import { 
  getCompanyAttesData,
  companyAttesInfo,
  checkAttestation
} from '@/services/certificationManagement';
import { message } from 'antd'
import { stat } from 'fs';
var checkAttestationkeyWord = "";
var checkAttestationsize = "";
var checkAttestationpage = "";
export default {
  namespace: 'certificationManagement',
  state: {
    tableList: {
        page:null,
        result:[],
        size:null,
        total:null,
        totalPages:null,
      },
    tableSee:{
      sysCompany:{},
      sysComInfo:{}
    },
  },
  effects: {
    *fetch({ payload }, { call, put ,select}) {
      checkAttestationkeyWord = payload.keyWord;
      checkAttestationsize = payload.size;
      checkAttestationpage = payload.page;
      const response = yield call(getCompanyAttesData, payload);
      if (response) {
        yield put({
            type:"save",
            payload: response,
        })
      }
    },
    *see({ payload }, { call, put, select }) {
      const response = yield call(companyAttesInfo, payload);
      if (response) {
        yield put({
          type: "saveSee",
          payload: response,
        })
      }
    },
    *eliminate({ payload }, { call, put, select }) {
      if (payload) {
        yield put({
          type: "eliminate",
          payload: "",
        })
      }
    },
    *checkAttestation({ payload }, { call, put, select }) {
      const response = yield call(checkAttestation, payload);
      if (response.succuss == true) {
        message.success("修改成功", 2)
        yield put({
          type: "fetch",
          payload: {
            keyWord: checkAttestationkeyWord,
            size: checkAttestationsize,
            page: checkAttestationpage,
          }
        })
      }else{
        message.success(response.msg, 2)
      }
    },
    *modifyTheModel({ payload },{call,put,select}) {
      const response = yield call(updateCallMode,payload);
      const {tableList,keyWord,callMode} = yield select(_ => _.jobNumber)
      yield put({
        type:"modifyLoading",
      })
      if(response.success){
        message.success("修改成功",2)
        yield put({
          type:"fetch",
          payload:{
            keyWord:keyWord,
            callMode:callMode,
            size:tableList.size,
            page:tableList.page,
          }
        })
      }else{
        message.success(response.msg,2)
      }
      yield put({
        type:"saveSelectedRowKeys",
        payload:[],
      })
    },
    *modifySelectedRowKeys({ payload },{call,put,select}){
      yield put({
        type:'saveSelectedRowKeys',
        payload:payload.selectedRowKeys,
      })
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        tableList: action.payload,
        loading : false,
      };
    },
    saveSee(state, action) {
      return {
        ...state,
        tableSee: action.payload,
        loading: false,
      };
    },
    eliminate(state, action) {
      return {
        ...state,
        tableSee: {
          sysCompany: {},
          sysComInfo: {}
        },
        loading: false,
      };
    },
    saveSelectedRowKeys(state,action) {
      return{
        ...state,
        selectedRowKeys:action.payload,
      }
    },
  },
};
