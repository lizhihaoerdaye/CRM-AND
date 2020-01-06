import React ,{Fragment}from "react";
import { Icon ,Table} from "antd";
import moment from 'moment';
moment.locale('zh-cn');


class RoleManagementCloneTable extends React.Component {
    render() {
        const { 
            tableRoleList,
            equipmentClick, 
            loading,
            _showTotal,
            paginationChange,
            paginationSizeChange,
        } = this.props;
        const statusArr = ["启用", "禁用"];
        const columns = [
            {
                title: '角色',
                dataIndex: 'roleName',
                align: 'center',
            },
            {
                title: '添加人',
                dataIndex: 'addUserName',
                align: 'center',
            },
            {
                title: '添加时间',
                dataIndex: 'addTime',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>{moment(text).format("YYYY-MM-DD")}</Fragment>
                    )
                }
            },
            {
                title: '是否可用',
                dataIndex: 'status',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment><span style={{ color: text === 0 ? "green" : "red" }}>{statusArr[text]}</span></Fragment>
                    )
                }
            },
            {
                title: '编辑',
                dataIndex: 'noneDataIndex',
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            <span onClick={() => equipmentClick(1, record)} style={{ cursor: "pointer" }}><Icon type="form" /></span>
                            <span onClick={() => { equipmentClick(2, record) }} style={{ margin: "0 10px", cursor: "pointer" }}><Icon type="delete" /></span>
                            <span onClick={() => { equipmentClick(3, record) }} style={{ display: record.status === 0 ? "inline" : "none", cursor: "pointer" }}><Icon type="stop" /></span>
                            <span onClick={() => { equipmentClick(4, record) }} style={{ display: record.status === 1 ? "inline" : "none", cursor: "pointer" }}><Icon type="poweroff" /></span>
                        </div>
                    )
                }
            }
        ]
        const pagination = {
            current: tableRoleList.page,
            defaultPageSize: 10,
            showSizeChanger: true,
            total: tableRoleList.total,
            showTotal: _showTotal,
            onChange: paginationChange,
            onShowSizeChange: paginationSizeChange,
        };
        return (
            <Table
            bordered={true}
            dataSource={tableRoleList.result}
            pagination={pagination}
            rowKey="id" // 唯一性
            columns={columns}
            loading={loading}
        />
        );
    }
}
export default RoleManagementCloneTable