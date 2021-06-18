import React from 'react';
import styled from 'styled-components';
import {  Tabs} from 'antd';
import { getCenter } from '../../../utils/getCenter';
import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom';
import { CustomerDetail } from '../../globalComponents/CustomerDetail';
import { Table } from '../../globalComponents/Table';
import { TableTopBar } from  '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import { StatCard } from '../../globalComponents/StatCard';
import { ChartComponent } from '../../globalComponents/ChartComponent';
import { TableActionButtons } from '../../globalComponents/TableActionButtons';
import { data } from '../../data/settlementData';
import { UserTableRow } from '../../TableRows/UserTableRow';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { AllUserTable } from '../../Tables/AllUserTable';

const { TabPane } = Tabs;

const statItem = [

  {
    title: 'Total User',
    amount: 'coming soon',
    count: 'coming soon',
    color: '#87B600',
  },
  
  { title: 'Average User  Amount', amount: 'coming soon', color: '#798597' },
  {
    title: 'Next User Date',
    amount: 'coming soon',
    count: 'coming soon',
    color: '#00B6A0',
    isGrey: true,
    isCount: true,
  },
  
  {
    title: 'Successful Users',
    amount: 'coming soon',
    count: 'coming soon',
    color: '#00B6A0',
    isGrey: true,
    isCount: true,
  },
  {
    title: 'Failed Users',
    amount: 'coming soon',
    count: 'coming soon',
    color: '#00B6A0',
    isGrey: true,
    isCount: true,
  },
  
];

const title = [
  "ID",
  "Name",
  "Transaction count",
  "Last Activity",
  "Actions"
];

export const User = (props) => {
  const [analyticWidth, setAnalyticWidth] = React.useState(900);
  const analyticRef = React.useRef();
  //const {setPageState} = UsePageStateContext();
  const { url, path} = useRouteMatch();
  const history = useHistory();

  const tableTitle = title.map((item, index) => {
    return <th key={index}>{item}</th>;
  });

  React.useEffect(() => {
    setAnalyticWidth(analyticRef?.current?.getBoundingClientRect()?.width);
  }, []);

  React.useEffect(() => {
    const analyticRefCurrent = analyticRef.current;

    if (Object.entries(analyticRef).length !== 0) {
      window.addEventListener('load', () => {
        setAnalyticWidth(analyticRefCurrent?.getBoundingClientRect().width);
      });

      return () =>
        window.addEventListener('load', () => {
          setAnalyticWidth(analyticRefCurrent?.getBoundingClientRect().width);
        });
    }
  }, []);

  React.useEffect(() => {
    const analyticRefCurrent = analyticRef.current;
    if (analyticRef.current !== null) {
      window.addEventListener('resize', () => {
        setAnalyticWidth(analyticRefCurrent?.getBoundingClientRect().width);
      });

      return () =>
        window.addEventListener('resize', () => {
          setAnalyticWidth(analyticRefCurrent?.getBoundingClientRect().width);
        });
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  const gotoUserDetail = () => {
    /* setPageState('User Detail'); */
      history.push(`${url}/settlement-detail`)
  }

  const tableBody = data.map((data, index) => (
    <UserTableRow onClick={gotoUserDetail} data={data} key={index} />
  ));

  const statCardArry = statItem.map((item, index) => {
    return <StatCard isOdd = {statItem.length%3 > 0 } isCount={item.isCount} isGrey={item.isGrey} backgroundColor={item.color} key={index} count={item.count} title={item.title} amount={item.amount}/>
  })

  const gotoAllUserTable = () => {
    history.push(`${url}/table`);
  }
  return (
    <Switch>
        <Route exact path={`${path}`}>
          <PageTitleBar title='Users'/>
          <TableComponent onClick={gotoAllUserTable}>
              <Tabs
                tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
                defaultActiveKey='1'
                onChange={callback}
              >
                <TabPane tab='Users' key='1'>
                  <TableTopBar/>
                  <TableActionButtons other/>
                  <Table 
                    tableTitle={tableTitle} 
                    //tableBody = {tableBody}
                  />
                </TabPane>
              </Tabs>
          </TableComponent>
      </Route>
      <Route path={`${path}/table`}>
        <AllUserTable/>
      </Route>
      <Route path={`${path}/settlement-detail`}>
          <CustomerDetail/>
      </Route>
    </Switch>
  );
};

