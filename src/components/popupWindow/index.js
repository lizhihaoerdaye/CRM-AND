import React from 'react';
import{ Modal , Form ,Input,Select,Radio,InputNumber,DatePicker } from 'antd';
import moment from 'moment';
moment.locale('zh-cn');
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const areaJson = require('@/../mock/geographic/area.json');
const industryJson = require('@/../mock/geographic/industry.json');
// const CollectionCreateForms = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class CollectionCreateForms extends React.Component {
      initialValueShow = (obj,srt)=>{
        if(obj && obj[srt]){
          return obj[srt]
        }else{
          return undefined
        }
      }
      inputDisabled = (obj,srt) =>{
        if(obj && obj[srt]){
          return true
        }else{
          return false
        }
      }
      defaultPayState =(obj,srt)=>{
        if(obj&&obj[srt]){
          return  obj[srt]
        }else{
          return 0
        }
      }
      defaultSexState = (obj,srt)=>{
        if(obj&&obj[srt]){
          return  String(obj[srt]);
        }else{
          return "0"
        }
      }
      defaultAccountLimitNums = (obj,srt)=>{
        if(obj&&obj[srt]){
          return obj[srt]
        }else{
          return 5
        }
      }
      defaultStartAndEndTime = (obj,str)=>{
        if(obj&&obj[str]){
          return moment(obj[str], dateFormat)
        }else{
          return undefined
        }
      }
      defaultRoleName = (customerRoleObj, obj,str)=>{
        const arr = [];
        if(obj&&obj[str]){
          customerRoleObj.result.map((val,ind)=>{
            if(val.roleName === obj[str]){
              arr.push(val);
            }
          })
          return arr[0]?arr[0].id:""
        }else{
          return ""
        }
      }
      render() {
        const { 
            visible, 
            onCancel, 
            onCreate, 
            form,
            newAndModify,  //  标题企业新增还是修改
            stateArray,    //   地区(省)
            stateArrayTow,  // 地区(市)
            stateArrayThree, // 地区(县) 
            selectNameChange, // 地区(省)选中时触发的方法
            selectNameChangeTow,//地区(市)选中时触发的方法
            selectNameChangeThree,// 地区(县)选中时触发的方法
            industryOne, // 一级行业
            industryTow, //  二级行业
            industryChangeOne, //  一级行业选择时
            industryChangeTow, //  二级行业选择时
            customerRole, //  客户角色列表
            theCurrentEnterprise, //  当前的客户
            industryDefaultOne, //  一级行业默认值
            industryDefaultTow, //  二级行业默认值
            regionDefaultProvince,// 地区默认省
            regionDefaultCity, // 地区默认市
            regionDefaultArea,// 地区默认区
            startTimeChange,//  开始时间选择
            endTimeChange,//  结束时间选择
          } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = { labelCol: { span: 4, }, wrapperCol: { span: 18 }}
        const modalPayment =["未付费","第一次付费","欠费关停","续费","退费关停"];
        const modalNames = stateArray.map((val,ind)=>{
            return <Option key={ind} value={val.code}>{val.name}</Option>
        })
        const modalNamesTow = stateArrayTow.map((val,ind)=>{
            return <Option key={ind} value={val.code}>{val.name}</Option>
        })
        const modalNamesThree = stateArrayThree.map((val,ind)=>{
            return <Option key={ind} value={val.code}>{val.name}</Option>
        })
        const modalIndustry = industryOne.map((val,ind)=>{
            return <Option key={ind} value={val.indCode}>{val.indName}</Option>
        })
        const modalIndustryTow = industryTow.map((val,ind)=>{
            return <Option key={ind} value={val.indCode}>{val.indName}</Option>
        })
        const modalCustomerRole =customerRole?customerRole.result.map((val,ind)=>{
            return <Option key={ind} value={val.id}>{val.roleName}</Option>
        }):"";
        const modalPaymentSelect = modalPayment.map((val,ind)=>{
            return <Option key={ind} value={ind}>{val}</Option>
        })
        const modalStartTime =<Form.Item label="开始时间：" {...formItemLayout}>
          {/* moment('2015-01-01', dateFormat) */}
        {getFieldDecorator('startTime',{initialValue:this.defaultStartAndEndTime(theCurrentEnterprise,"START_TIME")})(<DatePicker onChange={startTimeChange} format={dateFormat} />)}
      </Form.Item>
      const modalEndTime = <Form.Item label="结束时间：" {...formItemLayout}>
      {getFieldDecorator('endTime',{initialValue:this.defaultStartAndEndTime(theCurrentEnterprise,"END_TIME")})(<DatePicker onChange={endTimeChange} format={dateFormat} />)}
    </Form.Item>
        return (
          <Modal
            centered={true}
            visible={visible}
            title={newAndModify}
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form  layout="horizontal">
                <h2>企业信息</h2>
              <Form.Item label="客户名称：" {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入客户名称' }],
                  initialValue:this.initialValueShow(theCurrentEnterprise,"COMPANY_NAME")
                })(<Input disabled={this.inputDisabled(theCurrentEnterprise,"COMPANY_NAME")}/>)}
              </Form.Item>
              <Form.Item label="客户简称：" {...formItemLayout}>
                {getFieldDecorator('simpleName',{
                    rules:[{required:true,message:'请输入客户简称'}],
                    initialValue:this.initialValueShow(theCurrentEnterprise,"SHORT_NAME"),
                })(<Input disabled={this.inputDisabled(theCurrentEnterprise,"SHORT_NAME")}/>)}
              </Form.Item>
              <Form.Item label="客户电话：" {...formItemLayout}>
                {getFieldDecorator('customerPhone',{
                  initialValue:this.initialValueShow(theCurrentEnterprise,"COMPANY_TEL")
                })(<Input />)}
                {/* <Input /> */}
              </Form.Item>
              <Form.Item label="客户网址：" {...formItemLayout}>
                {getFieldDecorator('customerWww',{
                  initialValue:this.initialValueShow(theCurrentEnterprise,"COMPANY_WEBADDR")
                })(<Input />)}
                {/* <Input />    */}
              </Form.Item>
              <Form.Item label="客户行业：" {...formItemLayout}>
                {getFieldDecorator('customerIndustryOne',{initialValue:industryDefaultOne?industryDefaultOne:""})(
                <Select style={{ width: 130 }} getPopupContainer={triggerNode => triggerNode.parentNode} onChange={industryChangeOne}>
                    <Option value="">一级行业</Option>
                     {modalIndustry}
                </Select>
                )}
                {getFieldDecorator('customerIndustryTow',{initialValue:industryDefaultTow?industryDefaultTow:""})(
                <Select style={{ width: 130 ,marginLeft:10}} getPopupContainer={triggerNode => triggerNode.parentNode} onChange ={industryChangeTow}>
                    <Option value="">二级行业</Option>
                    {modalIndustryTow}
                </Select>
                )}
              </Form.Item>
              <Form.Item label="客户地区：" {...formItemLayout}>
                {/* {getFieldDecorator('customerAddress')(<Input />)} */}
                {getFieldDecorator('customerAddressOne',{initialValue:regionDefaultProvince?regionDefaultProvince:""})(
                <Select style={{ width: 110 }} getPopupContainer={triggerNode => triggerNode.parentNode} onChange={selectNameChange}>
                    <Option value="">请选择</Option>
                    {modalNames}
                </Select>
                )}
                {getFieldDecorator('customerAddressTow',{initialValue:regionDefaultCity?regionDefaultCity:""})(
                <Select style={{ width: 110 ,marginLeft:10}} getPopupContainer={triggerNode => triggerNode.parentNode}  onChange={selectNameChangeTow}>
                    <Option value="">请选择</Option>
                    {modalNamesTow}
                </Select>
                )}
                {getFieldDecorator('customerAddressThree',{initialValue:regionDefaultArea?regionDefaultArea:""})(
                <Select style={{ width: 110 ,marginLeft:10}} getPopupContainer={triggerNode => triggerNode.parentNode} onChange={selectNameChangeThree}>
                    <Option value="">请选择</Option>
                    {modalNamesThree}
                </Select>
                )}
              </Form.Item>
              <Form.Item label="详细地址：" {...formItemLayout}>
                {getFieldDecorator('detailedAddress',{
                  initialValue:this.initialValueShow(theCurrentEnterprise,"ADDRESS")
                })(<Input />)}
                {/* <Input /> */}
              </Form.Item>
              <Form.Item label="客户角色：" {...formItemLayout}>
                {getFieldDecorator('customerRole',{
                    rules:[{required:true,message:'请输入客户角色'}],
                    // initialValue:""
                    initialValue:this.defaultRoleName(customerRole,theCurrentEnterprise,"ROLE_NAME")
                })(<Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                    <Option value="">请选择</Option>
                    {modalCustomerRole}
                    </Select>)}
              </Form.Item>
              <Form.Item label="付费状态：" {...formItemLayout}>
                {getFieldDecorator('paymentSelect',{initialValue:this.defaultPayState(theCurrentEnterprise,"is_paying")})(<Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                    {modalPaymentSelect}
                    </Select>)}
              </Form.Item>
              <h2>联系人信息</h2>
              <Form.Item label="企业联系人：" {...formItemLayout}>
                {getFieldDecorator('enterprise',{
                  initialValue:this.initialValueShow(theCurrentEnterprise,"CONTACTS_USER")
                })(<Input />)}
                {/* <Input /> */}
              </Form.Item>
              <Form.Item label="性别：" {...formItemLayout}>
                {getFieldDecorator('sex',{initialValue:this.defaultSexState(theCurrentEnterprise,"CONTACTS_SEX")})(
                <Radio.Group >
                    <Radio value="0">男</Radio>
                    <Radio value="1">女</Radio>
                    <Radio value="2">保密</Radio>
                </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item label="职务：" {...formItemLayout}>
                {getFieldDecorator('position',{
                  initialValue:this.initialValueShow(theCurrentEnterprise,"CONTACTS_POSITION")
                })(<Input />)}
                {/* <Input /> */}
              </Form.Item>
              <Form.Item label="电话：" {...formItemLayout}>
                {/* <Input /> */}
                {getFieldDecorator('phone',{
                  initialValue:this.initialValueShow(theCurrentEnterprise,"CONTACTS_TEL")
                })(<Input />)}
              </Form.Item>
              <Form.Item label="E-mail：" {...formItemLayout}>
                {/* <Input /> */}
                {getFieldDecorator('eMail',{
                  initialValue:this.initialValueShow(theCurrentEnterprise,"EMAIL")
                })(<Input />)}
              </Form.Item>
              {theCurrentEnterprise?modalStartTime:""}
              {theCurrentEnterprise?modalEndTime:""}
              <Form.Item label="号码上限：" {...formItemLayout}>
                {getFieldDecorator('limit',{initialValue:this.defaultAccountLimitNums(theCurrentEnterprise,"ACCOUNT_LIMIT_NUMS")})(<InputNumber />)}
                {/* {getFieldDecorator('limit')(<Input />)} */}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  // );

  export default CollectionCreateForms