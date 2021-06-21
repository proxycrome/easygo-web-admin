import React from 'react';
import {  Tabs,Table as AntTable, Tag, Popover } from 'antd';
import { TableTopBar } from  '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom';
import { TransactionDetail } from '../../globalComponents/TransactionDetail';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { AllTransactionTable } from '../../Tables/AllTransactionTable';
import { FiMoreVertical } from 'react-icons/fi';

const { TabPane } = Tabs;



const dataSource = [
  {
    key: '1',
    id: '#12234',
    status: 'successful',
    date: 'June 21st 2021',
    amount: '200000',
    username: 'Johnson Adewale',
  },
  {
    key: '2',
    id: '#56778',
    date: 'Dec 21st 2021',
    amount: '200000',
    status: 'failed',
    username: 'Johnson Adewale',
  },
 
];



export const Transaction = (props) => {
  const {path, url} = useRouteMatch();
  const history = useHistory();


  const content = (
    <div>
      <p style={{cursor:'pointer'}}>Re-query</p>
    </div>
  );

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }, 
    
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if(status === 'successful'){
          return  <Tag color="#87d068">successful</Tag>
        }else if(status === 'failed'){
          return <Tag color="#f50">Failed</Tag>
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


  const gotoAllTransactionTable = () => {
    history.push(`${url}/table`);
  }

 
 

  return (
    <Switch>
        <Route exact path={`${path}`}>
          <PageTitleBar hideButtons={true} title='Transactions'/>
          <TableComponent onClick={gotoAllTransactionTable}>
              <Tabs
                tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
                defaultActiveKey='1'
                onChange={callback}
              >
                <TabPane tab='All Transactions' key='1'>
                  <TableTopBar showfilterby placeholder="Transaction ID, Customer Full Name"/>
                  <AntTable
                    columns={columns}
                    dataSource={dataSource}
                  />
                </TabPane>
              
              </Tabs>
          </TableComponent>
       </Route>
       <Route path={`${path}/table`}>
         <AllTransactionTable/>
       </Route>
       <Route path={`${path}/dispute-details`}>
           <TransactionDetail/>
       </Route>
    </Switch>
  );
};

