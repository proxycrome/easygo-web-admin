import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
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
import { selectDashboard } from "../Dashboard/slice";
import { getBase64 } from "../../../utils/getBase64";
import { servicesSelector } from "../Services/slice";

const { RangePicker } = DatePicker;

const { Option } = Select;
const { TabPane } = Tabs;

export const Coupons = (props) => {
  const [createCouponProps, setCreateCouponProps] = useState({
    visible: false,
    loading: false,
  });
  const [couponList, setCouponList] = useState([]);
  const { services } = useSelector(servicesSelector);
  const { discountTypes, roleTypes } = useSelector(selectDashboard);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [duration, setDuration] = useState([]);
  const dispatcher = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const fetchCoupons = async () => {
    try {
      const response = await Services.getCoupons({ page: 0, pageSize: 10 });
      setCouponList(response.data.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
    setSelectedDiscount(discountTypes[0]);
  }, [discountTypes]);

  const columns = [
    {
      title: "Code",
      dataIndex: "couponCode",
      key: "couponCode",
      fixed: "left",
      width: "8%",
    },
    {
      title: "Applicable to",
      dataIndex: "applicableTo",
      key: "applicableTo",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Usage Count",
      dataIndex: "usageCount",
      key: "usageCount",
    },
    {
      title: "User Count",
      dataIndex: "userCount",
      key: "userCount",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (data) => moment(data).format("MMMM Do YYYY"),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (data) => moment(data).format("MMMM Do YYYY"),
    },
    {
      title: "Discount Amount",
      dataIndex: "discountValueInFixedAmount",
      key: "discountValueInFixedAmount",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountValueInPercentage",
      key: "discountValueInPercentage",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: "5%",
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

  const handlePagination = (page, pageSize) => {
    setPageSize(pageSize);
    setPage(page);
    /*  dispatcher(
      fetchAllServices({
        page: page - 1,
        pageSize,
      })
    ); */
  };

  const servicesList = services.map((item, index) => {
    return (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    );
  });

  const roleTypesList = roleTypes.map((item, index) => {
    return (
      <Option key={index} value={item}>
        {item}
      </Option>
    );
  });

  const discountTypesList = discountTypes.map((item, index) => {
    return (
      <Option key={index} value={item}>
        {item}
      </Option>
    );
  });

  const handleDurationChange = (moments, dateString) => {
    const dates = moments.map((moment) => moment.toISOString());
    console.log({ dates, dateString });
    setDuration(dates);
  };

  const onFinish = async (values) => {
    try {
      setCreateCouponProps((prevState) => ({ ...prevState, loading: true }));
      Object.entries({
        duration,
        "Applicable to": selectedRole,
        "Discount Type": selectedDiscount,
        Service: selectedService,
      }).forEach(([key, value]) => {
        if(!value){
            notificationAlert('error', `Invalid ${key}`, `Please select ${key}`);
            setCreateCouponProps((prevState) => ({ ...prevState, loading: false }));
            return;
        }
      })
      values.applicableTo = selectedRole;
      values.discountType = selectedDiscount;
      values.serviceId = selectedService;
      values.startDate = duration[0];
      values.expiryDate = duration[1];
      values[
        selectedDiscount === "PERCENTAGE"
          ? "discountValueInPercentage"
          : "discountValueInFixedAmount"
      ] = values.discountValue;
      delete values.duration;
      delete values.discountValue;

      const formattedValues = Object.fromEntries(
        Object.entries(values).map((val) => {
          if (!isNaN(val[1] * 1)) {
            val[1] = parseInt(val[1]).toFixed() * 1;
          }
          return val;
        })
      );

      const response = await Services.createCoupon({ data: formattedValues });
      const couponListRespnse = await Services.getCoupons({
        page: 0,
        pageSize: 10,
      });
      setCouponList(couponListRespnse.data.data.body);
      setCreateCouponProps((prevState) => ({
        ...prevState,
        loading: false,
        visible: false,
      }));
      notificationAlert(
        "success",
        "Coupon Created",
        `Coupon code ${response.data.data?.body?.couponCode} has been created`
      );
    } catch (error) {
      setCreateCouponProps((prevState) => ({ ...prevState, loading: false }));
      if (error.response) {
        notificationAlert(
          "error",
          "Error Occurred",
          error.response.data.message || "Please try again later"
        );
      } else {
        notificationAlert("error", "Error Occurred", "Please try again later");
      }
    }
  };
  return (
    <>
      <PageTitleBar
        onButtonClick={() =>
          setCreateCouponProps((prevState) => ({
            ...prevState,
            visible: true,
          }))
        }
        buttonText="Create Coupon"
        hideButtons={false}
        title="Coupons"
      />
      <TableComponent>
        <StyledTable
          scroll={{ x: "140vw" }}
          columns={columns}
          dataSource={couponList}
          /*  pagination={{
            total: paginationProps.total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            defaultCurrent: 1,
            current: paginationProps.page + 1,
            pageSize: pageSize,
            showSizeChanger: true,
            onChange: handlePagination,
          }} */
        />
      </TableComponent>
      <CreateServicesModal
        loading={createCouponProps.loading}
        onCancel={() =>
          setCreateCouponProps((prevState) => ({
            ...prevState,
            visible: false,
          }))
        }
        onServiceChange={(e) => setSelectedService(e)}
        onRoleTypeChange={(e) => setSelectedRole(e)}
        onDiscountTypeChange={(e) => setSelectedDiscount(e)}
        visible={createCouponProps.visible}
        servicesList={servicesList}
        roleList={roleTypesList}
        discountList={discountTypesList}
        discountTypes={discountTypes}
        selectedDiscountType={selectedDiscount}
        onFinish={onFinish}
        handleDurationChange={handleDurationChange}
      />
    </>
  );
};

const CreateServicesModal = (props) => {
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
        <Form.Item label="Discount Type" name="discountType">
          <StyledInputContainer>
            <Select
              placeholder="Select Discount Type"
              onChange={props.onDiscountTypeChange}
              style={{ width: "100%", textAlign: "left" }}
              bordered={false}
              defaultValue={props.selectedDiscountType}
            >
              {props.discountList}
            </Select>
          </StyledInputContainer>
        </Form.Item>

        <Form.Item
          label={`Discount ${
            props.selectedDiscountType === "PERCENTAGE"
              ? "Percentage"
              : "Amount"
          }`}
          name="discountValue"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input type="number" required bordered={false} />
          </StyledInputContainer>
        </Form.Item>

        <Form.Item label="Service Id" name="serviceId">
          <StyledInputContainer>
            <Select
              placeholder="Select Service"
              onChange={props.onServiceChange}
              style={{ width: "100%", textAlign: "left" }}
              bordered={false}
            >
              {props.servicesList}
            </Select>
          </StyledInputContainer>
        </Form.Item>
        <Form.Item label="Applicable To" name="applicableTo">
          <StyledInputContainer>
            <Select
              placeholder="Select Roles"
              onChange={props.onRoleTypeChange}
              style={{ width: "100%", textAlign: "left" }}
              bordered={false}
            >
              {props.roleList}
            </Select>
          </StyledInputContainer>
        </Form.Item>
        <Form.Item
          label="Usage Count"
          name="usageCount"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input type="number" required bordered={false} />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item
          label="User Count"
          name="userCount"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input type="number" required bordered={false} />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item label="Duration" name="duration">
          <StyledInputContainer>
            <RangePicker
              onChange={props.handleDurationChange}
              style={{ width: "100%" }}
              required
              bordered={false}
            />
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

const StyledTable = styled(AntTable)`
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
