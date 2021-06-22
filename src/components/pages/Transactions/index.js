import React from 'react';
import styled from 'styled-components';
import {  Select, Tabs } from 'antd';
import { getCenter } from '../../../utils/getCenter';
import { data } from '../../data/merchantData2';
import { MerchantTableRow2 } from '../../TableRows/MerchantTableRow2';
import { Table } from '../../globalComponents/Table';
import { TableTopBar } from  '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import { ListItem } from '../../globalComponents/ListItem';
import { ListCard } from '../../globalComponents/ListCard';
import { StatCard } from '../../globalComponents/StatCard';
import { ChartComponent } from '../../globalComponents/ChartComponent';
import { TableActionButtons } from '../../globalComponents/TableActionButtons';
import { MyResponsivePieCanvas as PieChart} from '../../globalComponents/PieChart'
import { CardScaffold } from '../../globalComponents/CardScaffold';
import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom';
import { TransactionDetail } from '../../globalComponents/TransactionDetail';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { AllTransactionTable } from '../../Tables/AllTransactionTable';

const { TabPane } = Tabs;

const pieData = [
    {
      "id": "QR",
      "label": "QR",
      "value": 146,
      "color": "hsl(250, 70%, 50%)"
    },
    {
      "id": "NFC",
      "label": "NFC",
      "value": 552,
      "color": "hsl(206, 70%, 50%)"
    },
    {
      "id": "Nearby",
      "label": "Nearby",
      "value": 553,
      "color": "hsl(276, 70%, 50%)"
    },
    {
      "id": "Tap’n’go",
      "label": "Tap’n’go",
      "value": 597,
      "color": "hsl(178, 70%, 50%)"
    },
    {
      "id": "Specta",
      "label": "Specta",
      "value": 48,
      "color": "hsl(253, 70%, 50%)"
    },
    {
      "id": "NIP",
      "label": "NIP",
      "value": 227,
      "color": "hsl(137, 70%, 50%)"
    },
  ]

const title = [
  'Merchant',
  'Product',
  'Terminal ID',
  'Channel',
  'Response time',
  'Amount',
  'Type',
  'Date',
  'Status',
];

const statItem = [
  {title: 'Total  Transactions',  amount:'coming soon',  color: '#87B600'},
  {title: 'Total Resolved Transactions',  amount:'coming soon',  color: '#00B6A0'},
  {title: 'Total Open Transactions',  amount:'coming soon', color: '#798597'},

]

const mostPerforming = [
  {name: 'GT Bank', amount: 'N1,003,000,000'},
  {name: 'Sterling Bank', amount: 'N409,000,000'},
  {name: 'Access Bank', amount: 'N401,000,000'},
  {name: 'OPAY (PAYCOM)', amount: 'N303,000,000'},
  {name: 'Wema Bank', amount: 'N103,000,000'},
]

export const Transaction = (props) => {
  //const {setPageState} = UsePageStateContext();
  const keyActionRef = React.useRef();
  const [pieHeight, setPieHeight] = React.useState('0vh');
  const {path, url} = useRouteMatch();
  const history = useHistory();


  React.useEffect(() => {
      setPieHeight(`${(keyActionRef?.current?.getBoundingClientRect()?.height/window.innerHeight) * 100}vh`)
  }, [])




  React.useEffect(() => {
    const analyticRefCurrent = keyActionRef?.current;
  
    if (Object.entries(keyActionRef).length !== 0) {
      window.addEventListener('load', () => {
        setPieHeight(`${(analyticRefCurrent?.getBoundingClientRect()?.height/window.innerHeight) * 100}vh`)
      });

      return () =>
        window.addEventListener('load', () => {
            setPieHeight(`${(analyticRefCurrent?.getBoundingClientRect()?.height/window.innerHeight) * 100}vh`)
        });
    }
  }, []);


  const tableTitle = title.map((item, index) => {
    return <th key={index}>{item}</th>;
  });




  function callback(key) {
    console.log(key);
  }

  const goToTransactionDetails = () => {
      history.push(`${url}/dispute-details`);
  }

  const gotoAllTransactionTable = () => {
    history.push(`${url}/table`);
  }

  const tableBody = data.map((data, index) => (
    <MerchantTableRow2 onClick={goToTransactionDetails} data={data} key={index} />
  ));
  const statCardArry = statItem.map((item, index) => {
    return <StatCard isCount={item.isCount} isGrey={item.isGrey} backgroundColor={item.color} key={index} count={item.count} title={item.title} amount={item.amount}/>
  })
 

  return (
    <Switch>
        <Route exact path={`${path}`}>
          <PageTitleBar title='Transactions'/>
          <StyledStatDiv>
            {statCardArry}
          </StyledStatDiv>
          <StyledKeyActionSection ref={keyActionRef}>
            <CardScaffold style={{ margin: '0px' , width: '31.5%', height: pieHeight}}>
                <PieChart data={pieData}/>
            </CardScaffold>
          <ChartComponent noMargin width='65.6%'  title='Top Transaction Category'/>
          </StyledKeyActionSection>
          <TableComponent onClick={gotoAllTransactionTable}>
              <Tabs
                tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
                defaultActiveKey='1'
                onChange={callback}
              >
                <TabPane tab='All Merchants' key='1'>
                  <TableTopBar/>
                  <TableActionButtons/>
                  <Table 
                    tableTitle={tableTitle} 
                    tableBody = {tableBody}
                  />
                </TabPane>
                <TabPane tab='Open' key='2'>
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab='Resolved' key='3'>
                  Content of Tab Pane 3
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



const StyledStatDiv = styled.div`
width: 100%;
${getCenter({ justifyContent: 'space-between' })};
margin-top: 38px;
`;

const StyledKeyActionSection = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};
  margin-top: 30px;
`;

const StyledRatingDiv = styled.div`
${getCenter({ justifyContent: 'space-between' })};
width: 100%;
margin-top: 40px;

& > div {
  flex-basis: 48%;
}
`;