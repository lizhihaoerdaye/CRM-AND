import React ,{Fragment} from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';


const { Option } = Select;

// const EquipmentWindowModal = Form.create({ name: 'form_equipment_modal' })(
    // eslint-disable-next-line
    class EquipmentWindowModal extends React.Component {
        render() {
            const {
                visible,
                onCancel,
                onCreate,
                form,
                banAndClearTitle,
                theCurrentEnterprise,
            } = this.props;
            const { getFieldDecorator } = form;
            const formItemLayout = { labelCol: { span: 4, }, wrapperCol: { span: 14 } }
            const banAndClearTitleArr = ["新增通话宝设备", "删除提示", "禁用提示","启用提示"];
            const deleteCompany = () => {
                if (banAndClearTitle === 0) {
                    return (
                        <Form layout="horizontal">
                            <Form.Item label="所属名称：" {...formItemLayout}>
                                <div>{theCurrentEnterprise?theCurrentEnterprise.COMPANY_NAME:""}</div>
                                {/* {getFieldDecorator('belongsName', {
                                    rules: [{ required: true, message: '请输入所属名称' }],
                                })(<div>{theCurrentEnterprise ? theCurrentEnterprise.COMPANY_NAME : undefined}</div>)} */}
                            </Form.Item>
                            <Form.Item label="设备重量：" {...formItemLayout}>
                                {getFieldDecorator('weight', { initialValue:undefined})(<InputNumber />)}
                                <span>KG</span>
                            </Form.Item>
                            <Form.Item label="使用类型：" {...formItemLayout}>
                                {getFieldDecorator('useType', {
                                    rules: [{ required: true, message: '请选择使用类型' }],
                                    initialValue:"2",
                                })(<Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <Option value="1">租用</Option>
                                    <Option value="2">购买</Option>
                                    </Select>)}
                            </Form.Item>
                            <Form.Item label="租/用时限：" {...formItemLayout}>
                            {/* useDutation */}
                            {getFieldDecorator('useDutation', { initialValue:undefined})(<InputNumber />)}
                            <span>月</span>
                            </Form.Item>
                            <Form.Item label="SIM数量：" {...formItemLayout}>
                            {/* simNums */}
                            {getFieldDecorator('simNums', { initialValue:undefined})(<InputNumber />)}
                            <span>个</span>
                            </Form.Item>
                            <Form.Item label="IP地址：" {...formItemLayout}>
                            {/* ipAddr */}
                            {getFieldDecorator('ipAddr', { initialValue:undefined})(<Input />)}
                            </Form.Item>
                        </Form>
                    )
                } else if (banAndClearTitle === 1) {
                    return <span style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: "500", fontSize: "16px", lineHeight: "22px" }}>是否删除该企业</span>
                } else if (banAndClearTitle === 2) {
                    return <span style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: "500", fontSize: "16px", lineHeight: "22px" }}>是否禁用该企业</span>
                }else if(banAndClearTitle === 3){
                    return <span style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: "500", fontSize: "16px", lineHeight: "22px" }}>是否启用该企业</span>
                }
            }
            return (
                <Modal
                    centered={true}
                    visible={visible}
                    title={banAndClearTitleArr[banAndClearTitle]}
                    okText={banAndClearTitle === 0 ? "保存" : "确定"}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    {deleteCompany()}
                    {/* <Form  layout="horizontal">
            
              <Form.Item label="所属名称：" {...formItemLayout}>

              </Form.Item>
              
            </Form> */}
                </Modal>
            );
        }
    }
// );

export default EquipmentWindowModal