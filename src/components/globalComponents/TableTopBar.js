import React from 'react';
import img1 from '../../images/img1.png';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { TransparentButton } from './Buttons';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { GoHome as HomeIcon, GoCalendar } from 'react-icons/go';
import { Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { FiSearch as SearchIcon } from 'react-icons/fi';

const { Option } = Select;

export const TableTopBar = (props) => {
  return (
    <StyledTableBar>
      <StyledSearchInputBorder>
        <SearchIcon />
        <Input
          placeholder={props.placeholder}
          bordered={false}
        />{' '}
      </StyledSearchInputBorder>{' '}
      <StyledDateInputDiv>
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
      <StyledDateInputDiv>
        {props.showfilterby && (
          <>
          Filter by:
        <StyledSelectDiv islong width="40%">
          <StyledSelect
            suffixIcon={
              <IoMdArrowDropdown style={{ color: themes.deepBlack }} />
            }
            islong
            defaultValue="All Transactions"
            bordered={false}>
            <Option value="All Transactions"> All Transactions </Option>{' '}
            <Option value="Failed"> Failed </Option>{' '}
            <Option value="Successful"> Successful </Option>{' '}
          </StyledSelect>
        </StyledSelectDiv>
        </>
        )}
        <TransparentButton
          width="40%"
          text="Export"
          color="#16192C"
          borderColor="#e2e2ea"
          backgroundColor="transparent"
        />
      </StyledDateInputDiv>{' '}
    </StyledTableBar>
  );
};

const StyledTableBar = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};
  padding: 0 23px;
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
