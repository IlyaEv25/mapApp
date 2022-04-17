import { Form, Input, Button, Checkbox, AutoComplete  } from 'antd';
import { connect } from 'react-redux';
const { Option } = AutoComplete;
import { State } from './state'

const FormW = ({dispatch, options}) =>(
    <Form
        id = "form"
        name="basic"
        wrapperCol={{ span: 16 }}
        //initialValues={{ remember: true }}
        onFinish={(e) => dispatch({type: "GET_DATA", data: e})}
        //onFinishFailed={onFinishFailed}
        autoComplete="on"
        >
        <Form.Item
            wrapperCol={{span: 10}}
            name="from"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            {/* <Input /> */}
            <AutoComplete style={{ width: 200 }} onChange={(e) => (dispatch({type: "SEARCH_LIST_SAGA", str: e}))} placeholder="input here">
                {options.map((option, index) => (
                    <Option key={index} value={option.name}>
                    {option.name}
                    </Option>
                ))}
            </AutoComplete>
        </Form.Item>

        <Form.Item
            name="to"
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <AutoComplete style={{ width: 200 }} onChange={(e) => (dispatch({type: "SEARCH_LIST_SAGA", str: e}))} placeholder="input here">
                {options.map((option, index) => (
                    <Option key={index} value={option.name}>
                    {option.name}
                    </Option>
                ))}
            </AutoComplete>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button type="primary" htmlType="submit">
            +
            </Button>
        </Form.Item>
    </Form>
    )

export default connect((state: State) => ({options : state.components.fromSelectedList}))(FormW);