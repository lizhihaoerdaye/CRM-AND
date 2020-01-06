import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';
import moment from 'moment';
import {Link} from 'dva/router';

// function initTotalList(columns) {
//   const totalList = [];
//   columns.forEach(column => {
//     if (column.needTotal) {
//       totalList.push({ ...column, total: 0 });
//     }
//   });
//   return totalList;
// }

class CrmCompanyTable extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   const { columns } = props;
  //   const needTotalList = initTotalList(columns);
  //
  //   this.state = {
  //     selectedRowKeys: [],
  //     needTotalList,
  //   };
  // }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedRowKeys: []
  //   };
  // }

  // static getDerivedStateFromProps(nextProps) {
  //   // clean state
  //   if (nextProps.selectedRows.length === 0) {
  //     const needTotalList = initTotalList(nextProps.columns);
  //     return {
  //       selectedRowKeys: [],
  //       needTotalList,
  //     };
  //   }
  //   return null;
  // }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
  }
  //
  // handleRowSelectChange = (selectedRowKeys, selectedRows) => {
  //   let { needTotalList } = this.state;
  //   needTotalList = needTotalList.map(item => ({
  //     ...item,
  //     total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
  //   }));
  //   const { onSelectRow } = this.props;
  //   if (onSelectRow) {
  //     onSelectRow(selectedRows);
  //   }
  //
  //   this.setState({ selectedRowKeys, needTotalList });
  // };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    // const { selectedRowKeys } = this.state;
    // const { data = {}, rowKey, ...rest } = this.props;
    // const { list = [], pagination } = data;
    const { data: { list, pagination }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

  const   columns = [
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
        render: (text, record) => (
          <Fragment>
            <Link to="/alist/alist-show">配置</Link>
          </Fragment>
        ),
      },
    ];

    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.handleRowSelectChange,
    //   getCheckboxProps: record => ({
    //     disabled: record.disabled,
    //   }),
    // };

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={record => record.companyUuid}
          // rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          scroll={{ x: 1000 }}
          loading={loading}
          columns={columns}

        />
      </div>
    );
  }
}

export default CrmCompanyTable;
