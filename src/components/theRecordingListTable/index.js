import React, { Fragment } from "react";
import { Icon, Table } from "antd";
import moment from 'moment';
moment.locale('zh-cn');


class TheRecordingListTable extends React.Component {
    render() {
        const {
            findByPageList,
            _showTotal,
            loading,
            paginationChange,
            paginationSizeChange,
            eyeClick,
            transMsg,
        } = this.props;
        const columns = [
            {
                title: '公司名称',
                dataIndex: 'comName',
                align: 'center',
            },
            {
                title: '拨号人',
                dataIndex: 'userName',
                align: 'center',
                render: (text, record) => {
                    if (text) {
                        return (
                            <Fragment>{text}</Fragment>
                        )
                    } else {
                        return (
                            <Fragment>-</Fragment>
                        )
                    }
                }
            },
            {
                title: '被叫号码',
                dataIndex: 'called',
                align: 'center',
            },
            {
                title: '呼号',
                dataIndex: 'caller',
                align: 'center',
            },
            {
                title: '接通',
                dataIndex: 'isCallOk',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>{text === 0 ? "未接通" : "已接通"}</Fragment>
                    )
                }
            },
            {
                title: '振铃时间',
                dataIndex: 'routedTime',
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
                title: '通话时长',
                dataIndex: 'duration',
                align: 'center',
                render: (text, record) => {
                    if (text) {
                        return (
                            <Fragment>{`${text}s`}</Fragment>
                        )
                    } else {
                        return (
                            <Fragment>-</Fragment>
                        )
                    }
                }
            },
            {
                title: '录音文件地址',
                dataIndex: 'recFile',
                align: 'center',
                width: 150,
                render: (text, record) => {
                    if (text) {
                        return (
                            <Fragment><div style={{ width: 150, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{text}</div></Fragment>
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
                dataIndex: 'begTime',
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
                title: '结束时间',
                dataIndex: 'endTime',
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
                title: '呼入与呼出',
                dataIndex: 'direction',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>{text === 0 ? "呼出" : "呼入"}</Fragment>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'noneDataIndex',
                align: 'center',
                render: (text, record) => {
                    return (
                        <Fragment>
                            <span style={{ cursor: "pointer" }} onClick={() => { eyeClick(record) }}><Icon type="eye" /></span>
                            <span style={{ margin: "0 5px", cursor: 'pointer' }} onClick={() => { transMsg(record) }}><Icon type="message" /></span>
                        </Fragment>

                    )
                }
            }
        ]
        const pagination = {
            current: findByPageList.page,
            defaultPageSize: 10,
            showSizeChanger: true,
            total: findByPageList.total,
            showTotal: _showTotal,
            onChange: paginationChange,
            onShowSizeChange: paginationSizeChange,
        };
        return (
            <Table
                bordered={true}
                dataSource={findByPageList.list}
                pagination={pagination}
                rowKey="ID" // 唯一性
                columns={columns}
                size="small"
                loading={loading}
            />
        );
    }
}
export default TheRecordingListTable