import React ,{Fragment}from "react";
import { Icon ,Table} from "antd";
import moment from 'moment';
moment.locale('zh-cn');


class EnterpriseManagementTable extends React.Component {
    render() {
        const {
            tableList,
            loading,
            areaCodes,
            equipmentClick,
            visibleClick,
            _showTotal,
            paginationChange,
            paginationSizeChange,
        } = this.props;
        const columns = [
            {
                title: '客户名称',
                dataIndex: 'COMPANY_NAME',
                align: 'center',
                width: 150,
                fixed: 'left',
                render:(text, record) => {
                    if(!text && text!==0){
                        return '-'
                    }else{
                        return (
                            <Fragment>{text}</Fragment>
                        )
                    }
                }
            },
            {
                title: '简称',
                dataIndex: 'SHORT_NAME',
                align: 'center',
                render:(text, record) => {
                    if(!text && text!==0){
                        return '-'
                    }else{
                        return (
                            <Fragment>{text}</Fragment>
                        )
                    }
                }  
            },
            {
                title: '客户账号',
                dataIndex: 'LOGIN_NAME',
                align: 'center',
            },
            {
                title: '客户角色',
                dataIndex: 'ROLE_NAME',
                align: 'center',
            },
            {
                title: '地区',
                dataIndex: 'AREA_CODE',
                align: 'center',
                render: (text, record) => {
                    if (text) {
                        const l1 = text.substring(0, 2) + '0000';
                        const l2 = text.substring(0, 4) + '00';
                        const province = areaCodes.get(l1);
                        const theCity = areaCodes.get(l2);
                        const theArea = areaCodes.get(text);
                        let diQu = "";
                        if (province && theCity && theArea) {
                            diQu = province + "-" + theCity + "-" + theArea
                        } else if (province && theCity && !theArea) {
                            diQu = province + "-" + theCity
                        } else if (province && !theCity && !theArea) {
                            diQu = province
                        }
                        // const region 
                        return (
                            <Fragment>{diQu}</Fragment>
                        )
                    } else {
                        return (
                            <Fragment>-</Fragment>
                        )
                    }
                },
            },
            {
                title: '是否开通云呼',
                dataIndex: 'call_mode',
                align: 'center',
            },
            {
                title: '号码数',
                dataIndex: 'ALREADY_NUMBER',
                align: 'center',
                render:(text, record) => {
                    if(!text && text!==0){
                        return '-'
                    }else{
                        return (
                            <Fragment>{text}</Fragment>
                        )
                    }
                }
            },
            {
                title: '已使用号码数',
                dataIndex: 'TNUMS',
                align: 'center',
            },
            {
                title: '实名状态',
                dataIndex: 'VALIDATE_FLAG',
                align: 'center',
                render: (text, record) => {
                    const  textValueArray=["未认证","审核中","审核通过","审核拒绝"]
                    if(!text && text!==0){
                        return '-'
                    }else{
                        return (
                            <Fragment>{textValueArray[text]}</Fragment>
                        )
                    }
                }  
            },
            {
                title:'付费状态',
                dataIndex:"is_paying",
                align:'center',
                render: (text, record) => {
                    let textValue =null;
                    const  textValueArray=["未付费","第一次付费","欠费关停","续费","退费关停"]
                    return (
                        <Fragment>{textValueArray[text]}</Fragment>
                    )
                }
            },
            {
                title: '添加时间',
                dataIndex: 'ADD_TIME',
                align: 'center',
                render: (text, record) => {
                    if (text) {
                        return (
                            <Fragment>
                                {moment(text).format('YYYY-MM-DD')}
                            </Fragment>
                        )
                    } else {
                        return (
                            <Fragment>-</Fragment>
                        )
                    }
                }
            },
            {
                title: '开始时间',
                dataIndex: 'START_TIME',
                align: 'center',
            },
            {
                title: '结束时间',
                dataIndex: 'END_TIME',
                align: 'center',
            },
            {
                title: '最近登入时间',
                dataIndex: 'TIME',
                align: 'center',
                render: (text, record) => {
                    if (text) {
                        return (
                            <Fragment>
                                {moment(text).format('YYYY-MM-DD')}
                            </Fragment>
                        )
                    } else {
                        return (
                            <Fragment>-</Fragment>
                        )
                    }
                }
            },
            {
                title: '账号数',
                dataIndex: 'ZNUMS',
                align: 'center',
            },
            {
                title: '账号数上限',
                dataIndex: 'ACCOUNT_LIMIT_NUMS',
                align: 'center',
            },
            {
                title: '状态',
                dataIndex: 'STATUS',
                align: 'center',
                render: (text, record) => {
                    let time = "";
                    if (text === 0) {
                        time = "启用"
                    } else if (text === 1) {
                        time = "禁用"
                    } else {
                        time = "-"
                    }
                    return (
                        <span style={{ color: text ? "red" : "green" }}>{time}</span>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'vqvfw',
                align: 'center',
                render: (text, record) => {
                    
                    return (
                        <div>
                            <span onClick={()=>{equipmentClick(0,record)}} style={{cursor: 'pointer'}}><Icon type="plus-circle" /></span>
                            <span onClick={()=>visibleClick("编辑",record)} style={{margin:"0 5px",cursor: 'pointer'}}><Icon type="form" /></span>
                            <span onClick={()=>{equipmentClick(1,record)}} style={{margin:"0 5px 0 0",cursor: 'pointer'}}><Icon type="delete" /></span>
                            <span onClick={()=>{equipmentClick(2,record)}} style={{display:record.STATUS===0?"inline":"none",margin:"0 5px 0 0",cursor: 'pointer'}}><Icon type="stop" /></span>
                            <span onClick={()=>{equipmentClick(3,record)}} style={{display:record.STATUS===1?"inline":"none",margin:"0 5px 0 0",cursor: 'pointer'}}><Icon type="poweroff" /></span>
                        </div>
                    )
                }
            },

        ];
        const pagination = {
            current:tableList.page,
            defaultPageSize: 10,
            showSizeChanger: true,
            total: tableList.total,
            showTotal: _showTotal,
            onChange: paginationChange,
            onShowSizeChange: paginationSizeChange,
        };
        return (
            <Table
            bordered={true}
            dataSource={tableList.result}
            pagination={pagination}
            rowKey="ID" // 唯一性
            columns={columns}
            loading={loading}
            scroll={{ x: 2000 }}
            size="small"
        /> 
        );
    }
}
export default EnterpriseManagementTable