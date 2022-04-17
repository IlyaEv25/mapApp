import { Layout } from 'antd';
import { Table, Tag, Space } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';

import { connect } from 'react-redux';

import { ResizableBox } from 'react-resizable';

const { Header, Footer, Sider, Content } = Layout;

import Map from './components/map';
import { setMap } from './reducers/globalReducers';
import TableContainer from "./Table"


const App = ({dispatch}) => {
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
                            onFinish={() => console.log("!")}
                            //onFinishFailed={onFinishFailed}
                            autoComplete="on"
                            >
                            <Form.Item
                                wrapperCol={{span: 10}}
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input />
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

export default connect()(App);