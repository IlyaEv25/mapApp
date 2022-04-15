import { Layout } from 'antd';
import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';

import { ResizableBox } from 'react-resizable';

const { Header, Footer, Sider, Content } = Layout;

import Map from './components/map';
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
                    <Map start = "Петергоф" finish = "Исаакиевский собор"/>
                    <button onClick={() => dispatch({type: "INIT"})}>Blabla</button>
                </Content>
            </Layout>

        </Layout>
        )
        }

export default connect()(App);