import React, { useState } from 'react';
import { Tabs, Table as AntTable, Tag, Popover, Modal } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { CustomerDetail } from './CustomerDetails';
import { TableTopBar } from '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { FiMoreVertical } from 'react-icons/fi';
import { selectUser } from './slice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendVerificationEmail } from './slice';
import { useDispatch } from 'react-redux';
import { StyledModal } from '../../globalComponents/styles';
import { notificationAlert } from '../../../utils/notificationAlert';

const { TabPane } = Tabs;

export const User = (props) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const userState = useSelector(selectUser);
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

  /*   const openPopOver = () => {
    setPopOverVisible(true);
  } */

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
            <p style={{ color: 'red', cursor: 'pointer' }}>Deactivate</p>
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

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <PageTitleBar hideButtons={true} title="Users" />
        <TableComponent onClick={gotoAllUserTable}>
          <Tabs
            tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
            defaultActiveKey="1">
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
        <SendEmailVerificatioModal
          email={verifyEmailProps.email}
          onCancel={handleCloseSendVerificationModal}
          onOk={handleSendVerificationEmail}
          loading={verifyEmailProps.loading}
          visible={verifyEmailProps.isModalVisible}
        />
      </Route>
      <Route path={`${path}/:email`}>
        <CustomerDetail />
      </Route>
    </Switch>
  );
};

export const SendEmailVerificatioModal = (props) => {
  return (
    <StyledModal
      visible={props.visible}
      okButtonProps={{
        loading: props.loading,
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

const StyledAntTable = styled(AntTable)`
  & .ant-table-tbody > tr > td {
    cursor: pointer;
  }
`;
