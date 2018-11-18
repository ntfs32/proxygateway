import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import * as userActions from '../../../actions/user'
import './index.css';

const FormItem = Form.Item;
class Login extends Component {
  constructor (props) {
    super(props)
  }


  AddCount = () => {
    this.props.numberActions.addCount(1)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.userActions.loginAction(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input size='large' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input size='large' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
            )}
          </FormItem>
          <FormItem>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className='login-form-remember'>Remember me</Checkbox>
            )} */}
            <a className='login-form-forgot' href=''>Forgot password</a>
            <Button size='large' type='primary' htmlType='submit' className='login-form-button'>
              登陆
            </Button>
            {/* Or <a href=''>register now!</a> */}
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

const FormLogin = Form.create()(Login);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormLogin);