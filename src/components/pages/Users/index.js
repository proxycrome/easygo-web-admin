import React from 'react';
import { Tabs, Table as AntTable, Tag, Popover } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { CustomerDetail } from './CustomerDetails';
import { TableTopBar } from '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { FiMoreVertical } from 'react-icons/fi';
import { selectUser } from './slice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const { TabPane } = Tabs;

const dataSource = [
  {
    key: '1',
    id: '#12234',
    status: 'active',
    name: 'Johnson Adewale',
    count: 30,
    lastActivity: '10/02/2021 10:01pm',
    email: 'test@yahoo.com',
  },
  {
    key: '2',
    id: '#56778',
    status: 'blocked',
    name: 'Johnson Adewale',
    count: 10,
    lastActivity: '10/02/2021 10:01pm',
    email: 'test@yahoo.com',
  },
];

export const User = (props) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const userState = useSelector(selectUser);

  const content = (
    <div>
      <p>Send Email Verification</p>
      <p style={{ color: 'red' }}>Deactivate</p>
    </div>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Device Name',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    /*  {
      title: 'Device Model',
      dataIndex: 'deviceModel',
      key: 'deviceModel',
    }, 
    {
      title: 'Device UUID',
      dataIndex: 'deviceUUID',
      key: 'deviceUUID',
    }, */
    {
      title: 'Wallet Balance',
      dataIndex: 'walletBalance',
      key: 'walletBalance',
    },
    {
      title: 'Wallet Number',
      dataIndex: 'walletNumber',
      key: 'walletNumber',
    },
    /* {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if(status === 'active'){
          return  <Tag color="#87d068">Active</Tag>
        }else if(status === 'blocked'){
          return <Tag color="#f50">Blocked</Tag>
        }
      }
    }, */

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (action, alldata) => {
        return (
          <Popover trigger="click" content={content}>
            <FiMoreVertical />
          </Popover>
        );
      },
    },
  ];

  function callback(key) {
    console.log(key);
  }

  const gotoAllUserTable = () => {
    history.push(`${url}/table`);
  };
  const handleRow = type => (record, rowIndex) => {
    console.log({record, rowIndex});
    return {
      onClick: event => {
        
      }, // click row
      onDoubleClick: event => {
        localStorage.userStatus = type;
        console.log({record, rowIndex, event});
        history.push(`${url}/${record.email}`)
      }, // double click row
      onContextMenu: event => {}, // right button click row
      onMouseEnter: event => {

      }, // mouse enter row
      onMouseLeave: event => {}, // mouse leave row
    };
  }

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <PageTitleBar hideButtons={true} title="Users" />
        <TableComponent onClick={gotoAllUserTable}>
          <Tabs
            tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
            defaultActiveKey="1"
            onChange={callback}>
            <TabPane tab="Active Users" key="1">
              <TableTopBar placeholder="Email, Full name" />
              <StyledAntTable
                onRow={handleRow('active')}
                columns={columns}
                dataSource={userState.activeUserList}
              />
            </TabPane>
            <TabPane tab="Suspended Users" key="2">
              <TableTopBar placeholder="Email, Full name" />
              <StyledAntTable
                onRow={handleRow('suspended')}
                columns={columns}
                dataSource={userState.suspendedUserList}
              />
            </TabPane>
          </Tabs>
        </TableComponent>
      </Route>
      <Route path={`${path}/:email`}>
        <CustomerDetail />
      </Route>
    </Switch>
  );
};

const StyledAntTable = styled(AntTable)`
  & .ant-table-tbody > tr > td{
    cursor: pointer;
  }
`
