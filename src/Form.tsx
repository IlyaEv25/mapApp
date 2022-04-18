import { Form, Input, Button, Checkbox, AutoComplete  } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
const { Option } = AutoComplete;
import { State } from './state'

const FormW = ({dispatch, options}) =>{
    var [timer, setT] = useState(setTimeout(()=>{}, 0));
    var onChange = (e) => {
        clearTimeout(timer);
            var t = setTimeout(()=>{
            dispatch({type: "SEARCH_LIST_SAGA", str: e});
            // if (e != "")
            //     dispatch({
            //     type: "EDIT_SAGA",
            //     key: record.key,
            //     [where]: e, 
            //     [where == "from"? "to" : "from"]: record[where == "from"? "to" : "from"]
            //     });
            }, 1000);
            setT(t);
    }

    return (
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
            <AutoComplete style={{ width: 200 }} onChange={onChange} placeholder="From" >
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
            <AutoComplete style={{ width: 200 }} onChange={onChange} placeholder="To">
                {options.map((option, index) => (
                    <Option key={index} value={option.name}>
                    {option.name}
                    </Option>
                ))}
            </AutoComplete>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Get Route
            </Button>
        </Form.Item>
    </Form>
    )
}

export default connect((state: State) => ({options : state.components.fromSelectedList}))(FormW);