import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Select, Tabs } from "antd";
import { getCenter } from "../../../utils/getCenter";
import { MerchantTableRow } from "../../TableRows/MerchantTableRow";
import { ListItem } from "../../globalComponents/ListItem";
import { StatCard } from "../../globalComponents/StatCard";
import { ChartComponent } from "../../globalComponents/ChartComponent";
import { fontFamily } from "../../../globalAssets/fontFamily";
import { PageTitleBar } from "../../globalComponents/PageTitleBar";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { AllDashBoardTable } from "../../Tables/AllDashBoardTable";
import moment from "moment";
import { Table } from '../../globalComponents/Table';
import { TableTopBar } from  '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import  { data } from '../../data/merchantData'


const { TabPane } = Tabs;

const { Option } = Select;

const title = [
  "ID",
  "Name",
  "Transaction count",
  "Last Activity",
  "Actions"
];

const mostPerforming = [
  { name: "GT Bank", amount: "coming soon" },
  { name: "Sterling Bank", amount: "coming soon" },
  { name: "Access Bank", amount: "coming soon" },
  { name: "OPAY (PAYCOM)", amount: "coming soon" },
  { name: "Wema Bank", amount: "coming soon" },
];

const statItem = [
 
  {
    title: "Pay with Specta",
    amount: "coming soon",
    count: "coming soon",
    color: "#00B6A0",
    isGrey: true,
    isCount: true,
  },
  
  {
    title: "NIP Transfers",
    amount: "coming soon",
    count: "coming soon",
    color: "#00B6A0",
    isGrey: true,
    isCount: true,
  },
  {
    title: "Nearby Payments",
    amount: "coming soon",
    count: "coming soon",
    color: "#00B6A0",
    isGrey: true,
    isCount: true,
  },
  {
    title: "Person to Merchant Transfers",
    amount: "coming soon",
    count: "coming soon",
    color: "#00B6A0",
    isGrey: true,
    isCount: true,
  },
];

export const DashBoard = (props) => {
  const merchantData = useSelector((state) => state.merchantData);
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1)



const tableBody = data.slice(0, 5).map((data, index) => (
  <MerchantTableRow data={data} key={index} />
));


const tableTitle = title.map((item, index) => {
  return <th key={index}>{item}</th>;
});



  const handleTableExpand = () => {
    history.push(`${url}/users`);
  };

  const onTabChange = (value) => {
    setActiveTab(value)
  }
  
  return (
    <Switch>
      <Route exact path={path}>
        <PageTitleBar title="Dashboard" />
        <StyledStatDiv>

          <StatCard
            isCount={true}
            isGrey={true}
            title="Total Transactions"
            hidenaira
            hidePrecision
            amount={50}
          />

          <StatCard
            isCount={true}
            isGrey={true}
            title="Successful Transactions"
            hidePrecision
            amount={40}
            hidenaira
          />

          <StatCard
            isCount={true}
            isGrey={true}
            failed
            title="Failed Transactions"
            hidePrecision
            amount={10}
            hidenaira
          />
          <StatCard
            isCount={true}
            isGrey={true}
            title="Total Users"
            hidePrecision
            amount={546000}
            hidenaira
          />
          <StatCard
            isCount={true}
            isGrey={true}
            title="Total Wallet Top-Up Today"
            hidePrecision={false}
            amount={50000}
            isOdd={true}
          />
        </StyledStatDiv>
        <StyledKeyActionSection>
          <ChartComponent
            data={merchantData}
            title="Transactions"
          />
        </StyledKeyActionSection>
         <TableComponent bottomText={activeTab === 1? 'View All Users': 'View All Transactions'} onClick={handleTableExpand}>
          <Tabs
            tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
            defaultActiveKey='1'
            onChange={onTabChange}
          >
            <TabPane tab='Recent Users' key='1'>
              {/* <TableTopBar
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
              /> */}
              <Table tableTitle={tableTitle} tableBody={tableBody} />
            </TabPane>
            <TabPane tab='Recent Transactions' key='2'>
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </TableComponent>
      </Route>
      <Route path={`${path}/table`}>
        <AllDashBoardTable />
      </Route>
    </Switch>
  );
};


const StyledStatDiv = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: "space-between" })};
  margin-top: 38px;
`;

const StyledKeyActionSection = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: "space-between" })};
  margin-top: 30px;
`;


