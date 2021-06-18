import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import { TableComponent } from '../globalComponents/TableComponent';
import { TableTopBar } from '../globalComponents/TableTopBar';
import { Table } from '../globalComponents/Table';
import { Tabs} from 'antd';
import { PageTitleBar } from '../globalComponents/PageTitleBar';
import { BackButton } from '../globalComponents/BackButton';
import {useHistory, useRouteMatch} from 'react-router-dom';
import { data } from '../data/settlementData';
import { UserTableRow } from '../TableRows/UserTableRow';

const { TabPane } = Tabs;

const title = [
    'Merchant',
    'Transaction ID',
    'Bank',
    'Account number',
    'User Amount',
    'Date',
    'Status',
  ];


export const AllUserTable = (props) => {
    const history = useHistory();
    const {url, path} = useRouteMatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const gotoUserDetail = () => {
          history.push(`${url}/settlement-detail`)
      }

    const tableTitle = title.map((item, index) => {
        return <th key={index}>{item}</th>;
    });

    const tableBody = data.map((data, index) => (
        <UserTableRow onClick={gotoUserDetail} data={data} key={index} />
    ));


    const handlePaginationChange = (page, pageSize) => {

    }


    return (
        <>
        <BackButton location='to Overview'/>
        <PageTitleBar title='All Users'/>
        <TableComponent
             isfulltable
             length={data.length}
             handlePaginationChange={handlePaginationChange}
             currentPage={currentPage}
             pageSize={pageSize}
        >
            <Tabs
            tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
            defaultActiveKey='1'
            >
                <TabPane tab='All Transactions' key='1'>
                    <TableTopBar />
                    <Table tableTitle={tableTitle} tableBody={tableBody} />
                </TabPane>
               
            </Tabs>
        </TableComponent>
    </>
    );
};