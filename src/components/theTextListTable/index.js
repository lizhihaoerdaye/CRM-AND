import React, { Fragment } from "react";
import { Icon, Table } from "antd";
import moment from 'moment';
moment.locale('zh-cn');


class TheTextListTable extends React.Component {
    render() {
        const {
            tableList,
            loading,
            paginationChange,
            paginationSizeChange,
            eyeClick,
        } = this.props;
        const columns = [
            {
                title: '公司名称',
                dataIndex: 'comName',
                align: 'center',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                align: 'center',
            },
            {
                title: '抽查人',
                dataIndex: 'suserName',
                align: 'center',
            },
            {
                title: '抽查内容',
                dataIndex: 'recText',
                align: 'center',
                render:(text)=>{
                    const textStr = JSON.parse(text);
                    const arrA = []
                    textStr.Sentences.map((val,ind)=>{
                        if(val.Text){
                            arrA.push(val.Text)
                        }
                    })
                    return(
                        <div style={{ maxWidth: 400, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" ,margin:'auto'}}>{arrA}</div>
                    )
                }
            },
            {
                title: '音频地址',
                dataIndex: 'recFile',
                align: 'center',
                render: (text, record) => {
                    if (text) {
                        return (
                            <Fragment><div style={{ maxWidth: 300, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{text}</div></Fragment>
                        )
                    } else {
                        return (
                            <Fragment>-</Fragment>
                        )
                    }
                }
            },
            {
                title: '抽查时间',
                dataIndex: 'optTime',
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
                title: '操作',
                dataIndex: 'noneDataIndex',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>
                            <span style={{ cursor: "pointer" }} onClick={()=>{eyeClick(record)}}><Icon type="eye" /></span>
                        </Fragment>

                    )
                }
            }
        ]
        const pagination = {
            current: tableList.page,
            defaultPageSize: 10,
            showSizeChanger: true,
            total: tableList.total,
            showTotal: (total, range)=>`显示第${range[0]}条到${range[1]}条记录，共${total}条数据`,
            onChange: paginationChange,
            onShowSizeChange: paginationSizeChange,
        };
        return (
            <Table
                bordered={true}
                dataSource={tableList.list}
                pagination={pagination}
                columns={columns}
                size="small"
                loading={loading}
            />
        );
    }
}
export default TheTextListTable