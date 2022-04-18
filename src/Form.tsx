import { Form, Input, Button, Checkbox, AutoComplete  } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PUT_SAGA, SEARCH_LIST_SAGA } from './actions';
const { Option } = AutoComplete;
import { GeoPoint, ReqEntry, State } from './state'

type FormProps = {
    dispatch: Dispatch,
    options: Array<GeoPoint>
}

const FormW = ({dispatch, options}: FormProps) =>{
    var [timer, setT] = useState(setTimeout(()=>{}, 0));
    var onChange = (e: string) => {
        clearTimeout(timer);
            var t = setTimeout(()=>{
            dispatch({type: SEARCH_LIST_SAGA, str: e});
            // if (e != "")
            //     dispatch({
            //     type: EDIT_SAGA,
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
        onFinish={(e: ReqEntry) => dispatch({type: PUT_SAGA, data: e})}
        autoComplete="on"
        >
        <Form.Item
            wrapperCol={{span: 10}}
            name="from"
            rules={[{ required: true, message: 'Please input your starting point!' }]}>
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
            rules={[{ required: true, message: 'Please input your destination!' }]}>
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