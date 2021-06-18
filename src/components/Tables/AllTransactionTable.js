import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import { TableComponent } from '../globalComponents/TableComponent';
import { TableTopBar } from '../globalComponents/TableTopBar';
import { Table } from '../globalComponents/Table';
import { Tabs} from 'antd';
import { PageTitleBar } from '../globalComponents/PageTitleBar';
import { BackButton } from '../globalComponents/BackButton';
import {useHistory, useRouteMatch} from 'react-router-dom';
import { data } from '../data/merchantData2';
import { MerchantTableRow2 } from '../TableRows/MerchantTableRow2';

const { TabPane } = Tabs;



const title = [
    'Merchant',
    'Product',
    'Terminal ID',
    'Channel',
    'Response time',
    'Amount',
    'Type',
    'Date',
    'Status',
  ];

export const AllTransactionTable = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const tableTitle = title.map((item, index) => {
        return <th key={index}>{item}</th>;
      });

    const tableBody = data.map((data, index) => (
        <MerchantTableRow2  data={data} key={index} />
      ));


      const handlePaginationChange = (page, pageSize) => {

      }

    return (
        <>
        <BackButton location='to Overview'/>
        <PageTitleBar title='All Transactions'/>
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
                <TabPane tab='All Merchants' key='1'>
                    <TableTopBar />
                    <Table tableTitle={tableTitle} tableBody={tableBody} />
                </TabPane>
                <TabPane tab='Open' key='2'>
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab='Resolved' key='3'>
                  Content of Tab Pane 3
                </TabPane>
               
            </Tabs>
        </TableComponent>
    </>
    );
};