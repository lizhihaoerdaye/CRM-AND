import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table,Badge } from 'antd';
import styles from './index.less';
import {Link} from 'dva/router';

const statusMap = ['default', 'processing', 'success', 'error'];
const statusArray = ['启用', '禁用'];

class CustomizeFieldTable extends PureComponent {
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
    const { data: { list, pagination }, loading, columns} = this.props;

console.log("777777777777777777777777777777777777777777777");
console.log(list);
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
          scroll={{ y: '200px' }}
          loading={loading}
          rowKey={record => record.companyUuid}
          dataSource={list}
          columns={columns}
          pagination={ false }
          onChange={this.handleTableChange}
          scroll={{ x: 900 }}
        />
      </div>
    );
  }
}

export default CustomizeFieldTable;
