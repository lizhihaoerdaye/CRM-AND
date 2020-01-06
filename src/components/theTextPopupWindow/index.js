
import React, { Fragment } from 'react';
import { Modal, Form, Input, DatePicker, } from 'antd';
import moment from 'moment';
moment.locale('zh-cn');

const { TextArea } = Input;

class TheTextPopupWindow extends React.Component {
    textContent=(obj)=>{
        const objJson = JSON.parse(obj);
        const arrText =  objJson.Sentences.map((i,o)=>{
            return (<div key={i.BeginTime} style={{lineHeight:"25px"}}>{`"${i.Text}"`}</div>)
        })
        return(
            <div>{arrText} </div>
        )
    }
    render() {
        const {
            form,
            popupLayer,
            currentRecord,
            onCancel,
            onCreate,
        } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = { labelCol: { span: 5, }, wrapperCol: { span: 17 } }
        const deleteCompany = () => {
                return (
                    <Fragment>
                        <Form layout="horizontal">
                            <Form.Item label="抽查内容：" {...formItemLayout}>
                                {(currentRecord&&currentRecord.recText)?this.textContent(currentRecord.recText):""}
                            </Form.Item>
                            <Form.Item label="公司名称：" {...formItemLayout}>
                                {getFieldDecorator("comName", { initialValue: currentRecord ? currentRecord.comName : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="用户名：" {...formItemLayout}>
                                {getFieldDecorator("userName", { initialValue: currentRecord ? currentRecord.userName : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="抽查人：" {...formItemLayout}>
                                {getFieldDecorator("suserName", { initialValue: currentRecord ? currentRecord.suserName : undefined })(<Input disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="音频地址：" {...formItemLayout}>
                                {getFieldDecorator("recFile",{initialValue:currentRecord?currentRecord.recFile:undefined})(<TextArea rows={4} disabled = {true}/>)}
                            </Form.Item>
                            <Form.Item label="抽查时间：" {...formItemLayout}>
                                {getFieldDecorator("optTime",{initialValue:currentRecord?moment(currentRecord.optTime):null})(<DatePicker disabled={true} showTime />)}
                            </Form.Item>
                        </Form>
                    </Fragment>
                )
        }
        return (
            <Modal
                centered={true}
                visible={popupLayer}
                title={"录音转文字信息"}
                okText={"确定"}
                onCancel={onCancel}
                onOk={onCreate}
            >
                {deleteCompany()}
            </Modal>
        );
    }
}
export default TheTextPopupWindow