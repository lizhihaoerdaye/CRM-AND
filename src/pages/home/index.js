import React, { Fragment } from 'react';


import moment from 'moment';
import { Input, Tag, Select, Cascader, Form, Drawer, Table, Checkbox, Button, Icon, message } from 'antd';
import TheCustomWindown from "@/components/theCustomWindown/index";
import { connect } from 'dva';
import imgURL from './seek_img.jpg'
import Seekcon from '@/components/detailsDrawerView/index'
const styles = require('./index.less');
// TheCustomWindownForm成立时间自定义 注册资本自定义 高级筛选中网站备案时间和职位发布时间弹窗
const TheCustomWindownForm = Form.create({ name: 'form_tips_windown' })(TheCustomWindown)
const { Search } = Input;
const { Option } = Select;
const { CheckableTag } = Tag;
const tagsEstablish = ['不限', '1年内', '1-5年', '5-10年', '15年以上'];
const tagsManagement = ['不限', '在业/存续', '迁入/迁出', '吊销/撤销', '注销', '其他'];
const tagsRegister = ['不限', '100万以内', '100-200万', '200-500万', '500-1000万', '1000万以上'];
const tagsEnterprise = ['不限', '企业', '个体工商户', '其他'];
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hanzhou',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
      },
    ],
  },
];
@connect(({ Seek, indexModels, }) => ({
  Seek,
  indexModels,
}))
export default class Seek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: '',
      industry: '', // 行业
      region: '', // 地区
      selectedTags: '不限', // 成立时间
      selectedTags1: '不限', // 经营状态
      selectedTags2: '不限', // 注册资本
      selectedTags3: '不限',  // 企业类型
      seekPhone: '联系电话', // 高级筛选联系电话
      seekExtension: '推广情况',// 高级筛选推广情况
      seekWebsite: '网站域名',// 高级筛选网站域名
      seekKeep: '',
      seekRecruit: '招聘情况', // 招聘情况
      seekRelease: '',
      windowShow: false, // 弹窗显示与否
      windowTitle: undefined, // 弹窗标题
      selectedRowKeys: [], // 表格被选中的id
      setUpTime: "自定义", // 成立时间自定义
      setUpTimeColor: false, // 自定义标签样式
      registerCapital: "自定义",// 注册资本自定义
      registerCapitalColor: false,// 注册资本自定义标签样式
      webRecordTime: "网站备案时间",
      releaseTime: "职位发布时间",
      screeningCondition: {},// 筛选条件
      userId: undefined,
      tarName: undefined,
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示的条数
      drawerShow: false,// 详情抽屉显示
      currentCompany: {},
    };
  }

  componentWillMount () {
    // window.addEventListener('message', function (e) {   // iframe跨域传值
    //   console.log(e.data);
    //   var data = JSON.parse(e.data);
    //   console.log(data);
    //   console.log("e-------------------------");
    //   // var data = JSON.parse(e.data);
    //   // if (data) {
    //   //   data.number = 16;

    //   //   // 处理后再发回domain1
    //   //   window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
    //   // }
    // }, false);
  }
  // 行业选择
  onChangeIndustry = (value) => {
    const { industry } = this.state;
    console.log(value);
    console.log("v-------------------------1111");
    this.setState({ industry: value })
  }
  // 地区选择
  onChangeRegion = (value) => {
    const { region } = this.state;
    console.log(value);
    console.log("v-------------------------1111");
    this.setState({ region: value })
  }
  // 高级筛选中下拉菜单选择
  handleChange (e, value) {
    // console.log(`selected ${value}selected${e}`);
    // e===1时联系电话
    // e===2时推广情况
    // e===3时网站域名
    // e===5时招聘情况
    if (e === 1) {
      this.setState({
        seekPhone: value
      })
    } else if (e === 2) {
      this.setState({
        seekExtension: value
      })
    } else if (e === 3) {
      this.setState({
        seekWebsite: value
      })
    } else if (e === 5) {
      this.setState({
        seekRecruit: value
      })
    }
  }
  // 客户名称input搜索
  ipnutSearch = (value) => {
    const { dispatch } = this.props;
    const { keyWord } = this.state
    const param = {};
    param.keyword = keyWord;
    param.pageSize = 10;
    param.currentPage = 1;
    dispatch({
      type: "indexModels/conditionSearch",
      payload: param
    })
  }
  // 客户名称input输入
  searchChange = (e) => {
    this.setState({
      keyWord: e.target.value,
    });
  }
  // 成立时间选择
  handleChangeEstablish (tag) {
    const { selectedTags } = this.state;
    this.setState({
      selectedTags: tag,
      setUpTime: "自定义",
      setUpTimeColor: false,
    });
  }
  // 成立时间自定义选择 or 网站备案时间 or 职位发布时间
  customHandleChangeEstablish (val, e) {
    if (e) {
      e.stopPropagation();
    }
    if (val === 0) {
      this.setState({
        selectedTags: "",
        setUpTimeColor: true,
        windowShow: true,
        windowTitle: 0,
      })
    } else {
      this.setState({
        windowShow: true,
        windowTitle: val,
      })
    }
  }
  // 经营状态选择
  handleChangeManagement (tag) {
    const { selectedTags1 } = this.state;
    this.setState({ selectedTags1: tag });
  }
  // 注册资本选择
  handleChangeRegister (tag) {
    const { selectedTags1 } = this.state;
    this.setState({
      selectedTags2: tag,
      registerCapital: "自定义",
      registerCapitalColor: false,
    });
  }
  // 注册资本自定义选择
  customHandleChangeRegister () {
    this.setState({
      selectedTags2: "",
      registerCapitalColor: true,
      windowShow: true,
      windowTitle: 1,
    });
  }
  // 企业类型选择
  handleChangeEnterprise (tag) {
    const { selectedTags1 } = this.state;
    this.setState({ selectedTags3: tag });
  }
  // 弹窗form
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // 自定义输入弹窗取消按钮
  handleEquipmentCancel = () => {
    const { form } = this.formRef.props;
    const { windowTitle } = this.state;
    if (windowTitle === 2) {
      this.setState({
        windowShow: false,
        webRecordTime: "网站备案时间",
      })
    } else if (windowTitle === 3) {
      this.setState({
        windowShow: false,
        releaseTime: "职位发布时间",
      })
    } else {
      this.setState({
        windowShow: false
      })
    }
    form.resetFields();
  }
  // 自定义输入确定按钮
  handleEquipmentCreate = () => {
    const { windowTitle, screeningCondition, userId } = this.state;
    const { dispatch, indexModels: { saveCustomer } } = this.props
    const { form } = this.formRef.props;
    console.log(windowTitle)
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      // windowTitle为0时是成立时间自定义
      // windowTitle为1时是注册资金自定义
      if (windowTitle === 0) {
        const { startTime } = values;
        if (startTime && startTime[0] && startTime[1]) {
          this.setState({
            windowShow: false,
            setUpTime: `${moment(startTime[0]).format('YYYY-MM-DD')} ~ ${moment(startTime[1]).format('YYYY-MM-DD')}`
          })
        } else {
          this.setState({
            windowShow: false,
          })
        }
      } else if (windowTitle === 1) {
        const { startMoney, endMoney } = values;
        if (startMoney && endMoney) {
          this.setState({
            windowShow: false,
            registerCapital: `${startMoney}万 ~ ${endMoney}万`
          })
        } else {
          this.setState({
            windowShow: false,
          })
        }
      } else if (windowTitle === 2) {
        const { startTime } = values;
        if (startTime && startTime[0] && startTime[1]) {
          this.setState({
            windowShow: false,
            webRecordTime: `${moment(startTime[0]).format('YYYY-MM-DD')} ~ ${moment(startTime[1]).format('YYYY-MM-DD')}`
          })
        } else {
          this.setState({
            windowShow: false,
          })
        }
      } else if (windowTitle === 3) {
        const { startTime } = values;
        if (startTime && startTime[0] && startTime[1]) {
          this.setState({
            windowShow: false,
            releaseTime: `${moment(startTime[0]).format('YYYY-MM-DD')} ~ ${moment(startTime[1]).format('YYYY-MM-DD')}`
          })
        } else {
          this.setState({
            windowShow: false,
          })
        }
      } else if (windowTitle === 4) {
        // values.importLocation导入位置
        // values.noContact去除无联系方式的企业（检测到您未使用联系电话筛选
        // values.cancellation去除已注销的企业（检测到您未使用经营状态筛选）
        this.setState({
          windowShow: false,
        })
      } else if (windowTitle === 5) {
        // 单个客户导入
        this.setState({
          windowShow: false,
        })

      } else if (windowTitle === 6) {
        // 保存筛选条件
        if (values.name) {
          console.log(screeningCondition, values.name)
          if (saveCustomer.length < 5) {
            dispatch({
              type: "indexModels/saveScreening",
              payload: {
                currentState: { ...this.state },
                ...screeningCondition,
                name: values.name,
                date: moment().format("YYYY-MM-DD"),
                id: moment().valueOf(),
              }
            })
            this.setState({
              windowShow: false,
            })
          } else {
            message.error("最多保存5个")
            this.setState({
              windowShow: false,
            })
          }
        } else {
          message.error("请输入名称")
          // this.setState({
          //   windowShow: false,
          // })
        }
      } else if (windowTitle === 7) {
        this.removeOptions();
        dispatch({
          type: "indexModels/clearOptions",
          payload: {
            id: userId,
          }
        })
        this.setState({
          windowShow: false,
        })
      } else {
        this.setState({
          windowShow: false,
        })
      }
    })
    form.resetFields();
  }
  // 当单条记录选中时
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys: selectedRowKeys
    })
  }
  // 当选中全选时
  allChange = (e) => {
    const { indexModels: { dataList } } = this.props
    if (e.target.checked) {
      // 全选
      let arrID = [];
      dataList.result.map((val, ind) => {
        arrID.push(val.id);
      })
      this.setState({
        selectedRowKeys: arrID
      })
    } else {
      // 取消全选
      this.setState({
        selectedRowKeys: [],
      })
    }
  }
  // 总条数
  _showTotal = (total, range) => {
    return (
      `共${total}条数据，显示第${range[0]}条到${range[1]}条记录`
    )
  }
  // 保存选项
  saveOptions = () => {
    const { keyWord, seekPhone, seekExtension, seekWebsite, seekRecruit, selectedTags, selectedTags1, selectedTags2, selectedTags3, setUpTime, setUpTimeColor, registerCapital, registerCapitalColor, webRecordTime, releaseTime, industry, region } = this.state
    const param = {}
    if (keyWord) {
      param.keyWord = keyWord
    }
    if (seekPhone && seekPhone !== "联系电话") {
      param.seekPhone = seekPhone
    }
    if (seekExtension && seekExtension !== "推广情况") {
      param.seekExtension = seekExtension
    }
    if (seekWebsite && seekWebsite !== "网站域名") {
      param.seekWebsite = seekWebsite
    }
    if (seekRecruit && seekRecruit !== "招聘情况") {
      param.seekRecruit = seekRecruit
    }
    if (selectedTags && selectedTags !== "不限") {
      param.selectedTags = selectedTags
    }
    if (selectedTags1 && selectedTags1 !== "不限") {
      param.selectedTags1 = selectedTags1
    }
    if (selectedTags2 && selectedTags2 !== "不限") {
      param.selectedTags2 = selectedTags2
    }
    if (selectedTags3 && selectedTags3 !== "不限") {
      param.selectedTags3 = selectedTags3
    }
    if (setUpTime && setUpTime !== "自定义" && setUpTime !== "不限") {
      param.setUpTime = setUpTime
    }
    if (registerCapital && registerCapital !== "自定义" && registerCapital !== "不限") {
      param.registerCapital = registerCapital
    }
    if (webRecordTime && webRecordTime !== "网站备案时间") {
      param.webRecordTime = webRecordTime
    }
    if (releaseTime && releaseTime !== "职位发布时间") {
      param.releaseTime = releaseTime
    }
    if (industry) {
      param.industry = industry
    }
    if (region) {
      param.region = region
    }
    this.setState({
      windowShow: true,
      windowTitle: 6,
      screeningCondition: param,
    })
  }
  // 清空选项
  removeOptions = () => {
    this.setState({
      seekPhone: '联系电话', // 高级筛选联系电话
      seekExtension: '推广情况',// 高级筛选推广情况
      seekWebsite: '网站域名',// 高级筛选网站域名
      seekRecruit: '招聘情况', // 招聘情况
      selectedTags: '不限', // 成立时间
      selectedTags1: '不限', // 经营状态
      selectedTags2: '不限', // 注册资本
      selectedTags3: '不限',  // 企业类型
      setUpTime: "自定义", // 成立时间自定义
      setUpTimeColor: false, // 自定义标签样式
      registerCapital: "自定义",// 注册资本自定义
      registerCapitalColor: false,// 注册资本自定义标签样式
      webRecordTime: "网站备案时间",
      releaseTime: "职位发布时间",
      industry: '', // 行业
      region: '', // 地区
    })
  }
  // 点击选项
  tarCad = (obj) => {
    this.removeOptions();
    this.setState({
      ...obj.currentState.screeningCondition,
    })
    if (obj.currentState.screeningCondition.setUpTime) {
      this.setState({
        selectedTags: "",
        setUpTimeColor: true,
      })
    } else {
      this.setState({
        setUpTimeColor: false,
      })
    }
    if (obj.currentState.screeningCondition.registerCapital) {
      this.setState({
        selectedTags2: "",
        registerCapitalColor: true,
      })
    } else {
      this.setState({
        registerCapitalColor: false,
      })
    }
  }
  // 删除选项
  clearOptions = (e, val) => {
    console.log(val)
    const { dispatch } = this.props
    e.stopPropagation();
    this.setState({
      userId: val.id,
      tarName: val.name
    })
    this.customHandleChangeEstablish(7)
    // 清空选项
    // this.removeOptions();
    // dispatch({
    //   type:"indexModels/clearOptions",
    //   payload:{
    //     id:val.id,
    //   }
    // })
  }
  // 页码改变
  paginationChange = (page, pageSize) => {
    const { dispatch } = this.props
    const { keyWord } = this.state
    this.setState({
      currentPage: page,
      pageSize: pageSize,
    })
    const param = {}
    param.keyword = keyWord;
    param.pageSize = pageSize;
    param.currentPage = page;
    dispatch({
      type: "indexModels/conditionSearch",
      payload: param
    })
  }
  // 每页显示条数变化时
  paginationSizeChange = (connect, size) => {
    const { dispatch } = this.props
    const { keyWord } = this.state
    this.setState({
      currentPage: connect,
      pageSize: size,
    })
    const param = {}
    param.keyword = keyWord;
    param.pageSize = size;
    param.currentPage = connect;
    dispatch({
      type: "indexModels/conditionSearch",
      payload: param
    })

  }
  // 详情抽屉
  detailsDrawer = (obj) => {
    const { dispatch } = this.props
    console.log(obj)
    if (obj) {
      // dispatch({
      //   type: "indexModels/openDetails",
      //   payload: {
      //     id: obj.id
      //   }
      // })
      this.setState({
        drawerShow: true,
        currentCompany: { ...obj }
      })
    }
  }
  // 详情抽屉中的关闭
  drawerClose = () => {
    this.setState({
      drawerShow: false,
    })
  }

  render () {
    const {
      currentPage,
      pageSize,
      keyWord,
      selectedTags,
      selectedTags1,
      selectedTags2,
      selectedTags3,
      windowShow,
      windowTitle,
      selectedRowKeys,
      setUpTime,
      setUpTimeColor,
      registerCapital,
      registerCapitalColor,
      webRecordTime,
      releaseTime,
      seekPhone,
      seekExtension,
      seekWebsite,
      seekRecruit,
      industry,
      region,
      screeningCondition,
      drawerShow } = this.state;
    const { indexModels: { dataList, saveCustomer } } = this.props
    // console.log(this.props.indexModels)
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        render: (text, row) => {
          return (
            <Fragment>
              <div style={{ fontSize: "18px", fontWeight: "400", overflow: "hidden", cursor: "pointer" }} onClick={() => { this.detailsDrawer(row) }}>
                <span style={{ marginRight: "10px" }}>{row.comName}</span>
                {row.businessState ? <Tag color="#108ee9">{row.businessState}</Tag> : ""}
                {row.searchPromotion ? <Tag color="#108ee9">{row.searchPromotion}</Tag> : ""}
                {row.phone ? <Tag color="#108ee9">{`联系电话(${row.phone.split(';').length - 1})`}</Tag> : ""}
                {row.isExist ? <Button style={{ float: "right" }} >已入库</Button> : <Button type="primary" style={{ float: "right" }} onClick={(e) => { this.customHandleChangeEstablish(5, e) }}>导入</Button>}
              </div>
              <div className={styles.tableLine}>
                <label>法人：</label><span>{row.corporate}</span>
                <label>成立时间：</label><span>{row.establishTime ? moment(row.establishTime).format("YYYY-MM-DD") : ''}</span>
                <label>注册资金：</label><span>{row.registeredMoney ? `${row.registeredMoney}万` : ""}</span>
                <label>行业：</label><span>{row.industry}</span>
              </div>
              <div className={styles.tableLine}><label>地址：</label><span>{row.comAddress}</span></div>
              <div className={styles.tableLine}><label>网站备案：</label><span>{row.website}</span></div>
              <div className={styles.tableLine}><label>招聘：</label><span>{row.recruit_list}</span></div>
            </Fragment>
          )
        },
      },
    ]
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const pagination = {
      current: currentPage,
      defaultPageSize: pageSize,
      showSizeChanger: true,
      total: dataList.count,
      showTotal: this._showTotal,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationSizeChange,
    };
    return (
      <>
        <div style={{ display: saveCustomer.length === 0 ? "none" : "block" }} className={styles.seek}>
          {saveCustomer.map((val, ind) => {
            return (
              <div
                key={ind}
                style={{ width: "200px", height: "80px", padding: "10px", position: "relative", backgroundColor: "#f0f2f5", float: "left", marginRight: "10px" }}
                onClick={() => { this.tarCad(val) }}
              >
                <div style={{ fontWeight: "700", fontSize: "14px" }}>{val.name}</div>
                <div style={{ position: "absolute", bottom: "10px" }}>{val.date}</div>
                <Button style={{ float: "right", top: "8px" }} onClick={(e) => { this.clearOptions(e, val) }}>删除</Button>
              </div>
            )
          })}
        </div>
        <div className={styles.seek}>
          <Search
            placeholder="请输入客户名称"
            onSearch={this.ipnutSearch}
            onChange={this.searchChange}
            value={keyWord}
            style={{ width: 316 }}
          />
          <Button style={{ float: "right" }} onClick={() => { this.removeOptions() }} >清除选项</Button>
          <Button style={{ float: "right", marginRight: "10px" }} onClick={(e) => { this.saveOptions(e) }}>保存选项</Button>
        </div>
        <div className={styles.seek}>
          <div className={styles.seekList}>
            <div className={styles.seekHead}>地区/行业：</div>
            <div className={styles.seekTag}>
              <Cascader placeholder="请选择地区" value={region} options={options} onChange={this.onChangeRegion} changeOnSelect style={{ marginRight: '15px', width: '120px' }} />
              <Cascader placeholder="请选择行业" value={industry} options={options} onChange={this.onChangeIndustry} changeOnSelect style={{ marginRight: '15px', width: '120px' }} />
            </div>
          </div>
          <div className={styles.seekList}>
            <div className={styles.seekHead}>成立时间：</div>
            <div className={styles.seekTag}>
              {tagsEstablish.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={() => this.handleChangeEstablish(tag)}
                >
                  {tag}
                </CheckableTag>
              ))}
              <CheckableTag key="keyOne" checked={setUpTimeColor} onChange={() => this.customHandleChangeEstablish(0)}>{setUpTime}</CheckableTag>
            </div>
          </div>
          <div className={styles.seekList}>
            <div className={styles.seekHead}>经营状态：</div>
            <div className={styles.seekTag}>
              {tagsManagement.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={selectedTags1.indexOf(tag) > -1}
                  onChange={checked => this.handleChangeManagement(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </div>
          </div>
          <div className={styles.seekList}>
            <div className={styles.seekHead}>注册资本：</div>
            <div className={styles.seekTag}>
              {tagsRegister.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={selectedTags2.indexOf(tag) > -1}
                  onChange={checked => this.handleChangeRegister(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
              <CheckableTag
                key="keyTow"
                checked={registerCapitalColor}
                onChange={checked => this.customHandleChangeRegister(registerCapital)}
              >
                {registerCapital}
              </CheckableTag>
            </div>
          </div>
          <div className={styles.seekList}>
            <div className={styles.seekHead}>企业类型：</div>
            <div className={styles.seekTag}>
              {tagsEnterprise.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={selectedTags3.indexOf(tag) > -1}
                  onChange={checked => this.handleChangeEnterprise(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </div>
          </div>
          <div className={styles.seekList}>
            <div className={styles.seekHead}>高级筛选：</div>
            <div className={styles.seekTag}>
              <Select value={seekPhone} onChange={e => this.handleChange(1, e)} style={{ marginRight: '10px' }}>
                <Option value="联系电话">联系电话</Option>
                <Option value="有联系电话">有联系电话</Option>
                <Option value="无联系电话">无联系电话</Option>
              </Select>
              <Select value={seekExtension} onChange={e => this.handleChange(2, e)} style={{ marginRight: '15px' }}>
                <Option value="推广情况">推广情况</Option>
                <Option value="有推广">有推广</Option>
                <Option value="无推广">无推广</Option>
              </Select>
              <Select value={seekWebsite} onChange={e => this.handleChange(3, e)} style={{ marginRight: '15px' }}>
                <Option value="网站域名">网站域名</Option>
                <Option value="有网站">有网站</Option>
                <Option value="无网站">无网站</Option>
              </Select>
              {/* <Select defaultValue="网站备案时间" onChange={e => this.handleChange(4, e)} style={{ marginRight: '15px' }}>
                <Option value="d1">Jack</Option>
                <Option value="d2">Lucy</Option>
                <Option value="d3">yiminghe</Option>
              </Select> */}
              <Button onClick={() => { this.customHandleChangeEstablish(2) }} style={{ marginRight: '15px' }} >{webRecordTime}</Button>
              <Select value={seekRecruit} onChange={e => this.handleChange(5, e)} style={{ marginRight: '15px' }}>
                <Option value="招聘情况">招聘情况</Option>
                <Option value="有招聘信息">有招聘信息</Option>
                <Option value="无招聘信息">无招聘信息</Option>
              </Select>
              {/* <Select defaultValue="职位发布时间" onChange={e => this.handleChange(6, e)} style={{ marginRight: '15px' }}>
                <Option value="f1">Jack</Option>
                <Option value="f2">Lucy</Option>
              </Select> */}
              <Button onClick={() => { this.customHandleChangeEstablish(3) }} style={{ marginRight: '15px' }} >{releaseTime}</Button>
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: (!dataList.resultFlag || dataList.result.length <= 0) ? "block" : "none" }}>
            <div style={{ textAlign: 'center', padding: '20px' }}><img src={imgURL}></img></div>
            <div style={{ textAlign: 'center', fontSize: '17px' }}>暂无数据</div>
          </div>
          <div style={{ display: (dataList.resultFlag && dataList.result.length > 0) ? "block" : "none" }}>
            <div style={{
              height: "52px", lineHeight: "52px", backgroundColor: "#ccc",
              borderTop: "1px solid #e8e8e8",
              borderLeft: "1px solid #e8e8e8",
              borderRight: "1px solid #e8e8e8",
            }}>
              <Checkbox style={{ padding: "0px 20.5px" }} checked={(dataList.result.length === selectedRowKeys.length && dataList.result.length !== 0 && selectedRowKeys.length !== 0) ? true : false} onChange={e => { this.allChange(e) }} />
              <span>{`有${dataList.count}条结果，`}</span>
              <span>{`选中${selectedRowKeys.length}项`}</span>
              <Button type="primary" style={{ margin: "0px 10px" }} onClick={() => { this.customHandleChangeEstablish(4) }}>批量导入</Button>
            </div>
            <Table
              columns={columns}
              dataSource={dataList.result}
              rowKey="id"
              pagination={pagination}
              rowSelection={rowSelection}
              showHeader={false}
              bordered={true}
            />
          </div>
        </div>
        <TheCustomWindownForm
          wrappedComponentRef={this.saveFormRef}
          windowShow={windowShow}
          windowTitle={windowTitle}
          onCancel={this.handleEquipmentCancel}
          onCreate={this.handleEquipmentCreate}
          selectedRowKeys={selectedRowKeys}
          screeningCondition={screeningCondition}
          tarName={this.state.tarName}
        />
        <Drawer
          title="Create a new account"
          width="70%"
          visible={drawerShow}
          headerStyle={{ display: 'none' }}
          drawerStyle={{ backgroundColor: '#f5f5f9' }}
          bodyStyle={{ paddingBottom: 80 }}
          onClose={() => { this.drawerClose() }}
        >
          <Seekcon
            currentCompany={this.state.currentCompany}
            drawerClose={this.drawerClose}
          />
        </Drawer>
      </>
    );
  }
}
