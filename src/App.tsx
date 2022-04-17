import { Layout } from 'antd';
import { Table, Tag, Space } from 'antd';
import { Form, Input, Button, Checkbox, AutoComplete  } from 'antd';

const { Option } = AutoComplete;
import { State } from './state'


import { connect } from 'react-redux';

import { ResizableBox } from 'react-resizable';

const { Header, Footer, Sider, Content } = Layout;

import Map from './components/map';
import { setMap } from './reducers/globalReducers';
import TableContainer from "./Table"


const App = ({dispatch, options}) => {
    return (
        <Layout>
            <Header>
                <h1>Navigation app</h1>
            </Header>
            <Layout>
                <ResizableBox className ="rb" width={400} axis={'x'} resizeHandles = {['e']}>
                    <Sider width={400}>
                        <TableContainer />
                    </Sider>
                </ResizableBox>
                <Content>
                    <div className = "wrapper">                       
                        <Map/>
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

                    </div>
                    <button onClick={() => dispatch({type: "INIT"})}>Blabla</button>
                </Content>
            </Layout>

        </Layout>
        )
        }

export default connect((state: State) => ({options : state.components.fromSelectedList}))(App);