

import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';
import { DELETE_ELEMENT, EDIT_SAGA, SEARCH_LIST_SAGA, SELECT_SAGA, SET_EDITED } from './actions';
import { GeoPoint, ReqEntry, State } from './state'
import { AutoComplete } from 'antd';

import { store } from './store';
import { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import type { BaseSelectRef } from 'antd/node_modules/rc-select';
const { Option } = AutoComplete;

type EditableCellProps = {
    edited: number,
    editedType: "from"|"to",
    text: string,
    options: Array<GeoPoint>,
    where: "from"| "to",
    record: ReqEntry,
    dispatch: Dispatch
}

type TableProps = {
  data: Array<ReqEntry>
  selected: number,
  dispatch: Dispatch
}

const columns = [
  {
    title: 'id',
    dataIndex: 'key',
    key: 'key',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: (text: string, record: ReqEntry) => <EditableCell record={record} text={text} where ={"from"}></EditableCell>,
    onCell: (record: ReqEntry) => ({onClick: () => store.dispatch({type: SET_EDITED, edited: record.key, edit_type: "from"})})
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: (text: string, record: ReqEntry) => <EditableCell record={record} text={text} where ={"to"}></EditableCell>,
    onCell: (record: ReqEntry) => ({onClick: () => store.dispatch({type: SET_EDITED, edited: record.key, edit_type: "to"})})
  },
  {
      title: 'Downloaded',
      render: (text: string, record: ReqEntry) => {
          return record.data? <a> Yes</a> : <a> No </a>;
      }
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: ReqEntry) => (
      <Space size="middle">
        <a onClick = {() => (store.dispatch({type:DELETE_ELEMENT, id: record.id}))}>Delete</a>
      </Space>
    ),
  },
]; 

const EditableCellP = ({edited, editedType, text, options, where, record, dispatch}: EditableCellProps) => {
  const inputRef = useRef({focus: () => {}});// as React.Ref<BaseSelectRef>;
  var [timer, setT] = useState(setTimeout(()=>{}, 0));

  useEffect(() => {
    if (edited == record.key && editedType == where) {
        if (inputRef)
            inputRef.current.focus();
    }
  });

  return  (
    (edited == record.key && editedType == where)? 
    <AutoComplete ref ={inputRef as React.Ref<BaseSelectRef>} style={{ width: 200 }} defaultValue={text}
     onChange={(e) => {
        clearTimeout(timer);
        var t = setTimeout(()=>{
          dispatch({type: SEARCH_LIST_SAGA, str: e});
          if (e != "")
            dispatch({
              type: EDIT_SAGA,
              key: record.key,
              [where]: e, 
              [where == "from"? "to" : "from"]: record[where == "from"? "to" : "from"]
            });
        }, 1000);
        setT(t);
      }}
      onBlur = {() => {
        dispatch({type: SET_EDITED, edited: -1, edit_type: "from"})
      }}
       placeholder="To">
          {options.map((option, index) => (
              <Option key={index} value={option.name}>
              {option.name}
              </Option>
          ))}
    </AutoComplete> :
    <a>{text}</a>
  )
}

const EditableCell = connect((state: State) => ({
  options: state.components.fromSelectedList,
  edited: state.components.edited,
  editedType: state.components.editedType
}))(EditableCellP);


const TableContainer = ({data, selected, dispatch}: TableProps) => {
    console.log("TABLEDATA",data);
    return  (
        <Table className='table' rowSelection = {{selectedRowKeys: [selected]}} columns={columns} dataSource={data} onRow={(record) => ({
          onClick: () => {
            dispatch({type: SELECT_SAGA, key: record.key, from: record.from, to: record.to, route: record.data})
            console.log(record);
          }
        })
} />)
}

export default connect((state: State) => ({data: state.List, selected: state.components.selected}))(TableContainer);
