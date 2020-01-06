
export default {
  namespace: 'conterModels',
  state: {
    allTableList: [
      { "name": "li", "age": "20", "postion": "测试员1", "id": "001" },
      { "name": "li", "age": "20", "postion": "测试员2", "id": "002" },
      { "name": "li", "age": "20", "postion": "测试员3", "id": "003" },
      { "name": "li", "age": "20", "postion": "测试员4", "id": "004" },
      { "name": "li", "age": "20", "postion": "测试员5", "id": "005" },
      { "name": "li", "age": "20", "postion": "测试员6", "id": "006" },
      { "name": "li", "age": "20", "postion": "测试员7", "id": "007" },
      { "name": "li", "age": "20", "postion": "测试员8", "id": "008" },
      { "name": "li", "age": "20", "postion": "测试员9", "id": "009" },
      { "name": "li", "age": "20", "postion": "测试员10", "id": "010" },
      { "name": "li", "age": "20", "postion": "测试员11", "id": "011" },
      { "name": "li", "age": "20", "postion": "测试员12", "id": "012" },
      { "name": "li", "age": "20", "postion": "测试员13", "id": "013" },
      { "name": "li", "age": "20", "postion": "测试员14", "id": "014" },
      { "name": "li", "age": "20", "postion": "测试员15", "id": "015" },
      { "name": "li", "age": "20", "postion": "测试员16", "id": "016" },
      { "name": "li", "age": "20", "postion": "测试员17", "id": "017" },
      { "name": "li", "age": "20", "postion": "测试员18", "id": "018" },
      { "name": "li", "age": "20", "postion": "测试员19", "id": "019" },
      { "name": "li", "age": "20", "postion": "测试员20", "id": "020" },
      { "name": "li", "age": "20", "postion": "测试员21", "id": "021" },
      { "name": "li", "age": "20", "postion": "测试员22", "id": "022" },
    ],
    pageTableList: undefined,
    firstPageList: [],
  },

  effects: {
    *add ({ payload }, { call, put }) {
      console.log(payload)
    },
    *allConversionPage ({ payload }, { call, put, select }) {
      const { allTableList } = yield select(_ => _.conterModels);
      const len = allTableList.length;
      const lineNum = len % payload.size === 0 ? len / payload.size : Math.floor((len / payload.size) + 1);
      const res = [];
      for (let i = 0; i < lineNum; i++) {
        const temp = allTableList.slice(i * payload.size, i * payload.size + payload.size);
        res.push(JSON.parse(JSON.stringify(temp)));
      }
      yield put({
        type: "saveAllConversionPage",
        pageTableList: res,
      })
      yield put({
        type: "saveFirstPageList",
        firstPageList: res[0],
      })
    },
    *pagingFn ({ payload }, { call, put, select }) {
      const { pageTableList } = yield select(_ => _.conterModels);
      yield put({
        type: "saveFirstPageList",
        firstPageList: pageTableList[payload.page],
      })
    }
  },

  reducers: {
    saveAllConversionPage (state, action) {
      return {
        ...state,
        pageTableList: action.pageTableList,
      }
    },
    saveFirstPageList (state, action) {
      return {
        ...state,
        firstPageList: action.firstPageList,
      }
    },
  },
};
