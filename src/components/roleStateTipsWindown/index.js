import React, { Fragment } from 'react';
import { Modal, Form, Input, InputNumber, Tree } from 'antd';
import { connect } from 'dva';
const { TextArea } = Input;
const { TreeNode } = Tree;
@connect(({ roleManagement }) => ({
    roleManagement,
}))
class RoleStateTipsWindown extends React.Component {
    renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.permissionName} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} {...item} />;
    });
    render() {
        const {
            popupLayer,
            currentRole,
            currentState,
            onCancel,
            onCreate,
            form,
            roleManagement:{rolePermissionsList,permissionObj},
            chooseArr, // 默认或者被选中的权限id数组
            onCheck, // 选中时调用的方法
        } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = { labelCol: { span: 4, }, wrapperCol: { span: 14 } }
        const currentStateArr = ["新增角色", "编辑角色", "删除提示", "禁用提示", "启用提示"];
        if(currentState===1){
            console.log(permissionObj);
        }
        const deleteCompany = () => {
            if (currentState === 0 || currentState === 1) {
                return (
                    <Fragment>
                        <Form layout="horizontal">
                            <Form.Item label="角色名：" {...formItemLayout}>
                                {getFieldDecorator("roleName", { rules: [{ required: true, message: '请填写角色名' }], initialValue: currentRole ? currentRole.ROLE_NAME : undefined })(<Input />)}
                            </Form.Item>
                            <Form.Item label="备注：" {...formItemLayout}>
                                {getFieldDecorator("remark", { initialValue: currentRole ? currentRole.REMARK : undefined })(<TextArea rows={4} />)}
                            </Form.Item>
                        </Form>
                        <Tree
                            showLine
                            checkable
                            onCheck={onCheck} // 复选框选中时触发
                            checkedKeys={chooseArr} 
                        >
                            {rolePermissionsList.length!==0? this.renderTreeNodes(rolePermissionsList):undefined}
                        </Tree>
                    </Fragment>
                )
            } else if (currentState === 2) {
                return <span style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: "500", fontSize: "16px", lineHeight: "22px" }}>是否删除该企业</span>
            } else if (currentState === 3) {
                return <span style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: "500", fontSize: "16px", lineHeight: "22px" }}>是否禁用该企业</span>
            } else if (currentState === 4) {
                return <span style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: "500", fontSize: "16px", lineHeight: "22px" }}>是否启用该企业</span>
            }
        }
        return (
            <Modal
                centered={true}
                visible={popupLayer}
                title={currentStateArr[currentState]}
                okText={(currentState === 0 || currentState === 1) ? "保存" : "确定"}
                onCancel={onCancel}
                onOk={onCreate}
            >
                {deleteCompany()}
            </Modal>
        );
    }
}
export default RoleStateTipsWindown