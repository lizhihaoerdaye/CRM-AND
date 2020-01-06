import { getCompanybyName, getCompanyById } from '../services/indexModels';

export default {
  namespace: 'indexModels',

  state: {
    dataList: {
      result: [],
      count: null,
      resultFlag: null,
    },
    tableList: [
      // {
      //   id:"001",
      //   minChen:"湖南企捷信息科技有限公司",
      //   tag:["续集","百度竞价"],
      //   faRen:"罗涛",
      //   chengLiTime:"2019-10-18",
      //   zuCeModey:"200万人民币",
      //   huangYe:"信息传输，软件和信息技术服务业",
      //   diZi:"湖南省长沙市岳麓区麓谷企业广场F1栋603",
      //   wangZan:"（更新时间：2019-10-11）www.qijiee.com、www.haosou.com、www.haosou.com、www.haosou.com、",
      //   zhaoPing:" 销售代表 / 电话销售 / 销售主管 / 业务员 / 销售经理 / 客户经理 / 行政专员 / 销售经理 / 客户经理 / 行政专员",
      //   login:0,
      // },
      // {
      //   id:"002",
      //   minChen:"湖南企捷信息科技有限公司",
      //   tag:["续集","百度竞价"],
      //   faRen:"罗涛",
      //   chengLiTime:"2019-10-18",
      //   zuCeModey:"200万人民币",
      //   huangYe:"信息传输，软件和信息技术服务业",
      //   diZi:"湖南省长沙市岳麓区麓谷企业广场F1栋603",
      //   wangZan:"（更新时间：2019-10-11）www.qijiee.com、www.haosou.com、www.haosou.com、www.haosou.com、",
      //   zhaoPing:" 销售代表 / 电话销售 / 销售主管 / 业务员 / 销售经理 / 客户经理 / 行政专员 / 销售经理 / 客户经理 / 行政专员",
      //   login:1,      
      // },
      // {
      //   id:"003",
      //   minChen:"湖南企捷信息科技有限公司",
      //   tag:["续集","百度竞价"],
      //   faRen:"罗涛",
      //   chengLiTime:"2019-10-18",
      //   zuCeModey:"200万人民币",
      //   huangYe:"信息传输，软件和信息技术服务业",
      //   diZi:"湖南省长沙市岳麓区麓谷企业广场F1栋603",
      //   wangZan:"（更新时间：2019-10-11）www.qijiee.com、www.haosou.com、www.haosou.com、www.haosou.com、",
      //   zhaoPing:" 销售代表 / 电话销售 / 销售主管 / 业务员 / 销售经理 / 客户经理 / 行政专员 / 销售经理 / 客户经理 / 行政专员",
      //   login:1,
      // },
    ],
    detailsMessage: {},
    saveCustomer: [],
  },

  effects: {
    *conditionSearch ({ payload }, { call, put, select }) {
      const response = yield call(getCompanybyName, payload);
      if (response.resultFlag) {
        yield put({
          type: "save",
          payload: {
            dataList: response,
          }
        })
      }
    },
    *saveScreening ({ payload }, { call, put, select }) {
      const { saveCustomer } = yield select(_ => _.indexModels);
      saveCustomer.push(payload)
    },
    *clearOptions ({ payload }, { call, put, select }) {
      const { saveCustomer } = yield select(_ => _.indexModels);
      saveCustomer.map((val, ind) => {
        if (val.id === payload.id) {
          saveCustomer.splice(ind, 1)
        }
      })
      yield put({
        type: "saveClearOptions",
        payload: { saveCustomer }
      })
    },
    *openDetails ({ payload }, { call, put }) {
      const response = yield call(getCompanyById, payload)
    }
  },

  reducers: {
    save (state, actioon) {
      return {
        ...state,
        dataList: actioon.payload.dataList
      }
    },
    saveClearOptions (state, actioon) {
      return {
        ...state,
        saveCustomer: actioon.payload.saveCustomer,
      }
    }
  },
};
