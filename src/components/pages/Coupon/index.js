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
import { servicesSelector } from "../ProductServices/slice";

const { RangePicker } = DatePicker;

const { Option } = Select;
const { TabPane } = Tabs;

export const Coupons = (props) => {
  const [createCouponProps, setCreateCouponProps] = useState({
    visible: false,
    loading: false,
  });
  const [editCouponProps, setEditCouponProps] = useState({
    visible: false,
    loading: false,
    selectedCoupon: {},
  });
  const [editModalForm] = Form.useForm();
  const [couponList, setCouponList] = useState([]);
  const { services } = useSelector(servicesSelector);
  const { discountTypes, roleTypes } = useSelector(selectDashboard);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceStatus, setServiceStatus] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [duration, setDuration] = useState([]);
  const dispatcher = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    editModalForm.setFieldsValue({
      duration: [
        moment(editCouponProps.selectedCoupon?.startDate),
        moment(editCouponProps.selectedCoupon?.expiryDate),
      ],
      ...editCouponProps.selectedCoupon,
      discountValue:
        editCouponProps.selectedCoupon?.discountType === "PERCENTAGE"
          ? editCouponProps.selectedCoupon?.discountValueInPercentage
          : editCouponProps.selectedCoupon?.discountValueInFixedAmount,
      serviceId: editCouponProps.selectedCoupon?.serviceDto?.id,
      statusType: editCouponProps.selectedCoupon?.recordStatus?.status,
      code: editCouponProps.selectedCoupon?.couponCode
    });
  }, [editCouponProps.selectedCoupon]);

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
      title: "Status",
      dataIndex: "recordStatus",
      key: "recordStatus",
      render: ({ status }, allData) => {
        return status === "ACTIVE" ? (
          <Tag color="#87d068">{status}</Tag>
        ) : status === "SUSPENDED" ? (
          <Tag color="#FF9800">{status}</Tag>
        ) : (
          <Tag color="#f50">{status}</Tag>
        );
      },
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
            <p
              onClick={() => {
                editModalForm.resetFields();
                return setEditCouponProps((prevState) => ({
                  ...prevState,
                  selectedCoupon: allData,
                  visible: true,
                }));
              }}
              style={{ cursor: "pointer" }}
            >
              Edit
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
        if (!value) {
          notificationAlert("error", `Invalid ${key}`, `Please select ${key}`);
          setCreateCouponProps((prevState) => ({
            ...prevState,
            loading: false,
          }));
          return;
        }
      });
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

  const onEditFinish = async (values) => {
    try {
      setEditCouponProps((prevState) => ({ ...prevState, loading: true }));
      const durationList = values.duration.map((moment) =>
        moment.toISOString()
      );
      values.startDate = duration[0] || durationList[0];
      values.expiryDate = duration[1] || durationList[1];
      values.applicableTo = selectedRole || values.applicableTo;
      values.discountType = selectedDiscount || values.discountType;
      values.serviceId = selectedService || values.serviceId;
      values.statusType = serviceStatus ?? values.statusType
     /*  values.code = editCouponProps.selectedCoupon.couponCode */
      values[
        selectedDiscount === "PERCENTAGE"
          ? "discountValueInPercentage"
          : "discountValueInFixedAmount"
      ] = values.discountValue;
      delete values.duration;
      delete values.discountValue;
      const response = await Services.updateCoupon({ data: values, id:  editCouponProps.selectedCoupon.id});
      const couponListRespnse = await Services.getCoupons({
        page: 0,
        pageSize: 10,
      });
      setCouponList(couponListRespnse.data.data.body);
      setEditCouponProps((prevState) => ({
        ...prevState,
        loading: false,
        visible: false,
      }));
      notificationAlert(
        "success",
        "Coupon Created",
        `Coupon code ${response.data.data?.body?.couponCode} has been updated`
      );

      setSelectedDiscount("");
      setSelectedRole("");
      setSelectedService("");
    } catch (error) {
      setEditCouponProps((prevState) => ({ ...prevState, loading: false }));
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
      <CreateCouponModal
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
      <EditCouponModal
        form={editModalForm}
        loading={editCouponProps.loading}
        onCancel={() =>
          setEditCouponProps((prevState) => ({
            ...prevState,
            visible: false,
          }))
        }
        onServiceChange={(e) => setSelectedService(e)}
        onRoleTypeChange={(e) => setSelectedRole(e)}
        onDiscountTypeChange={(e) => setSelectedDiscount(e)}
        onRecordStatusChange={(val) => setServiceStatus(val) }
        visible={editCouponProps.visible}
        servicesList={servicesList}
        roleList={roleTypesList}
        discountList={discountTypesList}
        discountTypes={discountTypes}
        selectedDiscountType={selectedDiscount}
        onFinish={onEditFinish}
        defaultValue={editCouponProps.selectedCoupon}
        handleDurationChange={handleDurationChange}
      />
    </>
  );
};

const CreateCouponModal = (props) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };

  return (
    <StyledModal
      title="Create Coupon"
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

const EditCouponModal = (props) => {
  const onOk = () => {
    props.form.submit();
  };

  return (
    <StyledModal
      title="Edit Coupon"
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
        form={props.form}
        initialValues={{
          duration: [
            moment(props.defaultValue?.startDate),
            moment(props.defaultValue?.expiryDate),
          ],
          ...props.defaultValue,
          discountValue:
            props.defaultValue?.discountType === "PERCENTAGE"
              ? props.defaultValue?.discountValueInPercentage
              : props.defaultValue?.discountValueInFixedAmount,
          serviceId: props.defaultValue?.serviceDto?.id,
        }}
      >
         <Form.Item
          label="Coupon Code"
          name="code"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input
              defaultValue={props.defaultValue?.couponCode}
              required
              bordered={false}
              disabled
            />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item label="Discount Type" name="discountType">
          <StyledInputContainer>
            <Select
              placeholder="Select Discount Type"
              onChange={props.onDiscountTypeChange}
              style={{ width: "100%", textAlign: "left" }}
              bordered={false}
              defaultValue={props.defaultValue?.discountType}
            >
              {props.discountList}
            </Select>
          </StyledInputContainer>
        </Form.Item>

        <Form.Item
          label={`Discount ${
            props.defaultValue?.discountType === "PERCENTAGE"
              ? "Percentage"
              : "Amount"
          }`}
          name="discountValue"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input
              defaultValue={
                props.defaultValue?.discountType === "PERCENTAGE"
                  ? props.defaultValue?.discountValueInPercentage
                  : props.defaultValue?.discountValueInFixedAmount
              }
              type="number"
              required
              bordered={false}
            />
          </StyledInputContainer>
        </Form.Item>

        <Form.Item label="Service Id" name="serviceId">
          <StyledInputContainer>
            <Select
              placeholder="Select Service"
              onChange={props.onServiceChange}
              style={{ width: "100%", textAlign: "left" }}
              bordered={false}
              defaultValue={props.defaultValue?.serviceDto?.id}
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
              defaultValue={props.defaultValue?.applicableTo}
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
            <Input
              defaultValue={props.defaultValue?.usageCount}
              type="number"
              required
              bordered={false}
            />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item
          label="User Count"
          name="userCount"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input
              defaultValue={props.defaultValue?.userCount}
              type="number"
              required
              bordered={false}
            />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item label="Duration" name="duration">
          <StyledInputContainer>
            <RangePicker
              format="YYYY-MM-DD"
              onChange={props.handleDurationChange}
              style={{ width: "100%" }}
              required
              bordered={false}
              defaultValue={[
                moment(props.defaultValue?.startDate),
                moment(props.defaultValue?.expiryDate),
              ]}
            />
          </StyledInputContainer>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="statusType"
          label="Status"
        >
          <StyledInputContainer>
            <Select
              placeholder="Select payment status"
              defaultValue={props.defaultValue?.recordStatus?.status}
              bordered={false}
              style={{ width: "100%", textAlign: "left" }}
              onChange={props.onRecordStatusChange}
            >
              <Option value="ACTIVE">ACTIVE </Option>{" "}
              <Option value="SUSPENDED"> SUSPENDED </Option>{" "}
              <Option value="DELETE"> DELETE </Option>{" "}
            </Select>
          </StyledInputContainer>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <StyledInputContainer>
            <Input.TextArea
              defaultValue={props.defaultValue?.description}
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

const StyledTable = styled(AntTable)`
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
