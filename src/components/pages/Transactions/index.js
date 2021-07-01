import React from 'react';
import {
  Tabs,
  Table as AntTable,
  Tag,
  Popover,
  Form,
  Input,
  Select,
  Typography
} from 'antd';
import {
  TableTopBar,
  StyledSelect,
  StyledSelectDiv,
  StyledSearchInputBorder,
} from '../../globalComponents/TableTopBar';
import { TableComponent } from '../../globalComponents/TableComponent';
import { PrimaryButton } from '../../globalComponents/Buttons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { TransactionDetail } from '../../globalComponents/TransactionDetail';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { FiMoreVertical } from 'react-icons/fi';
import moment from 'moment';
import { selectTransactions, fetchTransactions, requeryTransaction } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledModal } from '../../globalComponents/styles';
import { notificationAlert } from '../../../utils/notificationAlert';
import { PaymentDetail } from '../Users/CustomerDetails';
const { Option } = Select;
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
  const [form] = Form.useForm();
  const { allTransactions } = useSelector(selectTransactions);
  const [page, setPage] = React.useState(1);
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const dispatcher = useDispatch();
  const [requeryModalProps, setRequeryModalProps] = React.useState({
    loading: false,
    isVisible: false,
    ref:'',
    id: ''
  })
  const [transactionPageSize, setTransactionPageSize] = React.useState(10)

  const [queryResultModalProps, setQueryResultModalProps] = React.useState({
    data:{},
    isVisible: false,
  })

  const openRequeryModal = (ref, id) => () => {
    console.log({ref, id});
    //form.resetFields();
    form.setFieldsValue({
      transactionId: ref,
      transactionReference: ref,
    });
    setRequeryModalProps(prevState => ({...prevState, ref, id, isVisible: true}));
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '3%',
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'customerFullName',
      key: 'customerFullName',
      /*  width: '7%',
      fixed: 'left', */
    },
    {
      title: 'Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Phone number',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Charge',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Logged At',
      dataIndex: 'dateTransactionLoggedAt',
      key: 'dateTransactionLoggedAt',
      render: (time) => {
        return time ? (
          <p>{moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        ) : (
          ''
        );
      },
    },
    {
      title: 'Value Given At',
      dataIndex: 'dateValueWasGiven',
      key: 'dateValueWasGiven',
      render: (time) => {
        return time ? (
          <p>{moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        ) : (
          ''
        );
      },
    },
    {
      title: 'Paid At',
      dataIndex: 'paidAt',
      key: 'paidAt',
      render: (time) => {
        return time ? (
          <p>{moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        ) : (
          ''
        );
      },
    },
    {
      title: 'Paid For',
      dataIndex: 'paidFor',
      key: 'paidFor',
    },
    {
      title: 'Payee',
      dataIndex: 'payee',
      key: 'payee',
    },
    {
      title: 'Payment Gateway',
      dataIndex: 'paymentGateway',
      key: 'paymentGateway',
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Method',
      dataIndex: 'transactionMethod',
      key: 'transactionMethod',
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Reference',
      dataIndex: 'transactionReference',
      key: 'transactionReference',
    },
    {
      title: 'Status',
      dataIndex: 'valueGiven',
      key: 'valueGiven',
      width: 100,
      fixed: 'right',
      render: (status) => {
        if (status) {
          return <Tag color="#87d068">successful</Tag>;
        } else {
          return <Tag color="#f50">Failed</Tag>;
        }
      },
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '4%',
      fixed: 'right',
      render: (action, {transactionReference, id}) => {
        const content = (
          <div>
            <p onClick={openRequeryModal(transactionReference, id)} style={{ cursor: 'pointer' }}>Re-query</p>
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

  function callback(key) {
    console.log(key);
  }

  const gotoAllTransactionTable = () => {
    history.push(`${url}/table`);
  };

  const handlePagination = (page, pageSize) => {
    setTransactionPageSize(pageSize)
    dispatcher(fetchTransactions({ page: page - 1, pageSize }));
  };
  const handleRequeryTransaction = async (values) => {
    setRequeryModalProps(prevState => ({...prevState, loading: true}))
      try {
        const response = await dispatcher(requeryTransaction({data: values}));
        console.log(response);
        notificationAlert('success', 'Re-query Successfull', 'Operation was successful');
        setQueryResultModalProps(prevState => ({...prevState, isVisible: true, data: response}))
        setRequeryModalProps(prevState => ({...prevState, isVisible: false, loading: false}))
      } catch (error) {
        notificationAlert('error', 'Re-query Failed', 'Please try again');
        setRequeryModalProps(prevState => ({...prevState, loading: false}))
      }
  }

  const closeRequeryModal = (values) => {
    setRequeryModalProps(prevState => ({...prevState, isVisible: false}))
  }

  const closeQueryResultModal = () => {
    setQueryResultModalProps(prevState => ({...prevState, isVisible: false}))
  }

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <PageTitleBar hideButtons={true} title="Transactions" />
        <TableComponent onClick={gotoAllTransactionTable}>
          <Tabs
            tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
            defaultActiveKey="1"
            onChange={callback}>
            <TabPane tab="All Transactions" key="1">
              <TableTopBar
                showfilterby
                placeholder="Transaction ID, Customer Full Name"
              />
              <AntTable
                columns={columns}
                scroll={{ x: '180vw' }}
                dataSource={allTransactions.data}
                pagination={{
                  total: allTransactions.total,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                  defaultCurrent: 1,
                  current: allTransactions.page + 1,
                  pageSize: transactionPageSize,
                  showSizeChanger: true,
                  onChange: handlePagination,
                }}
              />
            </TabPane>
          </Tabs>
        </TableComponent>
        <StyledModal onCancel={closeRequeryModal} visible={requeryModalProps.isVisible} footer={false}>
          <Typography.Title level={4}>Re-query Transaction</Typography.Title>
          <Form
            form={form}
            onFinish={handleRequeryTransaction}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
           /*  initialValues={{
              transactionId: requeryModalProps.id,
              transactionReference: requeryModalProps.ref
            }} */
            >
            <Form.Item rules={[{ required: true }]} name='paymentStatus' label="Transaction Status">
              <Select placeholder='Select payment status'>
                <Option value="SUCCESSFUL">SUCCESSFUL </Option>{' '}
                <Option value="PENDING"> PENDING </Option>{' '}
                <Option value="FAILED"> FAILED </Option>{' '}
              </Select>
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name='transactionId' label="Transaction ID">
              <Input />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name='transactionReference' label="Transaction Reference">
              <Input />
            </Form.Item>
            <Form.Item>
              <PrimaryButton disabled={requeryModalProps.loading} htmlType='submit' text='Re-query'/>
            </Form.Item>
          </Form>
        </StyledModal>
        <StyledModal onCancel={closeQueryResultModal} visible={queryResultModalProps.isVisible} footer={false}>
            <div style={{width: '100%'}}>
              <PaymentDetail left='Transaction Reference' right={queryResultModalProps?.data?.transactionReference}/>
              <PaymentDetail left='Transaction Type' right={queryResultModalProps?.data?.transactionType}/>
              <PaymentDetail left='Transaction Method' right={queryResultModalProps?.data?.transactionMethod}/>
              <PaymentDetail left='Customer Name' right={queryResultModalProps?.data?.customerName}/>
              <PaymentDetail left='Service' right={queryResultModalProps?.data?.service}/>
              <PaymentDetail left='Amount' right={queryResultModalProps?.data?.amount}/>
              <PaymentDetail left='Status' right={queryResultModalProps?.data?.valueGiven? 'Successful':'Failed'}/>
              <PaymentDetail left='Payee' right={queryResultModalProps?.data?.payee}/>
              <PaymentDetail left='Paid At' right={queryResultModalProps?.data?.paidAt}/>
            </div>
        </StyledModal>
      </Route>
    </Switch>
  );
};
