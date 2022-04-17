import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';
import { SELECT_SAGA } from './actions';
import { State } from './state'

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
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit </a>
          <a>Delete</a>
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
        <Table rowSelection = {{selectedRowKeys: [selected]}} columns={columns} dataSource={data} onRow={(record) => ({
          onClick: () => {
            dispatch({type: SELECT_SAGA, key: record.key, from: record.from, to: record.to})
            console.log(record);
          }
        })
} />)
}

export default connect((state: State) => ({data: state.List, selected: state.components.selected}))(TableContainer);
