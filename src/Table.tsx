

import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';
import { SELECT_SAGA } from './actions';
import { State } from './state'
import { AutoComplete } from 'antd';

import { store } from './store';
import { useEffect, useRef } from 'react';
const { Option } = AutoComplete;

const EditableCellP = ({edited, editedType, text, options, where, record, dispatch}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (edited == record.key && editedType == where) {
      inputRef.current.focus();
    }
  });

  return  (
    (edited == record.key && editedType == where)? 
    <AutoComplete ref ={inputRef} style={{ width: 200 }} defaultValue={text}
     onChange={(e) => {
      dispatch({type: "SEARCH_LIST_SAGA", str: e});
      if (e != "")
        dispatch({type: "EDIT_SAGA",
                  key: record.key,
                  [where]: e, 
                  [where == "from"? "to" : "from"]: record[where == "from"? "to" : "from"] });
      }}
      onBlur = {() => dispatch({type: "SET_EDITED", edited: -1, edit_type: "from"})}
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


const columns = [
    {
      title: 'id',
      dataIndex: 'key',
      key: 'key',
      render: text => <a>{text}</a>,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (text, record) => <EditableCell record={record} text={text} where ={"from"}></EditableCell>,
      onCell: (record) => ({onClick: () => store.dispatch({type: "SET_EDITED", edited: record.key, edit_type: "from"})})
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (text, record) => <EditableCell record={record} text={text} where ={"to"}></EditableCell>,
      onCell: (record) => ({onClick: () => store.dispatch({type: "SET_EDITED", edited: record.key, edit_type: "to"})})
    },
    {
        title: 'Downloaded',
        render: (text, record) => {
            return record.data? <a> Yes</a> : <a> No </a>;
        }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick = {() => (store.dispatch({type:"DELETE_ELEMENT", id: record.id}))}>Delete</a>
        </Space>
      ),
    },
  ];
  
//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       tags: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//       tags: ['cool', 'teacher'],
//     },
//   ];
  

const TableContainer = ({data, selected, dispatch}) => {
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
