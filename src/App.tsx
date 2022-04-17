import { Layout } from 'antd';
import Form from './Form';
import { connect } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { State } from './state'

const { Header, Footer, Sider, Content } = Layout;

import Map from './components/map';
import TableContainer from "./Table"
import { useState } from 'react';


const App = ({border, xStart, mouseDown, startBorder, map, dispatch}) => {
    var [counter, setCounter] = useState(0);
    return (
        <Layout
            onMouseUp={(e) => {
                    if (mouseDown){
                        dispatch({type: "MOUSE_DOWN", mouse_down: false});
                        dispatch({type: "SET_START_BORDER", start_border: border})
                        dispatch({type: "X_START", x: -1});
                        map.invalidateSize();
                    }
            }} 
            onMouseMove = {(e) => {
                setCounter(counter + 1);
                if (mouseDown && counter % 6 == 0)
                {
                    console.log(e);
                    dispatch({type: "SET_BORDER", border: startBorder + (e.pageX - xStart)})
                }
        }}>
            <Header >
                <h1>Navigation app</h1>
            </Header>
            <Layout>
                <Sider className="sider" width={border + "px"} >
                    <div className="tablewrapper" >
                        <TableContainer />
                        <div className='additional'
                            onMouseDown={(e) => {
                                console.log(e)
                                dispatch({type: "MOUSE_DOWN", mouse_down: true});
                                dispatch({type: "X_START", x: e.pageX});
                            }}></div>
                    </div>
                </Sider>
                <Content className={"content"}>
                    <div className="mapwrapper" style ={{width: "100% -" + border + "px" }}>                       
                        <Map/>
                        <Form/>
                    </div>
                    {/* <button onClick={() => dispatch({type: "INIT"})}>Blabla</button> */}
                </Content>
            </Layout>
            <Footer className ="footer"></Footer>
        </Layout>
        )
        }

export default connect((state:State) => ({
    map: state.mapData.mapPointer,
    border: state.components.border,
    startBorder: state.components.startBorder,
    xStart: state.components.xStart,
    mouseDown: state.components.mouseDown
}))(App);