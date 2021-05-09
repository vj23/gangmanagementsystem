import * as React from 'react';
import { Table } from 'antd';
import { Card } from 'antd';
import * as moment from 'moment'
import { DatePicker, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

const { RangePicker } = DatePicker;
export default class OpenRole extends React.Component {
  state = {
    dataSource: [],
    searchText: '',
    searchedColumn: '',
    filters: {},
    columns: []
  }

  searchInput;
  componentDidMount() {
    let self = this;
    let filters = [];
    fetch('/getAllForAdmin', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.filters),
    }).then((res) => {
      return res.json()
    }).then((json) => {
      self.setState({
        dataSource: json
      })
    })

  }

  onChangeHandler(event) {
    let self = this;
    let filters = {}
    filters['startDate'] = moment(event[0]).toDate()
    filters['endDate'] = moment(event[1]).toDate()
    fetch('/getAllForAdmin', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    }).then((res) => {
      return res.json()
    }).then((json) => {
      self.setState({
        dataSource: json
      })
    })
  }




  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      text,
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {

    const columns = [
      {
        title: 'Incharge',
        dataIndex: 'incharge',
        key: 'incharge',
        ...this.getColumnSearchProps('incharge'),
      },
      {
        title: 'Gang',
        dataIndex: 'gang',
        key: 'gang',
        ...this.getColumnSearchProps('gang'),

      },
      {
        title: 'Work Assigned',
        dataIndex: 'task',
        key: 'task',
        ...this.getColumnSearchProps('task'),
      },
      {
        title: 'Created At',
        dataIndex: 'updatedDt',
        key: 'updatedDt',
      }
    ];

    //const columnBase = ["incharge", "section", "gang", "task", "compliance", "grievance", "contractual", "machine", "updatedDt"]
    const dateFormat = 'YYYY/MM/DD';
    let columnFinal = [];
    let children = []
    for (let i = 0; i < 4; i++) {
      children.push(<Option value={columns[i].dataIndex} obj={columns[i]}>{columns[i].dataIndex}</Option>);
    }

    if (this.state.columns.length == 0) {
      columnFinal = columns;
    }
    else {
      columnFinal = this.state.columns;
    }

    return (
      <div>
        <div style={{display:"flex"}}>
          <div>
            <RangePicker
              onChange={this.onChangeHandler.bind(this)}
              format={dateFormat}
            />
          </div>
          <div style={{width:"33%",marginLeft:"20px"}}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              //defaultValue={['a10', 'c12']}
              onChange={this.handleChange.bind(this)}
            >
              {children}
            </Select>
          </div>
        </div>

        <Card><Table dataSource={this.state.dataSource} columns={columnFinal} /></Card>
      </div >
    )


  }
  handleChange(values, columns) {

    let obj = columns.map(element => {
      return element.obj
    });
    this.setState({
      columns: obj
    })
  }
}