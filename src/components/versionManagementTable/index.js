import React ,{Fragment}from "react";
import { Icon ,Table} from "antd";
import moment from 'moment';
moment.locale('zh-cn');

class VersionManagementTable extends React.Component {
    render() {
        const { 
            appList,
            loading,
            equipmentClick,
            _showTotal,
            paginationChange,
            paginationSizeChange,
        } = this.props;
        const columns = [
            {
                title: "App版本号",
                dataIndex: "newVersion",
                align: 'center',
            },
            {
                title: "App地址",
                dataIndex: "apkFileUrl",
                align: 'center',
            },
            {
                title: "log简介",
                dataIndex: "updateLog",
                align: 'center',
            },
            {
                title: "强制更新",
                dataIndex: "constraint",
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>{text ? "是" : "否"}</Fragment>
                    )
                }
            },
            {
                title: "安装包大小",
                dataIndex: "targetSize",
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>{text ? text : "-"}</Fragment>
                    )
                }
            },
            {
                title: "安装包MD5指纹",
                dataIndex: "newMd5",
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>{text ? text : "-"}</Fragment>
                    )
                }
            },
            {
                title: "预升级时间",
                dataIndex: "updateTime",
                align: 'center',
                render: (text, record) => {
                    if (text) {
                        return (
                            <Fragment>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</Fragment>
                        )
                    } else {
                        return (
                            <Fragment>-</Fragment>
                        )
                    }
                }
            },
            {
                title:"预更新组",
                dataIndex:"updateGroup",
                align: 'center',                                
                render: (text, render) => {
                    if(!text){
                        return(
                            <span>-</span>
                        )
                    }else{
                        const textJson = JSON.parse(text)
                        if(textJson.flag && textJson.flag === 1){
                            return(
                                <span>全体</span>
                            )
                        }else if(textJson.flag && textJson.flag === 2){
                            return(
                                <div style={{width:160,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",}}><span>{textJson.group.join(",")}</span></div>
                            )
                        }else{
                            return(
                                <span>-</span>
                            )
                        }
                    }
                }
            },
            {
                title: "编辑",
                dataIndex: "noneDataIndex",
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment><span onClick={() => equipmentClick(1, record)} style={{ cursor: "pointer" }}><Icon type="form" /></span></Fragment>
                    )
                }
            },
        ]
        const pagination = {
            current: appList.page,// 当前页
            defaultPageSize: 10, // 默认显示的条数
            showSizeChanger: true, // 是否显示切换条数下拉菜单
            total: appList.total, // 列表总数
            showTotal: _showTotal,
            onChange: paginationChange,
            onShowSizeChange: paginationSizeChange,
        }
        return (
            <Table
            bordered={true}
            dataSource={appList.list}
            pagination={pagination}
            columns={columns}
            loading={loading}
            rowKey="id"
            size="small"
        />
        );
    }
}
export default VersionManagementTable