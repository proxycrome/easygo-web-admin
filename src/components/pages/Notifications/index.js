import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Table as AntTable,
    Tag,
    Popover,
    Form,
    Input,
    Select,
    Typography,
    Checkbox,
    Row,
    Col,
    DatePicker,
    useForm
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
import {
    selectTransactions,
    fetchTransactions,
    requeryTransaction,
} from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledModal, StyledInputContainer } from '../../globalComponents/styles';
import { notificationAlert } from '../../../utils/notificationAlert';
import { PaymentDetail } from '../Users/CustomerDetails';
import { addNotificationList, selectNotification } from './slice';
import { Services } from '../../../services';
import { themes } from '../../../globalAssets/theme';
const { Option } = Select;
const { TabPane } = Tabs;



export const Notifications = (props) => {

    const [page, setPage] = useState(1);
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const dispatcher = useDispatch();
    const [transactionPageSize, setTransactionPageSize] = useState(10);
    const [endDate, setEndDate] = useState(moment().format('YYYY/MM/DD'));
    const [startDate, setStartDate] = useState('2019/01/01');
    const [services, setServices] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [notificationExpiryDate, setNotificationExpiryDate] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [createNotificationProps, setCreateNotificationProps] = useState({
        visible: false,
        loading: false
    });
    const [broadcastNotificationProps, setBroadcastNotificationProps] = useState({
        visible: false,
        loading: false,
        title: '',
        isActive: false
    })
    const [editNotificationProps, setEditNotificationProps ] = useState({
        visible: false,
        loading: false,
        selectedNotification: {},
    })

    
const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        width: '30%'
    },
    {
        title: 'Expiry Date',
        dataIndex: 'expiryDate',
        key: 'expiryDate',
        render: (data) => moment(data).format('MMMM Do YYYY')
    },
    {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
        render: (data) => {
            return data.name
        }
    },
    
    {
        title: 'Display',
        dataIndex: 'show',
        key: 'show',
        render: (status) => {
            return status ? <Tag color="#87d068">Visible</Tag> :  <Tag color="#f50">Hidden</Tag>;
        }
    },
    {
        title: 'Broadcast Status',
        dataIndex: 'sent',
        key: 'sent',
        render: (status, allData) => {
            console.log(moment().format('YYYY-MM-DD'));
            console.log({title:allData.title, moment: moment().isBefore(moment(allData.expiryDate))});
            return status ? <Tag color="#87d068">Broadcasted</Tag> : !status && moment().isBefore(moment(allData.expiryDate))? <Tag color="#FF9800">Not Sent</Tag> : <Tag color="#f50">Expired</Tag> ;
        }
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key:'action',
        render: (data, allData) => {
            const content = (
                <div>
                  <p
                    onClick={() => setBroadcastNotificationProps(prevState => ({...prevState, title: allData.title, visible: true, isActive: allData.show, id: allData.id}))}
                    style={{ cursor: 'pointer' }}>
                    Broadcast
                  </p>
                 {/*  <p onClick={() => setEditNotificationProps(prevState => ({...prevState, selectedNotification: allData, visible: true}))} style={{ cursor: 'pointer' }}>Edit</p> */}
                </div>
              );
            return (
                <Popover trigger="click" content={content}>
                  <FiMoreVertical />
                </Popover>
              );
        }
    }
]


    const fetchAllNotification = async () => {
        try {
            const response = await Services.fetchAllNotification({ size: 10, page: 0 });
            setNotifications(response.data.data.body);
            console.log({ 'fetchAllNotification': response });
        } catch (error) {
            console.log({ error });
        }
    }


    const fetchAllServices = async () => {
        try {
            const response = await Services.fetchAllServices({ size: 10, page: 0 });
            setServices(response.data.data.body);
        } catch (error) {
            console.log({ error });
        }
    }

    useEffect(() => {
        fetchAllNotification();
        fetchAllServices();
    }, [])

    const formatDate = (date) => {
        return date.split('-').join('/');
    };


    const handleCreateNotificationModalClose = () => {
        setCreateNotificationProps(prevState => ({ ...prevState, visible: false }));
    }

    const onFinish = async (values) => {
        values.expiryDate = notificationExpiryDate;
        values.serviceId = selectedService;
        values.show = showNotification;
        setCreateNotificationProps(prevState => ({...prevState, loading: true}))
        try {
            const response = await Services.CreateNotification({data: values})
            const notificationResponse = await Services.fetchAllNotification({ size: 10, page: 0 });
            setNotifications(notificationResponse.data.data.body);
            setCreateNotificationProps(prevState => ({...prevState,visible: false, loading: false}))
            notificationAlert('success', `Notification ${values.show? 'broadcasted': 'created'}`, `${values.title} notification has been ${values.show? 'broadcasted': 'created'}`)
        } catch (error) {
            setCreateNotificationProps(prevState => ({...prevState, loading: false}))
            if(error.response){
                notificationAlert('error', 'Not Sent', error.response.data.message || 'Error occurred, try again later');
            }else {
                notificationAlert('error', 'Not Sent', 'Error occurred, try again later'); 
            }
            
        }
        
    }

    const servicesList = services.map((item, index) => {
        return <Option key={index} value={item.id}>{item.name}</Option>
    })


    const handleBroadCastNotification = async () => {
        try {
            setBroadcastNotificationProps(prevState => ({...prevState, loading: true}));
            const response = await Services.broadcastById({id: broadcastNotificationProps.id});
            notificationAlert('success', 'Notification Broadcasted', `${broadcastNotificationProps.title} was successfully broadcasted`);
            setBroadcastNotificationProps(prevState => ({...prevState, loading: false, visible: false}));
        } catch (error) {
            setBroadcastNotificationProps(prevState => ({...prevState, loading: false}));
            if(error.response){
                notificationAlert('error', 'Not Sent', error.response.data.message || 'Error occurred, try again later');
            }else {
                notificationAlert('error', 'Not Sent', 'Error occurred, try again later'); 
            }
        }
    }





    return (
        <>
            <PageTitleBar onButtonClick={() => setCreateNotificationProps(prevState => ({ ...prevState, visible: true }))} buttonText='Create Notification' hideButtons={false} title="Transactions" />
            <TableComponent >
            <AntTable
                columns={columns}
                dataSource={notifications}
            />
            </TableComponent>
            <CreateNotificationModal
                loading={createNotificationProps.loading}
                onCancel={handleCreateNotificationModalClose}
                visible={createNotificationProps.visible}
                onFinish={onFinish}
                getExpiryDate={(moment, dateString) => setNotificationExpiryDate(moment.toISOString())}
                servicesList={servicesList}
                onServiceChange={(e) => setSelectedService(e)}
                onShowNotification={(e) => setShowNotification(e.target.checked)}
            />
            <EditNotificationModal
                loading={editNotificationProps.loading}
                onCancel={() => setEditNotificationProps(prevState => ({...prevState, visible: false}))}
                visible={editNotificationProps.visible}
                onFinish={onFinish}
                getExpiryDate={(moment, dateString) => setNotificationExpiryDate(moment.toISOString())}
                servicesList={servicesList}
                onServiceChange={(e) => setSelectedService(e)}
                onShowNotification={(e) => setShowNotification(e.target.checked)}
                data={editNotificationProps.selectedNotification}
            />
            <BroadcastModal
                notificationTitle={broadcastNotificationProps.title}
                loading={broadcastNotificationProps.loading}
                visible={broadcastNotificationProps.visible}
                onCancel={() => setBroadcastNotificationProps(prevState => ({...prevState, visible: false}))}
                onOk={handleBroadCastNotification}
                isActive={broadcastNotificationProps.isActive}
            />
        </>
    );
};


const CreateNotificationModal = (props) => {
    const [form] = Form.useForm();

    const onOk = () => {
        form.submit();
    }

    return (
        <StyledModal
            title='Create Notification'
            visible={props.visible}
            okButtonProps={{
                loading: props.loading,
                htmlType: 'submit',
                style: {
                    backgroundColor: themes.primaryColor,
                    border: `1px solid ${themes.primaryColor}`,
                },
            }}
            cancelButtonProps={{
                type: 'danger',
            }}
            onOk={onOk}
            okText="Create"
            onCancel={props.onCancel}>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={props.onFinish}
                form={form}
            >
                <Form.Item label='Title' name='title'>
                    <StyledInputContainer>
                        <Input bordered={false} />
                    </StyledInputContainer>
                </Form.Item>
                <Form.Item label='Message' name='message'>
                    <StyledInputContainer>
                        <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} bordered={false} />
                    </StyledInputContainer>
                </Form.Item>
                <Form.Item label='Expiry Date' name='expiryDate'>
                    <StyledInputContainer>
                        <DatePicker onChange={props.getExpiryDate} style={{ width: '100%' }} bordered={false} />
                    </StyledInputContainer>
                </Form.Item>

                <Form.Item label='Service Id' name='serviceId'>
                    <StyledInputContainer>
                        <Select placeholder='Select Service' onChange={props.onServiceChange} style={{ width: '100%', textAlign: 'left' }} bordered={false}>
                            {props.servicesList}
                        </Select>
                    </StyledInputContainer>
                </Form.Item>
                <Form.Item name='show'>
                    <Row justify='start'>
                        <Col xs={9}>
                            <Checkbox onChange={props.onShowNotification}>Broadcast Notification</Checkbox>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </StyledModal>
    );
};


const EditNotificationModal = (props) => {
    const [form] = Form.useForm();

    const onOk = () => {
        form.submit();
    }

    return (
        <StyledModal
            title='Create Notification'
            visible={props.visible}
            okButtonProps={{
                loading: props.loading,
                htmlType: 'submit',
                style: {
                    backgroundColor: themes.primaryColor,
                    border: `1px solid ${themes.primaryColor}`,
                },
            }}
            cancelButtonProps={{
                type: 'danger',
            }}
            onOk={onOk}
            okText="Create"
            onCancel={props.onCancel}>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={props.onFinish}
                form={form}
            >
                <Form.Item label='Title' name='title'>
                    <StyledInputContainer>
                        <Input bordered={false} defaultValue={props.data.title}/>
                    </StyledInputContainer>
                </Form.Item>
                <Form.Item label='Message' name='message'>
                    <StyledInputContainer>
                        <Input.TextArea defaultValue={props.data.message} autoSize={{ minRows: 2, maxRows: 6 }} bordered={false} />
                    </StyledInputContainer>
                </Form.Item>
                <Form.Item label='Expiry Date' name='expiryDate'>
                    <StyledInputContainer>
                        <DatePicker defaultValue={props.data.expiryDate} onChange={props.getExpiryDate} style={{ width: '100%' }} bordered={false} />
                    </StyledInputContainer>
                </Form.Item>

                <Form.Item label='Service Id' name='serviceId'>
                    <StyledInputContainer>
                        <Select defaultValue={props.data.serviceId} placeholder='Select Service' onChange={props.onServiceChange} style={{ width: '100%', textAlign: 'left' }} bordered={false}>
                            {props.servicesList}
                        </Select>
                    </StyledInputContainer>
                </Form.Item>
                <Form.Item name='show'>
                    <Row justify='start'>
                        <Col xs={9}>
                            <Checkbox defaultValue={props.data.show} onChange={props.onShowNotification}>Broadcast Notification</Checkbox>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </StyledModal>
    );
};



const BroadcastModal = (props) => {
    return (
      <StyledModal
       /*  title='Broadcast Notification' */
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
        <h3>Broadcast Notification</h3>
        {props.isActive?
         (<p>
          This notification is <strong>active</strong>, do you want to <strong>rebroadcast</strong>
        </p>) : 
        (<p>
          Would like to broadcast notification with the title <strong>{props.notificationTitle}</strong>
        </p>)}
      </StyledModal>
    );
  };