import React, {useState, useEffect} from 'react';
import img1 from '../../images/img1.png';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { TransparentButton, StyledReactHTMLTableToExcel } from './Buttons';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GoHome as HomeIcon, GoCalendar } from 'react-icons/go';
import { Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { FiSearch as SearchIcon } from 'react-icons/fi';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const { Option } = Select;


const transactionStatus = ['Successful', 'Failed'];
const transactionMethod = ['CARD', 'USSD', 'WALLET', 'TRANSFER'];
const transactionType =['OTHER', 'WALLET_FUNDING'];

export const TableTopBar = (props) => {
  const [activeFilter, setActiveState] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [activeFilterName, setActiveFilterName] = useState('');


  useEffect(() => {
    if (props.isTransaction){
      props.onFilterTransaction(selectValue, activeFilterName?.toLowerCase())
    }
  }, [activeFilterName]);

  const  handleChangeFilterType = (value) => {
    if(value === 'Status'){
      setSelectValue(transactionStatus[0]);
      setActiveState(transactionStatus);
    }else if(value === 'transaction-method'){
      setActiveState(transactionMethod);
      setSelectValue(transactionMethod[0]);
    }else if(value === 'transaction-type'){
      setActiveState(transactionType);
      setSelectValue(transactionType[0]);
    }

    setActiveFilterName(value);
  }

  const handleFilterValueChange = (value) => {
    setSelectValue(value);
    props.onFilterTransaction(value, activeFilterName.toLowerCase())
  }

  const filterList = activeFilter.map((item, index) => {
    return (<Option key={index} value={item}> {item} </Option>);
  })

  const handleSelectClear = () => {
    setSelectValue('');
    setActiveFilterName('')
    setActiveState([]);
    props.clearFilter()
  }
  return (
    <StyledTableBar>
      {/* <StyledSearchInputBorder>
        <SearchIcon />
        <Input placeholder={props.placeholder} bordered={false} />{' '}
      </StyledSearchInputBorder>{' '} */}
      <StyledDateInputDiv style={{ width: 'auto', marginRight: '15px' }}>
        <StyledDateInputBorder>
          <DatePicker
            defaultValue={moment('2019-01-01', 'YYYY-MM-DD')}
            onChange={props.onStartDateChange}
            bordered={false}
            suffixIcon={<GoCalendar />}
          />{' '}
        </StyledDateInputBorder>{' '}
        <FaLongArrowAltRight style={{ color: '#3293C6', fontSize: '18px' }} />{' '}
        <StyledDateInputBorder>
          <DatePicker
            defaultValue={moment()}
            onChange={props.onEndDateChange}
            bordered={false}
            suffixIcon={<GoCalendar />}
          />{' '}
        </StyledDateInputBorder>{' '}
      </StyledDateInputDiv>{' '}
      <StyledDateInputDiv style={{ flex: 1 , marginRight: '15px' }}>
        {props.showfilterby && (
          <>
            Filter by:
            <StyledSelectDiv islong width="40%">
              <StyledSelect
                allowClear={true}
                onClear={handleSelectClear}
                style={{width: '50%'}}
                onChange={handleChangeFilterType}
                suffixIcon={
                  <IoMdArrowDropdown style={{ color: themes.deepBlack }} />
                }
                islong
                placeholder='Filter Category'
                bordered={false}>
                <Option value="Status"> Status</Option>{' '}
                <Option value="transaction-method"> Transaction method </Option>{' '}
                <Option value="transaction-type"> Transaction type </Option>{' '}
              </StyledSelect>
            </StyledSelectDiv>
            <StyledSelectDiv islong width="40%">
              <StyledSelect
                allowClear={true}
                onClear={handleSelectClear}
                suffixIcon={
                  <IoMdArrowDropdown style={{ color: themes.deepBlack }} />
                }
                islong
                placeholder='Filter Value'
                value={selectValue}
                onChange={handleFilterValueChange}
                bordered={false}>
                {filterList}
              </StyledSelect>
            </StyledSelectDiv>
          </>
        )}
        {/*  <TransparentButton
          width="40%"
          text="Export"
          color="#16192C"
          borderColor="#e2e2ea"
          backgroundColor="transparent"
        /> */}
       
      </StyledDateInputDiv>{' '}
      <StyledDateInputDiv style={{ width: '20%' }}>
          <StyledReactHTMLTableToExcel
            color="#16192C"
            borderColor="#e2e2ea"
            width="100%"
            backgroundColor="transparent"
            buttonText="Export"
            table={props.tableId}
            sheet="user-transaction"
            filename={props.fullName}
          />
        </StyledDateInputDiv>
    </StyledTableBar>
  );
};

const StyledTableBar = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-bottom: 15px;
  ${getCenter({ justifyContent: 'flex-start' })};
`;
const StyledInputBorderSmall = styled.div`
  background: #ffffff;
  border: 1px solid #c4cdd5;
  box-sizing: border-box;
  box-shadow: inset 0px 1px 2px rgba(102, 113, 123, 0.21);
  border-radius: 6px;
`;

export const StyledSearchInputBorder = styled(StyledInputBorderSmall)`
  width: 31.5%;
  display: flex;
  align-items: center;
  padding: 5px 11px;

  & > :first-child {
    color: #919eab;
    font-size: 18px;
  }

  & > :nth-child(2) {
    &::placeholder {
      color: #919eab;
      font-size: 16px;
    }
  }
`;
export const StyledDateInputDiv = styled.div`
  width: 31.5%;
  ${getCenter({ justifyContent: 'space-between' })};
`;

export const StyledDateInputBorder = styled(StyledInputBorderSmall)`
  display: flex;
  align-items: center;
  width: 45%;
`;

export const StyledSelectDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.islong ? '0px' : '10px')};
  border: 0.725px solid #e2e2ea;
  cursor: pointer;

  background-color: #fff;
  border-radius: 5px;

  font-family: ${fontFamily.body};
  font-size: 11px;
  padding-left: 5px;
  width: ${(props) => props.width};

  & p {
    margin: 0px;
    color: #7a7a9d;
  }
`;

export const StyledSelect = styled(Select)`
  font-size: ${(props) => (props.islong ? '16px' : '11px')};
  color: ${themes.deepBlack};
  font-weight: 500;
  /* width: ${(props) => (props.islong ? '100%' : '100px')}; */

  width: 100% !important;

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0px 0px 0px 2px !important;
  }

  @media ${device.laptop} {
    font-size: ${(props) => (props.islong ? '1.1vw' : '0.7vw')};
    width: 7vw;
  }
`;
