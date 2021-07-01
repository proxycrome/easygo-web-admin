import React, { useState } from 'react';
import { Tabs, Table as AntTable, Tag, Popover, Modal } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { CustomerDetail } from './CustomerDetails';
import { TableTopBar } from '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { FiMoreVertical } from 'react-icons/fi';
import { selectUser, suspendUser } from './slice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendVerificationEmail, activateUser, fetchAllUser } from './slice';
import { useDispatch } from 'react-redux';
import { StyledModal } from '../../globalComponents/styles';
import { notificationAlert } from '../../../utils/notificationAlert';
import { themes } from '../../../globalAssets/theme';

const { TabPane } = Tabs;

export const User = (props) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const userState = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState('1');
  const [verifyEmailProps, setVerifyEmailProps] = useState({
    loading: false,
    email: '',
    isModalVisible: false,
  });
  const [activateUserProps, setActivateUserProps] = useState({
    loading: false,
    email: '',
    isModalVisible: false,
  });
  const [suspendUserProps, setSuspendUserProps] = useState({
    loading: false,
    email: '',
    isModalVisible: false,
  });
  const [activeUserPageSize, setActiveUserPageSize] = useState(10);
  const [suspendedUserPageSize, setSuspendedUserPageSize] = useState(10)
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

  const openActivateUserModal = (user) => () => {
    setActivateUserProps((prevState) => ({
      ...prevState,
      email: user.email,
      isModalVisible: true,
    }));
  };

  const openSuspendUserModal = (user) => () => {
    setSuspendUserProps((prevState) => ({
      ...prevState,
      email: user.email,
      isModalVisible: true,
    }));
  };

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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (action, alldata) => {
        const content = (
          <div>
            <p
              style={{ cursor: 'pointer' }}
              onClick={onOpenSendVerificationEmailModal(alldata)}>
              Send Email Verification
            </p>
            <p
              onClick={
                activeTab === '1'
                  ? openSuspendUserModal(alldata)
                  : openActivateUserModal(alldata)
              }
              style={{
                color: activeTab === '1' ? themes.red : themes.primaryColor,
                cursor: 'pointer',
              }}>
              {activeTab === '1' ? 'Suspend' : 'Activate'}
            </p>
          </div>
        );

        return (
          <Popover trigger="click" content={content}>
            <FiMoreVertical />
          </Popover>
        );
      },
    },
  ];

  const gotoAllUserTable = () => {
    history.push(`${url}/table`);
  };
  const handleRow = (type) => (record, rowIndex) => {
    return {
      onDoubleClick: (event) => {
        localStorage.userStatus = type;
        history.push(`${url}/${record.email}`);
      },
    };
  };

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
      notificationAlert('success', 'Sent', response);
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

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const handleCloseActivateUserModal = () => {
    setActivateUserProps((prevState) => ({
      ...prevState,
      isModalVisible: false,
    }));
  };

  const handleActivateUser = async () => {
    setActivateUserProps((prevState) => ({ ...prevState, loading: true }));
    try {
      const payload = {
        data: {
          confirm: true,
          email: activateUserProps.email,
        },
      };
      await dispatcher(activateUser(payload));
      await dispatcher(
        fetchAllUser({ page: 0, pageSize: 10, status: 'ACTIVE' })
      );
      await dispatcher(
        fetchAllUser({ page: 0, pageSize: 10, status: 'SUSPENDED' })
      );
      setActivateUserProps((prevState) => ({
        ...prevState,
        isModalVisible: false,
        loading: false,
      }));
      notificationAlert(
        'success',
        'Activated',
        `User with the email ${activateUserProps.email} has been activated`
      );
      
    } catch (error) {
      setActivateUserProps((prevState) => ({ ...prevState, loading: false }));
      notificationAlert('error', 'Failed', error.message || 'Please try again');
    }
  };

  const handleCloseSuspendUserModal = () => {
    setSuspendUserProps((prevState) => ({
      ...prevState,
      isModalVisible: false,
    }));
  };

  const handleSuspendUser = async () => {
    setSuspendUserProps((prevState) => ({ ...prevState, loading: true }));
    try {
      const payload = {
        data: {
          confirm: true,
          email: suspendUserProps.email,
        },
      };
      await dispatcher(suspendUser(payload));
      await dispatcher(
        fetchAllUser({ page: 0, pageSize: 10, status: 'ACTIVE' })
      );
      await dispatcher(
        fetchAllUser({ page: 0, pageSize: 10, status: 'SUSPENDED' })
      );
      setSuspendUserProps((prevState) => ({
        ...prevState,
        isModalVisible: false,
        loading: false,
      }));
      notificationAlert(
        'success',
        'Suspended',
        `User with the email ${suspendUserProps.email} has been suspended`
      );
    } catch (error) {
      setSuspendUserProps((prevState) => ({ ...prevState, loading: false }));
      notificationAlert('error', 'Failed', error.message || 'Please try again');
    }
  };

  const handleActiveUserPagination = (page, pageSize) => {
    setActiveUserPageSize(pageSize)
    dispatcher(fetchAllUser({page: page - 1, pageSize , status: 'ACTIVE'}));
  };

  const handleSuspendedUserPagination = (page, pageSize) => {
    setSuspendedUserPageSize(pageSize)
   dispatcher(fetchAllUser({page: page - 1, pageSize, status: 'SUSPENDED'}));
  };

  console.log({ userState });

  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <PageTitleBar hideButtons={true} title="Users" />
          <TableComponent onClick={gotoAllUserTable}>
            <Tabs
              tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
              defaultActiveKey="1"
              onChange={onTabChange}>
              <TabPane tab="Active Users" key="1">
                <TableTopBar placeholder="Email, Full name" />
                <StyledAntTable
                  onRow={handleRow('active')}
                  columns={columns}
                  dataSource={userState.activeUserList.data}
                  pagination={{
                    total: userState.activeUserList.total,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    defaultCurrent: 1,
                    current: userState.activeUserList.page + 1,
                    pageSize: activeUserPageSize,
                    showSizeChanger: true,
                    onChange: handleActiveUserPagination,
                  }}
                />
              </TabPane>
              <TabPane tab="Suspended Users" key="2">
                <TableTopBar placeholder="Email, Full name" />
                <StyledAntTable
                  onRow={handleRow('suspended')}
                  columns={columns}
                  dataSource={userState.suspendedUserList.data}
                  pagination={{
                    total: userState.suspendedUserList.total,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    defaultCurrent: 1,
                    current: userState.suspendedUserList.page + 1,
                    pageSize: suspendedUserPageSize,
                    showSizeChanger: true,
                    onChange: handleSuspendedUserPagination,
                  }}
                />
              </TabPane>
            </Tabs>
          </TableComponent>
        </Route>
        <Route path={`${path}/:email`}>
          <CustomerDetail
            onSuspendUser={openSuspendUserModal}
            onActivateUser={openActivateUserModal}
          />
        </Route>
      </Switch>
      <SendEmailVerificatioModal
        email={verifyEmailProps.email}
        onCancel={handleCloseSendVerificationModal}
        onOk={handleSendVerificationEmail}
        loading={verifyEmailProps.loading}
        visible={verifyEmailProps.isModalVisible}
      />
      <ActivateUserModal
        email={activateUserProps.email}
        loading={activateUserProps.loading}
        visible={activateUserProps.isModalVisible}
        onCancel={handleCloseActivateUserModal}
        onOk={handleActivateUser}
      />
      <SuspendUserModal
        email={suspendUserProps.email}
        loading={suspendUserProps.loading}
        visible={suspendUserProps.isModalVisible}
        onCancel={handleCloseSuspendUserModal}
        onOk={handleSuspendUser}
      />
    </>
  );
};

export const SendEmailVerificatioModal = (props) => {
  return (
    <StyledModal
      visible={props.visible}
      okButtonProps={{
        loading: props.loading,
        style: {
          backgroundColor: themes.primaryColor,
          border: `1px solid ${themes.primaryColor}`,
        },
      }}
      cancelButtonProps={{
        type: 'danger',
      }}
      onOk={props.onOk}
      okText="Send"
      onCancel={props.onCancel}>
      <h3>Send Email Verification</h3>
      <p>
        Would you like to send email verification link to{' '}
        <strong>{props.email}</strong>
      </p>
    </StyledModal>
  );
};

export const ActivateUserModal = (props) => {
  return (
    <StyledModal
      visible={props.visible}
      okButtonProps={{
        loading: props.loading,
        style: {
          backgroundColor: themes.primaryColor,
          border: `1px solid ${themes.primaryColor}`,
        },
      }}
      cancelButtonProps={{
        type: 'danger',
      }}
      onOk={props.onOk}
      okText="Activate"
      onCancel={props.onCancel}>
      <h3>Activate User</h3>
      <p>
        Would you like to <strong>activate</strong> the user with this email{' '}
        <strong>{props.email}</strong>?
      </p>
    </StyledModal>
  );
};

export const SuspendUserModal = (props) => {
  return (
    <StyledModal
      visible={props.visible}
      okButtonProps={{
        loading: props.loading,
        type: 'danger',
      }}
      cancelButtonProps={{
        style: {
          backgroundColor: themes.primaryColor,
          border: `1px solid ${themes.primaryColor}`,
          color: '#fff',
        },
      }}
      onOk={props.onOk}
      okText="Suspend"
      onCancel={props.onCancel}>
      <h3>Suspend User</h3>
      <p>
        Would you like to{' '}
        <strong style={{ color: themes.red }}>suspend </strong>the user with
        this email <strong>{props.email}</strong>?
      </p>
    </StyledModal>
  );
};

const StyledAntTable = styled(AntTable)`
  & .ant-table-tbody > tr > td {
    cursor: pointer;
  }
`;
