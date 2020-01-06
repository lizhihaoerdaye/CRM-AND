import React ,{Fragment}from "react";
import { Icon ,Table} from "antd";
import moment from 'moment';
moment.locale('zh-cn');
class JobNumberTable extends React.Component {
    render() {
        const {
            tableList,
            selectedRowKeys,
            onSelectChange,
            _showTotal,
            paginationChange,
            paginationSizeChange,
            currents,
            modelArray,
            handleSetting,
            loading,
        } = this.props;
        const rowSelection = {
            columnTitle: <span></span>,
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
            // hideDefaultSelections: true,
          };
          const pagination = {
            defaultPageSize: 10,
            showSizeChanger: true,
            total: tableList.total,
            showTotal: _showTotal,
            onChange: paginationChange,
            onShowSizeChange: paginationSizeChange,
            current:currents,
          };
        //   const conshss = {
        //     bordered: true,
        //     // loading: loading,
        //     size: 'default',
        //     hideDefaultSelections: false,
        //   };
          const columns = [
            {
              title: '账号',
              dataIndex: 'loginName',
              align: 'center',
            },
            {
              title: '姓名',
              dataIndex: 'userName',
              align: 'center',
            },
            {
              title: '所属公司',
              dataIndex: 'companyName',
              align: 'center',
            },
            {
              title: '云呼模式',
              dataIndex: 'callMode',
              align: 'center',
              render: (text, record) => (
                <Fragment>
                  {modelArray[record.callMode]}
                </Fragment>
              ),
            },
            {
              title: '呼号',
              dataIndex: 'callNum',
              align: 'center',
              render: (text, record) => {
                if(text){
                  return (
                    <Fragment>{text}</Fragment>
                  )
                }else{
                  return (
                    <Fragment>-</Fragment>
                  )
                }
              },
            },
            {
              title: '绑定号码',
              dataIndex: 'telNum',
              align: 'center',
              render: (text, record) => {
                if(text){
                  return (
                    <Fragment>{text}</Fragment>
                  )
                }else{
                  return (
                    <Fragment>-</Fragment>
                  )
                }
              },
            },
            {
              title: '操作',
              dataIndex: 'operation',
              align: 'center',
              render: (text, record) => (
                <Fragment>
                  <a onClick={() => handleSetting(record)}>修改模式</a>
                </Fragment>
              ),
            },
          ];
        return (
            <Table
            // {...conshss}
            bordered= {true}
            size='default'
            dataSource={tableList.result}
            rowKey="userUuid" // 将userUuid绑定到table上
            rowSelection={rowSelection}
            pagination={pagination} // 分页
            columns={columns}
            loading={loading}
          />
        );
    }
}
export default JobNumberTable