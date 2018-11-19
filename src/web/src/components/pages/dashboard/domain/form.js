import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Input, Divider, InputNumber, Select, Spin } from 'antd'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import * as domainActions from '../../../../actions/domain'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
    labelCol: {
        md: { span: 5, offset: 1 },
    },
    wrapperCol: {
        md: { span: 6 },
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        md: { span: 6, offset: 6 },
    },
}
class DomainEdit extends Component {

    constructor(props) {
        super(props)
        this.actionType = _.split(this.props.match.url, '/')[2]
        this.formType = _.get(this.props, 'match.params.type', 'domain')
        this.id = _.toString(_.get(this.props.match, 'params.id', null))
        this.formTypeAction = {
            domain: this.props.domainActions.getAllAction,
            service: this.props.domainActions.getServiceAction,
            server: this.props.domainActions.getServerAction,
            api: this.props.domainActions.getApiAction
        }
        this.formFileds = {
            domain: ['name'],
            service: ['name', 'host', 'description'],
            server: ['ip', 'port', 'protocol', 'weight', 'description'],
            api: ['request_uri', 'original_uri', 'uri_limit_seconds', 'uri_limit_times', 'ip_uri_limit_seconds', 'ip_uri_limit_times', 'description' ]
        }
        this.state = {
            formData: {}
        }
    }

    componentDidMount() {
        const { domain } = this.props
        if (this.actionType === 'edit' && this.id && _.isEmpty(domain[`${this.formType}List`])) {
            this.formTypeAction[this.formType](this.id).then(() => {
                this.setFields()
            })
        } else {
            this.setFields()
        }
    }

    setFields() {
        let index = _.findIndex(this.props.domain[`${this.formType}List`], item => {
            return _.toString(item.id) === this.id
        })
        let formData = _.get(this.props.domain, `${this.formType}List.${index}`, {})
        this.setState({formData})
        this.props.form.setFieldsValue(_.pick(formData, this.formFileds[this.formType]))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(this.formFileds[this.formType], (err, fieldsValue) => {
            if (!err) {
                let values = _.clone(fieldsValue)
                _.unset(values, 'id')
                if (this.actionType === 'edit' ) {
                    console.log(_.get(this.state, 'formData'))
                    values[`${this.formType}_id`] = _.get(this.state, 'formData.id')
                } else {
                    let parent_id = _.get(this.props, 'match.params.parent_id')
                    switch (this.formType) {
                        case 'service':
                            values['domain_id'] = parent_id
                            break
                        case 'server':
                            values['service_id'] = parent_id
                            break
                        case 'api':
                            values['service_id'] = parent_id
                            break
                        default:
                            break
                    }
                }
                console.log(values)
                let action = `${this.actionType === 'edit' ? 'update' : 'add'}${_.upperFirst(this.formType)}Action`
                this.props.domainActions[action](values).then(res => {
                    this.props.history.goBack()
                })
            }
        })
    }

    getFormWithCommon = (dom) => {
        // const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Spin spinning={this.props.domain.isLoading} delay={100}>
                    <Form onSubmit={this.handleSubmit}>
                        {/* {this.actionType === 'edit' ? <FormItem
                            {...formItemLayout}
                            style={{display: 'none'}}
                            label='ID'
                        >
                            {getFieldDecorator('id', {
                                rules: [{
                                    required: true, message: 'id must required',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem> : <span />} */}
                        {dom}
                        <FormItem {...tailFormItemLayout}>
                            <Button type='primary' htmlType='submit'>{this.actionType === 'edit' ? '保存' : '新增'}</Button>
                            <Divider type="vertical" />
                            <Button type='default' onClick={()=>{this.props.history.goBack()}}>{'取消'}</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        )
    }
    getForm = () => {
        const { getFieldDecorator } = this.props.form
        const formItems = {
            domain: <div>
                <FormItem
                    {...formItemLayout}
                    label='域名'
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please input your Domain!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </div>,
            service: <div>
                <FormItem
                    {...formItemLayout}
                    label='服务模块'
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please input your Service Name',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='后端主机域名'
                >
                    {getFieldDecorator('host', {
                        rules: [{
                            required: true, message: 'Please input your Backend Host',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='描述'
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            required: false, message: 'Please input your Description',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </div>,
            server: <div>
                <FormItem
                    {...formItemLayout}
                    label='后端服务IP'
                >
                    {getFieldDecorator('ip', {
                        rules: [{
                            required: true, message: 'Please input your Service Name',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='后端服务器端口'
                >
                    {getFieldDecorator('port', {
                        rules: [{
                            required: true, message: 'Please input your Backend Host',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='代理协议'
                >
                    {getFieldDecorator('protocol', {
                        rules: [{
                            required: true, message: 'Please select your protocol',
                        }],
                    })(
                        <Select initialValue='https://'>
                            <Option value='https://'>HTTPS</Option>
                            <Option value='http://'>HTTP</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='权重'
                >
                    {getFieldDecorator('weight', {
                        rules: [{
                            required: true, message: 'Please input your Description',
                        }],
                    })(
                        <InputNumber min={1} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='描述'
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            required: false, message: 'Please input your Description',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </div>,
            api: <div>
            <FormItem
                {...formItemLayout}
                label='原始请求URI'
            >
                {getFieldDecorator('request_uri', {
                    rules: [{
                        required: true, message: 'Please input your request_uri',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='后端服务URI'
            >
                {getFieldDecorator('original_uri', {
                    rules: [{
                        required: true, message: 'Please input your original_uri',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='针对URI限流统计周期'
            >
                {getFieldDecorator('uri_limit_seconds', {
                    rules: [{
                        required: true, message: 'Please input your uri_limit_seconds',
                    }],
                })(
                    <div><InputNumber min={0} />{'秒'}</div>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='针对URI限流统计周期内最大允许请求数'
            >
                {getFieldDecorator('uri_limit_times', {
                    rules: [{
                        required: true, message: 'Please input your uri_limit_times',
                    }],
                })(
                    <InputNumber min={0} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='针对URI单个IP限流统计周期'
            >
                {getFieldDecorator('ip_uri_limit_seconds', {
                    rules: [{
                        required: true, message: 'Please input your ip_uri_limit_seconds',
                    }],
                })(
                    <div><InputNumber min={0} />{'秒'}</div>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='针对URI单个IP限流统计周期内最大允许请求数'
            >
                {getFieldDecorator('ip_uri_limit_times', {
                    rules: [{
                        required: true, message: 'Please input your ip_uri_limit_times',
                    }],
                })(
                    <InputNumber min={0} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='描述'
            >
                {getFieldDecorator('description', {
                    rules: [{
                        required: false, message: 'Please input your Description',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
        </div>,
        }
        return this.getFormWithCommon(formItems[this.formType])
    }

    render() {
        return this.getForm()
    }
}

function mapStateToProps(state) {
    return {
        domain: state.domain
    }
}

function mapDispatchToProps(dispatch) {
    return {
        domainActions: bindActionCreators(domainActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form.create()(DomainEdit)))
