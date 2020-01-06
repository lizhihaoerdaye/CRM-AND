import React, { Fragment } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker,Radio,Checkbox,Tag} from 'antd';
import { connect } from 'dva';
const styles = require('./index.less');
const CheckboxGroup = Checkbox.Group;
@connect(({ indexModels }) => ({
    indexModels,
}))
class TheCustomWindown extends React.Component {
    render() {
        const {
            form,
            windowShow,
            onCancel,
            onCreate,
            windowTitle,
            selectedRowKeys, // 被选中的id
            indexModels:{tableList},
            screeningCondition,// 筛选条件
            tarName,// 标签里的名称
        } = this.props;
        const { getFieldDecorator } = form;
        const {  RangePicker } = DatePicker;
        const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 12 } }
        const formItemLayoutImport = { labelCol: { span: 6, }, wrapperCol: { span: 18 } };
        const allFormItemImport = { labelCol: { span: 4, }, wrapperCol: { span: 18 } };
        const filter = { labelCol: { span: 4, }, wrapperCol: { span: 20 } };
        const currentStateArr = ["成立时间自定义","企业类型自定义","网站备案时间","职位发布时间","批量导入","客户导入","保存筛选条件","确定删除"];
        const customerLocation = ["我的客户","临时客户","公共客户"];
        const screeningConditionArr = [];
        if(screeningCondition){
            for(let i in screeningCondition){
                if(screeningCondition[i] !== screeningCondition.keyWord){
                    screeningConditionArr.push(screeningCondition[i])
                }
            }
        }
        const deleteCompany = () => {
            if (windowTitle === 0 ||windowTitle === 2 ||windowTitle === 3) {
                return (
                    <Fragment>
                        <Form layout="horizontal">
                            <Form.Item label="选择时间：" {...formItemLayout}>
                                {getFieldDecorator("startTime")(<RangePicker onChange={(date,dateString)=>{console.log(date, dateString)}} />)}
                            </Form.Item>
                        </Form>
                    </Fragment>
                )
            } else if(windowTitle === 1){
                return (
                    <Fragment>
                    <Form layout="horizontal">
                        <Form.Item label="从：" {...formItemLayout}>
                            {getFieldDecorator("startMoney")( <Input  suffix="万"/>)}
                        </Form.Item>
                        <Form.Item label="到：" {...formItemLayout}>
                            {getFieldDecorator("endMoney")(<Input  suffix="万"/>)}
                        </Form.Item>
                    </Form>
                </Fragment>
                )
            } else if(windowTitle === 4){
                return (
                <Fragment>
                    <Form layout="horizontal">
                        <Form.Item style={{marginBottom:"0px"}} label="导入位置：" { ...allFormItemImport }>
                            {getFieldDecorator("importLocation",{initialValue:0})(
                                <Radio.Group>
                                    {customerLocation.map((val,ind)=>{
                                        return <Radio key={val} value={ind}>{val}</Radio>
                                    })}
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <ul style={{width:"100%" ,listStyleType: "disc",padding:"0 0 0 24px",marginBottom:"0px"}}>
                            <li>{`根据您的查询条件，找到相关结果： ${tableList.length}条，当前已选中 ${selectedRowKeys.length} 条`}</li>
                            <li>您当前我的客户库容已使用 200 条，剩余 800 条；将按顺序导入前 800 条</li>
                            <li>您当前临时客户库容已使用 200 条，剩余 800 条；将按顺序导入前 800 条</li>
                        </ul>
                        <Form.Item style={{marginBottom:"0px"}}  label="" { ...filter }>
                            {getFieldDecorator("noContact")(
                                <Checkbox.Group>
                                    <Checkbox value="0" >去除无联系方式的企业（检测到您未使用联系电话筛选）</Checkbox >
                                </Checkbox.Group>
                            )}
                        </Form.Item>
                        <Form.Item style={{marginBottom:"0px"}} label="" { ...filter }>
                            {getFieldDecorator("cancellation",)(
                                <Checkbox.Group>
                                    <Checkbox value="0">去除已注销的企业（检测到您未使用经营状态筛选）</Checkbox >
                                </Checkbox.Group>
                            )}
                        </Form.Item>
                    </Form>
                </Fragment>
                )
            } else if(windowTitle === 5){
                return (
                <Fragment>
                    <Form layout="horizontal">
                        <Form.Item label="导入位置：" {...formItemLayoutImport}>
                            {getFieldDecorator("importLocation",{initialValue:0})(
                                <Radio.Group>
                                    {customerLocation.map((val,ind)=>{
                                        return <Radio key={val} value={ind}>{val}</Radio>
                                    })}
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Form>
                </Fragment>
                )
            } else if(windowTitle === 6){
                return (
                    <Fragment>
                        
                        <Form layout="horizontal">
                            <div style = {{display:screeningCondition.keyWord?"block":"none",paddingLeft:"40px",marginBottom:"10px"}}>
                                <label style={{color:"#000000"}}>搜索关键词：</label><span>{screeningCondition.keyWord?screeningCondition.keyWord:""}</span>
                            </div>
                            <div style = {{display:(screeningConditionArr && screeningConditionArr.length !== 0)?"block":"none",paddingLeft:"40px",marginBottom:"10px"}}>
                                <label style={{color:"#000000"}}>已选条件：</label>
                                {(screeningConditionArr && screeningConditionArr.length !== 0)? screeningConditionArr.map((val,ind)=>{
                                    if(val instanceof Array){
                                        if(val.length > 0){
                                            return <Tag key={ind} color="#108ee9">{val.join("/ ")}</Tag>
                                        }
                                    }else{
                                        return <Tag key={ind} color="#108ee9">{val}</Tag>
                                    }
                                }):""}
                            </div>
                            <Form.Item label="名称：" {...filter}>
                            {getFieldDecorator("name")(<Input/>)}
                            </Form.Item>
                        </Form>
                    </Fragment>
                    ) 
            } else if(windowTitle === 7){
                return(
                    <Fragment>
                        <Form layout="horizontal" style={{textAlign:"center"}}>
                            <p style={{marginBottom:"24px",fontSize:"15px"}}>确认删除<span style={{fontWeight:"700"}}>{tarName}</span></p>
                        </Form>
                    </Fragment>
                )
            }
        }
        return (
            <Modal
                centered={true}
                visible={windowShow}
                title={currentStateArr[windowTitle]}
                okText={(windowTitle===4||windowTitle==5)?"开始导入":"确定"}
                onCancel={onCancel}
                onOk={onCreate}
            >
                {deleteCompany()}
            </Modal>
        );
    }
}
export default TheCustomWindown