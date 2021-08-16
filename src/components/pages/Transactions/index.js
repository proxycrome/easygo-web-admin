import React, { useState } from "react";
import {
  Tabs,
  Table as AntTable,
  Tag,
  Popover,
  Form,
  Input,
  Select,
  Typography,
  Statistic,
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
import { StyledModal } from "../../globalComponents/styles";
import { notificationAlert } from "../../../utils/notificationAlert";
import { PaymentDetail } from "../Users/CustomerDetails";
import { themes } from "../../../globalAssets/theme";
const { Option } = Select;
const { TabPane } = Tabs;

const dataSource = [
  {
    key: "1",
    id: "#12234",
    status: "successful",
    date: "June 21st 2021",
    amount: "200000",
    username: "Johnson Adewale",
  },
  {
    key: "2",
    id: "#56778",
    date: "Dec 21st 2021",
    amount: "200000",
    status: "failed",
    username: "Johnson Adewale",
  },
];

export const Transaction = (props) => {
  const [form] = Form.useForm();
  const { allTransactions } = useSelector(selectTransactions);
  const [page, setPage] = useState(1);
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const dispatcher = useDispatch();
  const [requeryModalProps, setRequeryModalProps] = useState({
    loading: false,
    isVisible: false,
    ref: "",
    id: "",
  });
  const [transactionPageSize, setTransactionPageSize] = useState(10);
  const [endDate, setEndDate] = useState(moment().format("YYYY/MM/DD"));
  const [startDate, setStartDate] = useState("2019/01/01");
  const [filterParam, setFilterParam] = useState({ field: "", value: "" });

  const [queryResultModalProps, setQueryResultModalProps] = useState({
    data: {},
    isVisible: false,
  });

  const openRequeryModal = ({transactionIdIfRave,amount,transactionReferenceInit, customerFullName, id}) => () => {
    setRequeryModalProps((prevState) => ({
      ...prevState,
      rave: transactionIdIfRave,
      ref: transactionReferenceInit,
      id,
      amount,
      fullName: customerFullName,
      isVisible: true,
    }));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "3%",
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "customerFullName",
      key: "customerFullName",
      /*  width: '7%',
      fixed: 'left', */
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Phone number",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => parseInt(a.amount) - parseInt(b.amount),
      sortDirections: ["descend", "ascend"],
      render: (data) => (
        <Statistic
          valueStyle={{ fontSize: "1.1vw", color: themes.boldText }}
          value={data}
          prefix="₦"
        />
      ),
    },
    {
      title: "Charge",
      dataIndex: "charge",
      key: "charge",
      render: (data) => (
        <Statistic
          valueStyle={{ fontSize: "1.1vw", color: themes.boldText }}
          value={data}
          prefix="₦"
        />
      ),
    },
    {
      title: "Logged At",
      dataIndex: "dateInitLogged",
      key: "dateInitLogged",
      sorter: (a, b) => {
        let startDate = moment(a.dateInitLogged);
        let endDate = moment(b.dateInitLogged);

        return endDate.diff(startDate, "days");
      },
      defaultSortOrder: "ascend",
      sortDirections: ["ascend"],
      render: (time, allData) => {
        /* console.log(time); */
        /*let realTime =  allData.valueGiven? allData.dateTransactionLoggedAt:  allData.dateInitLogged; */
        return time ? (
          <p>{moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        ) : (
          ""
        );
      },
    },
    {
      title: "Value Given At",
      dataIndex: "dateValueWasGiven",
      key: "dateValueWasGiven",
      render: (time) => {
        return time ? (
          <p>{moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        ) : (
          ""
        );
      },
    },
    {
      title: "Paid At",
      dataIndex: "paidAt",
      key: "paidAt",
      render: (time) => {
        return time ? (
          <p>{moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        ) : (
          ""
        );
      },
    },
    {
      title: "Paid For",
      dataIndex: "paidFor",
      key: "paidFor",
    },
    {
      title: "Payee",
      dataIndex: "payee",
      key: "payee",
    },
    {
      title: "Payment Gateway",
      dataIndex: "paymentGateway",
      key: "paymentGateway",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Method",
      dataIndex: "transactionMethod",
      key: "transactionMethod",
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Reference",
      dataIndex: "transactionReference",
      key: "transactionReference",
      render: (data, allData) => {
        return allData.valueGiven
          ? allData.transactionReference
          : allData.transactionReferenceInit;
      },
    },
    {
      title: "Status",
      dataIndex: "valueGiven",
      key: "valueGiven",
      width: 100,
      fixed: "right",
      filters: [
        {
          text: "Successful",
          value: true,
        },
        {
          text: "Failed",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.valueGiven === value;
      },
      render: (status) => {
        return status ? (
          <Tag color="#87d068">Successful</Tag>
        ) : (
          <Tag color="#f50">Failed</Tag>
        );
      },
    },{
      title: "Re-query",
      dataIndex: "transactionIdIfRave",
      key: "transactionIdIfRave",
      width: 100,
      fixed: "right",
      render: (data) => data? 'YES':'NO'
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "4%",
      fixed: "right",
      render: (action, { transactionIdIfRave,customerFullName,transactionReferenceInit, amount, id,  }) => {
        const content = (
          <div>
            <p
              onClick={openRequeryModal({transactionIdIfRave,amount,transactionReferenceInit, customerFullName, id})}
              style={{ cursor: "pointer" }}
            >
              Re-query
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

  function callback(key) {}

  const gotoAllTransactionTable = () => {
    history.push(`${url}/table`);
  };

  const handlePagination = (page, pageSize) => {
    setTransactionPageSize(pageSize);
    setPage(page);
    dispatcher(
      fetchTransactions({
        page: page - 1,
        pageSize,
        "start-date": startDate,
        "end-date": endDate,
        [filterParam.field]: filterParam.value,
      })
    );
  };
  const handleRequeryTransaction = async (e) => {
    e.preventDefault();
    try {
       setRequeryModalProps((prevState) => ({ ...prevState, loading: true }));
      const response = await dispatcher(requeryTransaction({ data: {transactionReference: requeryModalProps.ref}}));
      console.log(response);
      notificationAlert(
        "success",
        "Re-query Successfull",
        "Operation was successful"
      );
      setQueryResultModalProps((prevState) => ({
        ...prevState,
        isVisible: true,
        data: response,
      }));
      setRequeryModalProps((prevState) => ({
        ...prevState,
        isVisible: false,
        loading: false,
      }));
    } catch (error) {
      notificationAlert("error", "Re-query Failed", "Please try again");
      setRequeryModalProps((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const closeRequeryModal = (values) => {
    setRequeryModalProps((prevState) => ({ ...prevState, isVisible: false }));
  };

  const closeQueryResultModal = () => {
    setQueryResultModalProps((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  const formatDate = (date) => {
    return date.split("-").join("/");
  };
  const onStartDateChange = (date, dateString) => {
    setStartDate(formatDate(dateString));
    dispatcher(
      fetchTransactions({
        page: page - 1,
        pageSize: transactionPageSize,
        "start-date": formatDate(dateString),
        "end-date": endDate,
        [filterParam.field]: filterParam.value,
      })
    );
  };

  const onEndDateChange = (date, dateString) => {
    setEndDate(formatDate(dateString));
    dispatcher(
      fetchTransactions({
        page: page - 1,
        pageSize: transactionPageSize,
        "start-date": startDate,
        "end-date": formatDate(dateString),
        [filterParam.field]: filterParam.value,
      })
    );
  };

  const onFilterTransaction = (value, field) => {
    //value = value === 'Successful' ? true : value === 'Failed' ? false : value;

    setFilterParam({ value, field });

    dispatcher(
      fetchTransactions({
        page: page - 1,
        pageSize: transactionPageSize,
        "start-date": startDate,
        "end-date": endDate,
        [field]: value,
      })
    );
  };

  const clearFilter = () => {
    setFilterParam({ value: "", field: "" });
  };

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <PageTitleBar hideButtons={true} title="Transactions" />
        <TableComponent onClick={gotoAllTransactionTable}>
          <Tabs
            tabBarStyle={{ color: "#A0AEC0", padding: "0px 23px" }}
            defaultActiveKey="1"
            onChange={callback}
          >
            <TabPane tab="All Transactions" key="1">
              <TableTopBar
                isTransaction={true}
                showfilterby
                onFilterTransaction={onFilterTransaction}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
                clearFilter={clearFilter}
                tableId="transactions"
                fullName="All Transactions"
                placeholder="Transaction ID, Customer Full Name"
              />
              <AntTable
                columns={columns}
                scroll={{ x: "180vw", y: '80vh' }}
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
        <table id="transactions" style={{ display: "none" }}>
          <thead>
            <tr>
              {allTransactions.data.length &&
                Object.keys(allTransactions.data[0])
                  .filter(
                    (props) =>
                      props !== "requestBody" &&
                      props !== "responseBody" &&
                      props !== "user" &&
                      props !== "monnifyResponseBody"
                  )
                  .map((item, index) => {
                    return <td key={index}>{item}</td>;
                  })}
            </tr>
          </thead>
          <tbody>
            {allTransactions.data.map(
              (
                {
                  requestBody,
                  responseBody,
                  user,
                  monnifyResponseBody,
                  ...item
                },
                index
              ) => {
                return (
                  <tr key={`${index}-item`}>
                    {Object.values(
                      Object.fromEntries(
                        Object.entries(item).map(([key, value]) => [
                          key,
                          typeof value === "boolean" && value
                            ? "Successful"
                            : typeof value === "boolean" && !value
                            ? "Failed"
                            : typeof value !== "boolean" && value
                            ? value
                            : "",
                        ])
                      )
                    )
                      .filter((item) => typeof item !== "object")
                      .map((data, idx) => {
                        return <td key={`${idx}-data`}>{data ?? ""}</td>;
                      })}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <StyledModal
          onCancel={closeRequeryModal}
          visible={requeryModalProps.isVisible}
          footer={false}
        >
          <Typography.Title level={4}>Re-query Transaction</Typography.Title>
          {requeryModalProps.rave? 
            <Typography>
              Would you like to re-query transaction of{" "}
              <strong>{requeryModalProps.amount}</strong> by{" "}
              <strong>{requeryModalProps.fullName}</strong>
            </Typography>
            :
            <Typography>
              This transaction can not be re-queried.
          </Typography>
          }
          
          {requeryModalProps.rave && 
             <PrimaryButton style={{marginTop: '20px'}} onClick={handleRequeryTransaction} text='Re-query'/>
         
          }
        </StyledModal>
        <StyledModal
          onCancel={closeQueryResultModal}
          visible={queryResultModalProps.isVisible}
          footer={false}
        >
          <div style={{ width: "100%" }}>
            <PaymentDetail
              left="Transaction Reference"
              right={queryResultModalProps?.data?.transactionReference}
            />
            <PaymentDetail
              left="Transaction Type"
              right={queryResultModalProps?.data?.transactionType}
            />
            <PaymentDetail
              left="Transaction Method"
              right={queryResultModalProps?.data?.transactionMethod}
            />
            <PaymentDetail
              left="Customer Name"
              right={queryResultModalProps?.data?.customerName}
            />
            <PaymentDetail
              left="Service"
              right={queryResultModalProps?.data?.service}
            />
            <PaymentDetail
              left="Amount"
              right={queryResultModalProps?.data?.amount}
            />
            <PaymentDetail
              left="Status"
              right={
                queryResultModalProps?.data?.valueGiven
                  ? "Successful"
                  : "Failed"
              }
            />
            <PaymentDetail
              left="Payee"
              right={queryResultModalProps?.data?.payee}
            />
            <PaymentDetail
              left="Paid At"
              right={queryResultModalProps?.data?.paidAt}
            />
          </div>
        </StyledModal>
      </Route>
    </Switch>
  );
};

const RequeryModal = (props) => {
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
      <h3>Re-query Transaction </h3>
      {props.referenceId ? (
        <p>
          Do you want to re-query transaction by <strong></strong>
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
