import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { TableComponent } from '../globalComponents/TableComponent';
import { TableTopBar } from '../globalComponents/TableTopBar';
import { Table } from '../globalComponents/Table';
import { Tabs} from 'antd';
import { PageTitleBar } from '../globalComponents/PageTitleBar';
import {useHistory} from 'react-router-dom';
import { BackButton } from '../globalComponents/BackButton';
import moment from 'moment'
/* import { getMerchantDetailAction, getTokenAction } from '../../actions'; */

const { TabPane } = Tabs;

const title = [
    'ID',
    'Merchat Name',
    'Channels',
    'Volume',
    'Revenue',
    'Transaction count',
    'Last Activity',
  ];

export const AllDashBoardTable = (props) => {
   

    return (
        <>
            <BackButton location='to Overview'/>
            <PageTitleBar title='Welcome to Sterling Bank'/>
            <TableComponent 
                isfulltable
            >
                <Tabs
                tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
                defaultActiveKey='1'
                >
                    <TabPane tab='All Merchants' key='1'>
                        <TableTopBar
                        />
                        <Table /* tableTitle={tableTitle} tableBody={tableBody}  *//>
                    </TabPane>
                    <TabPane tab='Top Performing' key='2'>
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab='Least Performing' key='3'>
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </TableComponent>
      </>
    );
};

