
import React, { Fragment } from 'react';
import { Modal, Form, Input, DatePicker, } from 'antd';
import moment from 'moment';
moment.locale('zh-cn');
// import { connect } from 'dva';
const { TextArea } = Input;
// const { TreeNode } = Tree;
// @connect(({ roleManagementClone }) => ({
//     roleManagementClone,
// }))
class RecordingPopupWindow extends React.Component {
    render() {
        const {
            form,
            currentRecord,
            popupLayer,
            onCancel,
            onCreate,
        } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = { labelCol: { span: 5, }, wrapperCol: { span: 17 } }
        const isCallOkArr = ["未接通","已接通"];
        const directionArr = ["呼出","呼入"];
        const deleteCompany = () => {
            // if (currentState === 0 || currentState === 1) {
                return (
                    <Fragment>
                        <Form layout="horizontal">
                            <Form.Item label="公司名称：" {...formItemLayout}>
                                {getFieldDecorator("comName", { initialValue: currentRecord ? currentRecord.comName : undefined })(<Input disabled = {true}/>)}
                                {/* TextArea rows={4} */}
                            </Form.Item>
                            <Form.Item label="拨号人：" {...formItemLayout}>
                                {getFieldDecorator("userName", { initialValue: currentRecord ? currentRecord.userName : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="被叫号码：" {...formItemLayout}>
                                {getFieldDecorator("called", { initialValue: currentRecord ? currentRecord.called : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="呼号：" {...formItemLayout}>
                                {getFieldDecorator("caller", { initialValue: currentRecord ? currentRecord.caller : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="接通：" {...formItemLayout}>
                                {getFieldDecorator("isCallOk", { initialValue: currentRecord ? isCallOkArr[currentRecord.isCallOk] : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="振铃时间：" {...formItemLayout}>
                                {getFieldDecorator("routedTime",{initialValue:currentRecord?moment(currentRecord.routedTime):null})(<DatePicker disabled={true} showTime />)}
                            </Form.Item>
                            <Form.Item label="通话时长：" {...formItemLayout}>
                                {getFieldDecorator("duration",{initialValue:currentRecord?`${currentRecord.duration}s`:undefined})(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="录音文件地址：" {...formItemLayout}>
                                {getFieldDecorator("recFile",{initialValue:currentRecord?currentRecord.recFile:undefined})(<TextArea rows={4} disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="开始时间：" {...formItemLayout}>
                                {getFieldDecorator("begTime",{initialValue:currentRecord?moment(currentRecord.begTime):null})(<DatePicker disabled={true} showTime />)}
                            </Form.Item>
                            <Form.Item label="结束时间：" {...formItemLayout}>
                                {getFieldDecorator("endTime",{initialValue:currentRecord?moment(currentRecord.endTime):null})(<DatePicker disabled={true} showTime />)}
                            </Form.Item>
                            <Form.Item label="呼入与呼出：" {...formItemLayout}>
                                {getFieldDecorator("direction", { initialValue: currentRecord ? directionArr[currentRecord.direction] : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                        </Form>
                    </Fragment>
                )
        }
        return (
            <Modal
                centered={true}
                visible={popupLayer}
                title={"录音信息"}
                okText={"确定"}
                onCancel={onCancel}
                onOk={onCreate}
            >
                {deleteCompany()}
            </Modal>
        );
    }
}
export default RecordingPopupWindow