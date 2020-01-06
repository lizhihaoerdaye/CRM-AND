import React, { Fragment } from 'react';
import { Modal, Form, Input, Radio ,DatePicker ,Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const { TextArea } = Input
moment.locale('zh-cn');
@connect(({ versionManagement }) => ({
    versionManagement,
}))
class AppVersionTipsWindown extends React.Component {
    render() {
        const {
            form,
            popupLayer,
            onCancel,
            onCreate,
            currentState,
            currentVersion,
            reservationUpdateRadio,
            inputDisplay,
            updateGroup,
            updateGroupText,
            lastAppVersion,
        } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = { labelCol: { span: 4, }, wrapperCol: { span: 14 } }
        const formItemLayoutTow = { wrapperCol: { span: 14 ,offset:4} }
        const currentStateArr = ["新增版本", "编辑版本"];
        // console.log(currentVersion);
        const deleteCompany = () => {
            // if (currentState === 0 || currentState === 1) {
            return (
                <Fragment>
                    <Form layout="horizontal">
                        <Form.Item label="app版本号：" {...formItemLayout}>
                            {getFieldDecorator("newVersion",{initialValue: currentVersion ? currentVersion.newVersion : undefined })(<Input />)}
                        </Form.Item>
                        <Form.Item label="app地址：" {...formItemLayout}>
                            {getFieldDecorator("apkFileUrl",{initialValue: currentVersion ? currentVersion.apkFileUrl : undefined })(<TextArea  rows={3}/>)}
                        </Form.Item>
                        <Form.Item label="log简介：" {...formItemLayout}>
                            {getFieldDecorator("updateLog",{initialValue: currentVersion ? currentVersion.updateLog : undefined })(<TextArea rows={4} />)}
                        </Form.Item>
                        <Form.Item label="强制更新：" {...formItemLayout}>
                            {getFieldDecorator("constraint",{initialValue: currentVersion ? currentVersion.constraint : true })(<Radio.Group >
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>)}
                        </Form.Item>
                        <Form.Item label="安装包大小：" {...formItemLayout}>
                            {getFieldDecorator("targetSize",{initialValue: currentVersion ? currentVersion.targetSize : undefined })(<Input />)}
                        </Form.Item>
                        <Form.Item label="MD5：" {...formItemLayout}>
                            {getFieldDecorator("newMd5",{initialValue: currentVersion ? currentVersion.newMd5 : undefined })(<Input />)}
                        </Form.Item>
                        <Form.Item label="预升级时间：" {...formItemLayout}>
                            {getFieldDecorator("updateTime",{initialValue:(currentVersion&&currentVersion.updateTime)?moment(currentVersion.updateTime):null})(<DatePicker showTime  />)}
                        </Form.Item>
                        <Form.Item label="预更新组：" {...formItemLayout}>
                            {getFieldDecorator("updateGroup",{initialValue:updateGroup})(
                                <Radio.Group onChange = {reservationUpdateRadio}>
                                <Radio value={1}>全体</Radio>
                                <Radio value={2}>预更新组</Radio>
                                </Radio.Group>
                                )}
                        </Form.Item>
                        <Form.Item style={{display:inputDisplay}} label="" {...formItemLayoutTow}>
                            {getFieldDecorator("group",{initialValue:updateGroupText})(<TextArea row={3} />)}
                        </Form.Item>
                    </Form>
                </Fragment>
            )
            // }
        }
        return (
            <Modal
                centered={true}
                visible={popupLayer}
                title={currentStateArr[currentState]}
                okText={"保存"}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Button 
                style={{display:currentState?"none":"", marginBottom:"10px"}}
                onClick={lastAppVersion}
                >导入上一app版本信息</Button>
                {deleteCompany()}
            </Modal>
        );
    }
}
export default AppVersionTipsWindown