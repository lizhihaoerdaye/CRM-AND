import React from 'react';


import moment from 'moment';
import { Input, Tag, Select, Cascader, Button, Descriptions, Table, Row, Col } from 'antd';
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
@connect(({ Seek, conterModels }) => ({
  Seek,
  conterModels
}))
export default class Seekcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seek: '5',
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
    const { dispatch } = this.props;
    dispatch({
      type: "conterModels/pagingFn",
      payload: {
        page: page - 1,
      }
    })
  }
  _showTotal = (total, range) => {
    return `共${total}条`
  }

  render () {
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
          <div className={styles.seekerHeadInfo}>湖南企捷信息科技有限公司</div>
          <Button className={styles.seekerHeadBut}>关闭</Button >
          <Button type="danger" className={styles.seekerHeadBut}>导入客户</Button >
        </div>
        <div className={styles.seekerContent}>
          <Row gutter={[10, 10]}>
            <Col span={18}>
              <div className={styles.contentLeft}>
                <div>
                  <Descriptions title="基本信息">
                    <Descriptions.Item label="企业法人">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="成立时间">1810000000</Descriptions.Item>
                    <Descriptions.Item label="注册资金">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="经营状态">empty</Descriptions.Item>
                    <Descriptions.Item label="企业网址" span={2}>
                      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                    <Descriptions.Item label="所属行业" span={3}>empty</Descriptions.Item>
                    <Descriptions.Item label="企业地址" span={3}>empty</Descriptions.Item>
                  </Descriptions>
                </div>
                <div>
                  <Descriptions title="基本信息">
                    <Descriptions.Item label="企业法人">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="成立时间">1810000000</Descriptions.Item>
                    <Descriptions.Item label="注册资金">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="经营状态">empty</Descriptions.Item>
                    <Descriptions.Item label="企业网址" span={2}>
                      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                    <Descriptions.Item label="所属行业" span={3}>empty</Descriptions.Item>
                    <Descriptions.Item label="企业地址" span={3}>empty</Descriptions.Item>
                  </Descriptions>
                </div>
                <div>
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
                <Descriptions title={'联系电话（' + this.state.seek + ')'}>
                  <Descriptions.Item span={3}><span style={{ fontWeight: 'bold' }}>联系人1</span></Descriptions.Item>
                  <Descriptions.Item label="电话" span={3}>1810000000</Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={3}>512539435@qq.com</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item span={3}><span style={{ fontWeight: 'bold' }}>联系人2</span></Descriptions.Item>
                  <Descriptions.Item label="电话" span={3}>1810000000</Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={3}>512539435@qq.com</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item span={3}><span style={{ fontWeight: 'bold' }}>联系人3</span></Descriptions.Item>
                  <Descriptions.Item label="电话" span={3}>1810000000</Descriptions.Item>
                  <Descriptions.Item label="邮箱" span={3}>512539435@qq.com</Descriptions.Item>
                </Descriptions>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
