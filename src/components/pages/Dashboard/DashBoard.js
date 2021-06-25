import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Select, Tabs, Table as AntTable, Tag, Popover  } from "antd";
import { getCenter } from "../../../utils/getCenter";
import { StatCard } from "../../globalComponents/StatCard";
import { ChartComponent } from "../../globalComponents/ChartComponent";
import { fontFamily } from "../../../globalAssets/fontFamily";
import { PageTitleBar } from "../../globalComponents/PageTitleBar";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import moment from "moment";
import { TableComponent } from '../../globalComponents/TableComponent';
import  { data } from '../../data/merchantData';
import { FiMoreVertical } from 'react-icons/fi';
import { selectUser, sendVerificationEmail } from "../Users/slice";
import { SendEmailVerificatioModal } from '../Users/index'
import { getDashboardStat, selectDashboard} from './slice';
import { notificationAlert } from '../../../utils/notificationAlert';


const { TabPane } = Tabs;

const { Option } = Select;


const transactionDataSource = [
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

const userDataSource = [
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


export const DashBoard = (props) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);
  const userState = useSelector(selectUser);
  const{ dashboardStat } = useSelector(selectDashboard);
  const [verifyEmailProps, setVerifyEmailProps] = useState({
    loading: false,
    email: '',
    isModalVisible: false,
  });
  const dispatcher = useDispatch();

  const onOpenSendVerificationEmailModal = (user) => async () => {
    if (user.emailVerified) {
      notificationAlert('warning', 'Email Verified', 'Email already verified');
      return;
    }
    setVerifyEmailProps((prevState) => ({
      ...prevState,
      email: user.email,
      isModalVisible: true,
    }));
  };


  const fetchDashboardStat = async () => {
    try {
      const response = await dispatcher(getDashboardStat());
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchDashboardStat();
  }, [])


  const transactionContent = (
    <div>
      <p style={{cursor:'pointer'}}>Re-query</p>
    </div>
  );
  

  const transactionColumns = [
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
          <Popover trigger="click" content={transactionContent}>
            <FiMoreVertical />
          </Popover>
        )
      }
    }
  ];


 

  const userColumns = [
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
    
   
    {
      title:'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (action, alldata)=> {

        const userContent = (
          <div>
            <p
              style={{ cursor: 'pointer' }}
              onClick={onOpenSendVerificationEmailModal(alldata)}>
              Send Email Verification
            </p>
            <p style={{ color: 'red', cursor: 'pointer' }}>Deactivate</p>
          </div>
        );

        return (
          <Popover trigger="click" content={userContent}>
            <FiMoreVertical />
          </Popover>
        )
      }
    }
  ];


  const handleSendVerificationEmail = async () => {
    setVerifyEmailProps((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await dispatcher(
        sendVerificationEmail({ email: verifyEmailProps.email })
      );
      setVerifyEmailProps((prevState) => ({
        ...prevState,
        isModalVisible: false,
        loading: false,
      }));
      notificationAlert(
        'success',
        'Sent',
        response
      );
    } catch (error) {
      notificationAlert('error', 'Failed', error.message || 'Please try again');
      setVerifyEmailProps((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleCloseSendVerificationModal = () => {
    setVerifyEmailProps((prevState) => ({
      ...prevState,
      isModalVisible: false,
    }));
  };


  const handleTableExpand = () => {
    if(parseInt(activeTab) === 1){
      history.push(`${url}/users`);
    }
    if(parseInt(activeTab) === 2){
      history.push(`${url}/transactions`);
    }
  };

  const onTabChange = (value) => {
    setActiveTab(value)
  }
  const getTotalFailedTransactions = (dashboardStat) => {
    const totalFailedWallet = dashboardStat.totalWalletTransactions - dashboardStat.totalWalletTransactionsWithValueGiven;
    const totalFailedCard = dashboardStat.totalCardTransactions - dashboardStat.totalCardTransactionsWithValueGiven;
    const totalFailed = totalFailedWallet + totalFailedCard;

    return {
      totalFailedWallet,
      totalFailedCard,
      totalFailed
    }
  } 


  return (
    <Switch>
      <Route exact path={path}>
        <PageTitleBar hideButtons={true}  title="Dashboard" />
        <StyledStatDiv>

          <StatCard
            isCount={true}
            isGrey={true}
            title="Total Transactions"
            hidenaira
            hidePrecision
            amount={dashboardStat.totalTransactions || 0}
          />

          <StatCard
            isCount={true}
            isGrey={true}
            title="Total Card Transactions"
            hidenaira
            hidePrecision
            amount={dashboardStat.totalCardTransactions || 0}
          />   

          <StatCard
            isCount={true}
            isGrey={true}
            title="Total Wallet Transactions"
            hidenaira
            hidePrecision
            amount={dashboardStat.totalWalletTransactions || 0}
          />   

          <StatCard
            isCount={true}
            isGrey={true}
            title="Successful Transactions"
            hidePrecision
            amount={(dashboardStat.totalCardTransactionsWithValueGiven + dashboardStat.totalWalletTransactionsWithValueGiven) || 0}
            hidenaira
          />

          <StatCard
            isCount={true}
            isGrey={true}
            failed
            title="Failed Transactions"
            hidePrecision
            amount={getTotalFailedTransactions(dashboardStat).totalFailed || 0}
            hidenaira
          />
          <StatCard
            isCount={true}
            isGrey={true}
            title="Total Users"
            hidePrecision
            amount={dashboardStat.totalUsers || 0}
            hidenaira
          />
          <StatCard
            isCount={true}
            isGrey={true}
            title="Active Users"
            hidePrecision
            amount={dashboardStat.totalActiveUsers || 0}
            hidenaira
          />
          <StatCard
            isCount={true}
            isGrey={true}
            title="Suspended Users"
            hidePrecision
            amount={dashboardStat.totalSuspendedUsers || 0}
            hidenaira
            warning
          />
          <StatCard
            isCount={true}
            isGrey={true}
            title="Deleted Users"
            hidePrecision
            amount={dashboardStat.totalDeletedUsersCount || 0}
            hidenaira
            failed
          />
          {/* <StatCard
            isCount={true}
            isGrey={true}
            title="Total Wallet Top-Up Today"
            hidePrecision={false}
            amount={50000}
            isOdd={true}
           
          /> */}
        </StyledStatDiv>
        <StyledKeyActionSection>
          <ChartComponent
            title="Transactions"
          />
        </StyledKeyActionSection>
         <TableComponent bottomText={activeTab === 1? 'View All Users': 'View All Transactions'} onClick={handleTableExpand}>
          <Tabs
            tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
            defaultActiveKey='1'
            onChange={onTabChange}
          >
            <TabPane tab='Recent Active Users' key='1'>
              <AntTable columns={userColumns} dataSource={userState.activeUserList}/>
            </TabPane>
            <TabPane tab='Recent Transactions' key='2'>
            <AntTable
                    columns={transactionColumns}
                    dataSource={transactionDataSource}
                  />
            </TabPane>
          </Tabs>
        </TableComponent>
        <SendEmailVerificatioModal
          email={verifyEmailProps.email}
          onCancel={handleCloseSendVerificationModal}
          onOk={handleSendVerificationEmail}
          loading={verifyEmailProps.loading}
          visible={verifyEmailProps.isModalVisible}
        />
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


