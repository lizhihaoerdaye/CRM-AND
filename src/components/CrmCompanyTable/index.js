import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table,Badge } from 'antd';
import styles from './index.less';
import {Link} from 'dva/router';

class CrmCompanyTable extends PureComponent {
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { data: { list, pagination },handleSetting, loading } = this.props;
    const columns = [
      {
        title: '客户名称',
        dataIndex: 'companyName',
      },
      {
        title: '客户账号',
        dataIndex: 'loginName',
      },
      {
        title: '操作者',
        dataIndex: 'userName',
      },
      {
        title: '操作时间',
        dataIndex: 'operateTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY年MM月DD日')}</span>,
      },
      {
        title: '操作',
        dataIndex: 'companyUuid',
        render: (text, record) => (
          <Fragment>
  					<a onClick={() => handleSetting(record)}>去设置</a>
          </Fragment>
        ),
      },
    ];

            // <Link to="/alist/alist-show">配置</Link>
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    //
    // rowSelection={rowSelection}
    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.companyUuid}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          scroll={{ x: 900 }}
        />
      </div>
    );
  }
}

export default CrmCompanyTable;
