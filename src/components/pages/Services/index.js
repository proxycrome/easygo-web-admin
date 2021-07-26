import React, { useEffect, useState, useRef } from "react";
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
  useForm,
} from "antd";
import {
  TableTopBar,
  StyledSelect,
  StyledSelectDiv,
  StyledSearchInputBorder,
} from "../../globalComponents/TableTopBar";
import { TableComponent } from "../../globalComponents/TableComponent";
import { PrimaryButton } from "../../globalComponents/Buttons";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { TransactionDetail } from "../../globalComponents/TransactionDetail";
import { PageTitleBar } from "../../globalComponents/PageTitleBar";
import { FiMoreVertical } from "react-icons/fi";
import moment from "moment";
import {
  selectTransactions,
  fetchTransactions,
  requeryTransaction,
} from "./slice";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledModal,
  StyledInputContainer,
} from "../../globalComponents/styles";
import { notificationAlert } from "../../../utils/notificationAlert";
import { PaymentDetail } from "../Users/CustomerDetails";
import { addNotificationList, selectNotification } from "./slice";
import { Services } from "../../../services";
import { themes } from "../../../globalAssets/theme";
import { servicesSelector, fetchAllServices } from "../Services/slice";
import { getBase64 } from "../../../utils/getBase64";
const { Option } = Select;
const { TabPane } = Tabs;

export const ProductServices = (props) => {
  const { services, paginationProps } = useSelector(servicesSelector);
  const [createServicesProps, setCreateServicesProps] = useState({
    visible: false,
    loading: false,
    iconText: "",
  });
  const [iconString, setIconString] = useState("");
  const dispatcher = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "Icon",
      dataIndex: "iconUrl",
      key: "iconUrl",
      render: (data) => <img src={data} alt="icon" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (data, allData) => {
        const content = (
          <div>
            <p style={{ cursor: "pointer" }}>Edit</p>
            {/* <p onClick={() => setEditNotificationProps(prevState => ({...prevState, selectedNotification: allData, visible: true}))} style={{ cursor: 'pointer' }}>Edit</p> */}
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

  const handleImageInputChange = (e) => {
    (async () => {
      try {
        setCreateServicesProps((prevState) => ({
          ...prevState,
          iconText: e.target.files[0]?.name || "",
        }));
        const base64String = await getBase64(e.target.files[0]);
        console.log(base64String.split("base64,")[1]);
        setIconString(base64String.split("base64,")[1]);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const onFinish = async (values) => {
    try {
      setCreateServicesProps((prevState) => ({ ...prevState, loading: true }));
      if (!iconString) {
        notificationAlert(
          "error",
          "Invalid Icon",
          "Please upload a service icons"
        );
        setCreateServicesProps((prevState) => ({
          ...prevState,
          loading: false,
        }));
        return;
      }
      values.iconBase64String = iconString;
      const response = await Services.createService({ data: values });
      console.log("SERVICE-CREATED", response);
      dispatcher(fetchAllServices({ page: 0, pageSize: 10 }));
      setCreateServicesProps((prevState) => ({
        ...prevState,
        loading: false,
        visible: false,
      }));
      notificationAlert(
        "success",
        "Service Created",
        `${values.name} service has been created`
      );
    } catch (error) {
      setCreateServicesProps((prevState) => ({ ...prevState, loading: false }));
      notificationAlert(
        "error",
        "Error Occurred",
        error.message || "Please try again later"
      );
    }
  };

  const handlePagination = (page, pageSize) => {
    setPageSize(pageSize);
    setPage(page);
    dispatcher(
      fetchAllServices({
        page: page - 1,
        pageSize,
      })
    );
  };

  return (
    <>
      <PageTitleBar
        onButtonClick={() =>
          setCreateServicesProps((prevState) => ({
            ...prevState,
            visible: true,
          }))
        }
        buttonText="Create Service"
        hideButtons={false}
        title="Services"
      />
      <TableComponent>
        <AntTable
          columns={columns}
          dataSource={services}
          pagination={{
            total: paginationProps.total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            defaultCurrent: 1,
            current: paginationProps.page + 1,
            pageSize: pageSize,
            showSizeChanger: true,
            onChange: handlePagination,
          }}
        />
      </TableComponent>
      <CreateServicesModal
        loading={createServicesProps.loading}
        onCancel={() =>
          setCreateServicesProps((prevState) => ({
            ...prevState,
            visible: false,
          }))
        }
        visible={createServicesProps.visible}
        handleImageInputChange={handleImageInputChange}
        onFinish={onFinish}
        iconText={createServicesProps.iconText}
        /* servicesList={servicesList} */
      />
    </>
  );
};

const CreateServicesModal = (props) => {
  const [form] = Form.useForm();
  const imageInputRef = useRef();

  const handleImageInputClick = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };
  const onOk = () => {
    form.submit();
  };

  return (
    <StyledModal
      title="Create Service"
      visible={props.visible}
      okButtonProps={{
        loading: props.loading,
        htmlType: "submit",
        style: {
          backgroundColor: themes.primaryColor,
          border: `1px solid ${themes.primaryColor}`,
        },
      }}
      cancelButtonProps={{
        type: "danger",
      }}
      onOk={onOk}
      okText="Create"
      onCancel={props.onCancel}
    >
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={props.onFinish}
        form={form}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <StyledInputContainer>
            <Input required bordered={false} />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input.TextArea
              required
              autoSize={{ minRows: 2, maxRows: 6 }}
              bordered={false}
            />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item name="iconBase64String">
          <div>
            <PrimaryButton
              type="dashed"
              onClick={handleImageInputClick}
              text="Upload Icon"
            />
            <input
              onChange={props.handleImageInputChange}
              ref={imageInputRef}
              type="file"
              style={{ display: "none" }}
            />
            <p>{props.iconText}</p>
          </div>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

const EditNotificationModal = (props) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };

  return (
    <StyledModal
      title="Create Service"
      visible={props.visible}
      okButtonProps={{
        loading: props.loading,
        htmlType: "submit",
        style: {
          backgroundColor: themes.primaryColor,
          border: `1px solid ${themes.primaryColor}`,
        },
      }}
      cancelButtonProps={{
        type: "danger",
      }}
      onOk={onOk}
      okText="Create"
      onCancel={props.onCancel}
    >
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={props.onFinish}
        form={form}
      >
        <Form.Item label="Title" name="title">
          <StyledInputContainer>
            <Input bordered={false} defaultValue={props.data.title} />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item label="Message" name="message">
          <StyledInputContainer>
            <Input.TextArea
              defaultValue={props.data.message}
              autoSize={{ minRows: 2, maxRows: 6 }}
              bordered={false}
            />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item label="Expiry Date" name="expiryDate">
          <StyledInputContainer>
            <DatePicker
              defaultValue={props.data.expiryDate}
              onChange={props.getExpiryDate}
              style={{ width: "100%" }}
              bordered={false}
            />
          </StyledInputContainer>
        </Form.Item>

        <Form.Item label="Service Id" name="serviceId">
          <StyledInputContainer>
            <Select
              defaultValue={props.data.serviceId}
              placeholder="Select Service"
              onChange={props.onServiceChange}
              style={{ width: "100%", textAlign: "left" }}
              bordered={false}
            >
              {props.servicesList}
            </Select>
          </StyledInputContainer>
        </Form.Item>
        <Form.Item name="show">
          <Row justify="start">
            <Col xs={9}>
              <Checkbox
                defaultValue={props.data.show}
                onChange={props.onShowNotification}
              >
                Broadcast Notification
              </Checkbox>
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
        type: "danger",
      }}
      onOk={props.onOk}
      okText="Send"
      onCancel={props.onCancel}
    >
      <h3>Broadcast Notification</h3>
      {props.isActive ? (
        <p>
          This notification is <strong>active</strong>, do you want to{" "}
          <strong>rebroadcast</strong>
        </p>
      ) : (
        <p>
          Would like to broadcast notification with the title{" "}
          <strong>{props.notificationTitle}</strong>
        </p>
      )}
    </StyledModal>
  );
};
