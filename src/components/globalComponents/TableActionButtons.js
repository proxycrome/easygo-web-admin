import React from 'react';
import styled from 'styled-components';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { CardScaffold } from './CardScaffold';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { PrimaryButton } from './Buttons';
import { SelectDiv } from './SelectDiv';
import { Select } from 'antd';
import { IoMdArrowDropdown } from 'react-icons/io';
import { StyledGap } from '../globalStyle';

const { Option } = Select;

export const TableActionButtons = (props) => {
  return (
    <StyledActionButtonDiv>
      <SelectDiv
        width='15%'
        suffixIcon={<IoMdArrowDropdown style={{ color: themes.deepBlack }} />}
        islong
        defaultValue='Select'
        bordered={false}
      >
        <Option value='All Channel'>All Channel</Option>
        <Option value='Select'>Select</Option>
        <Option value='Select2'>Select2</Option>
      </SelectDiv>
      <StyledGap />
      <SelectDiv
        islong
        width='15%'
        suffixIcon={<IoMdArrowDropdown style={{ color: themes.deepBlack }} />}
        defaultValue='Select'
        bordered={false}
      >
        <Option value='All Channel'>All Channel</Option>
        <Option value='Select'>Select</Option>
        <Option value='Select2'>Select2</Option>
      </SelectDiv>
      <StyledGap />
      <SelectDiv
        width='15%'
        suffixIcon={<IoMdArrowDropdown style={{ color: themes.deepBlack }} />}
        islong
        defaultValue='Select'
        bordered={false}
      >
        <Option value='All Channel'>All Channel</Option>
        <Option value='Select'>Select</Option>
        <Option value='Select2'>Select2</Option>
      </SelectDiv>
      <StyledGap />
      <div style={{ width: '15%' }}>
        <PrimaryButton other={props.other} text='Search Now'/>
      </div>
    </StyledActionButtonDiv>
  );
};

const StyledActionButtonDiv = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 0 23px;
  ${getCenter({ justifyContent: 'flex-start' })}
`;

