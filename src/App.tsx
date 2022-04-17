import { Layout } from 'antd';
import Form from './Form';
import { connect } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { State } from './state'

const { Header, Footer, Sider, Content } = Layout;

import Map from './components/map';
import TableContainer from "./Table"


const App = ({border, dispatch}) => {
    return (
        <Layout>
            <Header>
                <h1>Navigation app</h1>
            </Header>
            <Layout>
                <Sider className="sider" width={border} >
                    <div className="tablewrapper" onMouseDown={(e) => console.log(e)} onMouseUp={e => console.log(e)} onMouseMove = {(e) => console.log(e)}>
                        <TableContainer />
                        <div className='additional'>g</div>
                    </div>
                </Sider>
                <Content>
                    <div className="mapwrapper">                       
                        <Map/>
                        <Form/>
                    </div>
                    <button onClick={() => dispatch({type: "INIT"})}>Blabla</button>
                </Content>
            </Layout>

        </Layout>
        )
        }

export default connect((state:State) => ({border: state.components.border}))(App);