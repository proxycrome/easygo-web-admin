import React from 'react';
import {  Tabs,Table as AntTable, Tag, Popover } from 'antd';
import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom';
import { CustomerDetail } from '../../globalComponents/CustomerDetail';
import { TableTopBar } from  '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { FiMoreVertical } from 'react-icons/fi';

const { TabPane } = Tabs;

const dataSource = [
  {
    key: '1',
    id: '#12234',
    status: 'active',
    name: 'Johnson Adewale',
    count: 30,
    lastActivity: '10/02/2021 10:01pm',
    email: 'test@yahoo.com'
  },
  {
    key: '2',
    id: '#56778',
    status: 'blocked',
    name: 'Johnson Adewale',
    count: 10,
    lastActivity: '10/02/2021 10:01pm',
    email: 'test@yahoo.com'
  },
 
];


export const User = (props) => {
  const { url, path} = useRouteMatch();
  const history = useHistory();
  


  const content = (
    <div>
      <p>Send Email Verification</p>
      <p style={{ color: 'red' }}>Deactivate</p>
    </div>
  );

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, 
    {
      title: 'Transaction Count',
      dataIndex: 'count',
      key: 'count',
    }, 
    {
      title: 'Last Activity',
      dataIndex: 'lastActivity',
      key: 'lastActivity',
    }, 
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, 
    {
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
    },
   
    {
      title:'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (action, alldata)=> {
        return (
          <Popover trigger="click" content={content}>
            <FiMoreVertical />
          </Popover>
        )
      }
    }
  ];

  function callback(key) {
    console.log(key);

  }
 

  const gotoAllUserTable = () => {
    history.push(`${url}/table`);
  }
  return (
    <Switch>
        <Route exact path={`${path}`}>
          <PageTitleBar hideButtons={true} title='Users'/>
          <TableComponent onClick={gotoAllUserTable}>
              <Tabs
                tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
                defaultActiveKey='1'
                onChange={callback}
              >
                <TabPane tab='Users' key='1'>
                  <TableTopBar placeholder='Email, Full name'/>
                 <AntTable columns={columns} dataSource={dataSource}/>
                </TabPane>
              </Tabs>
          </TableComponent>
      </Route>
      <Route path={`${path}/customer-detail`}>
          <CustomerDetail/>
      </Route>
    </Switch>
  );
};

