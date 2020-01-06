import React, { Fragment } from 'react';


import moment from 'moment';
import { Input, Tag, Select, Cascader, Button, Descriptions, Table, Row, Col, Modal, Form, Radio } from 'antd';
import { connect } from 'dva';
const styles = require('./index.less');
const { Search } = Input;
const { Option } = Select;
const { CheckableTag } = Tag;

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    align: 'center',
  },
  {
    title: '职位',
    dataIndex: 'postion',
    align: 'center',
  },
];
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render () {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } }
      return (
        <Modal
          visible={visible}
          title="客户导入"
          okText="确定"
          entered={true}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <Form.Item label="导入位置" {...formItemLayout}>
              {getFieldDecorator('typeCustomer', {
                initialValue: '0',
              })(
                <Radio.Group>
                  <Radio value="0">我的客户</Radio>
                  <Radio value="1">临时客户</Radio>
                  <Radio value="2">公共客户</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
)
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//   },
// ];
@connect(({ Seek, indexModels }) => ({
  Seek,
  indexModels,
}))
export default class Seekcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      comTypeCode: ['', '有限', '股份有限', '有限合伙', '普通合伙', '国企', '外商', '联营', '个体户', '个人独资企业', '全民所有制', '集体所有制', '合作社', '股份合作制']
    };
  }

  // componentWillMount() {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type:"conterModels/allConversionPage",
  //     payload:{
  //       size:10,
  //     }
  //   })
  // }
  paginationChange = (page, pageSize) => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: "conterModels/pagingFn",
    //   payload: {
    //     page: page - 1,
    //   }
    // })
  }
  _showTotal = (total, range) => {
    return `共${total}条`
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  // 导入客户
  importCustomer = () => {
    this.setState({
      visible: true,
    })
  }
  // 导入弹窗点击取消
  handleCancel = () => {
    const { form } = this.formRef.props;
    this.setState({
      visible: false,
    }, () => {
      form.resetFields();
    })
  }

  // 导入弹窗点击确定
  handleCreate = (e) => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.setState({
          visible: false,
        }, () => {
          form.resetFields();
        })
      }
    })
  }

  render () {
    // if(this.props){}
    console.log(this.props)
    const { currentCompany, drawerClose } = this.props
    const { comTypeCode } = this.state
    const phone = currentCompany.phone ? currentCompany.phone.split(';') : [];
    // const { conterModels: { allTableList, firstPageList } } = this.props
    // const pagination = {
    //   defaultPageSize: 10,
    //   // showSizeChanger: true,
    //   showTotal: this._showTotal,
    //   total: allTableList.length,
    //   onChange: this.paginationChange,
    // }
    return (
      <div className={styles.seeker}>
        <div className={styles.seekerHead}>
          <div className={styles.seekerHeadInfo}>{currentCompany.comName}</div>
          <Button className={styles.seekerHeadBut} onClick={drawerClose}>关闭</Button >
          <Button type="danger" className={styles.seekerHeadBut} style={{ dispatch: !currentCompany.isExist ? 'block' : 'none' }} onClick={this.importCustomer}>导入客户</Button >
        </div>
        <div className={styles.seekerContent}>
          <Row gutter={[10, 0]}>
            <Col span={18} >
              <div className={styles.contentLeft}>
                <div>
                  <Descriptions title="基本信息">
                    <Descriptions.Item label="企业法人">{currentCompany.corporate}</Descriptions.Item>
                    <Descriptions.Item label="成立时间">{currentCompany.establishTime ? moment(currentCompany.establishTime).format("YYYY-MM-DD") : ''}</Descriptions.Item>
                    <Descriptions.Item label="注册资金">{currentCompany.registeredMoney ? `${currentCompany.registeredMoney}万` : ''}</Descriptions.Item>
                    <Descriptions.Item label="经营状态">{currentCompany.businessState}</Descriptions.Item>
                    <Descriptions.Item label="企业网址" span={2}>
                      {currentCompany.website}
                    </Descriptions.Item>
                    <Descriptions.Item label="所属行业" span={3}>{currentCompany.industry}</Descriptions.Item>
                    <Descriptions.Item label="企业地址" span={3}>{currentCompany.comAddress}</Descriptions.Item>
                  </Descriptions>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <Descriptions title="工商信息">
                    <Descriptions.Item label="公司类型" span={3}>{currentCompany.comTypeCode ? comTypeCode[currentCompany.comTypeCode] : comTypeCode[0]}</Descriptions.Item>
                    <Descriptions.Item label="统一社会信用代码" span={3}>1810000000</Descriptions.Item>
                    <Descriptions.Item label="经营范围" span={3}>Hangzhou, Zhejiang</Descriptions.Item>
                  </Descriptions>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <Descriptions title="网站备案信息">
                    <Descriptions.Item label="审核时间" >{currentCompany.icpReviewTime ? moment(currentCompany.icpReviewTime).format("YYYY-MM-DD") : ''}</Descriptions.Item>
                    <Descriptions.Item label="更新时间" span={2}>{currentCompany.lastIndexTime ? moment(currentCompany.lastIndexTime).format("YYYY-MM-DD") : ''}</Descriptions.Item>
                    <Descriptions.Item label="网站地址" span={3}>{}</Descriptions.Item>
                    <Descriptions.Item label="网站推广" span={3}>{currentCompany.searchPromotion}</Descriptions.Item>
                  </Descriptions>
                </div>
                <div style={{ marginTop: '16px' }}>
                  {/* <Table
                    bordered={true}
                    columns={columns}
                    dataSource={firstPageList}
                    pagination={pagination}
                    rowKey="id" // 唯一性
                    size="middle"
                  /> */}
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className={styles.contentRigth}>
                <Descriptions title={'联系电话（' + (`${phone.length > 0 ? phone.length - 1 : 0}`) + ')'}>
                  {phone.length ? phone.map((val, ind) => {
                    if (ind < phone.length - 1) {
                      return (
                        <Fragment key={ind}>
                          <Descriptions.Item span={3}><span style={{ fontWeight: 'bold' }}>{`联系人${ind + 1}`}</span></Descriptions.Item>
                          <Descriptions.Item label="电话" span={3}>{val}</Descriptions.Item>
                          {/* <Descriptions.Item label="邮箱" span={3}>512539435@qq.com</Descriptions.Item> */}
                        </Fragment>
                      )
                    }
                  }) : ''}
                </Descriptions>
                {/* <Descriptions title={'联系电话（' + this.state.seek + ')'}>
                  <Descriptions.Item span={3}><span style={{ fontWeight: 'bold' }}>联系人1</span></Descriptions.Item>
                  <Descriptions.Item label="电话" span={3}>1810000000</Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={3}>512539435@qq.com</Descriptions.Item>
                </Descriptions> */}
                {/* <Descriptions>
                  <Descriptions.Item span={3}><span style={{ fontWeight: 'bold' }}>联系人2</span></Descriptions.Item>
                  <Descriptions.Item label="电话" span={3}>1810000000</Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={3}>512539435@qq.com</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item span={3}><span style={{ fontWeight: 'bold' }}>联系人3</span></Descriptions.Item>
                  <Descriptions.Item label="电话" span={3}>1810000000</Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={3}>512539435@qq.com</Descriptions.Item>
                </Descriptions> */}
              </div>
            </Col>
          </Row>
        </div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
