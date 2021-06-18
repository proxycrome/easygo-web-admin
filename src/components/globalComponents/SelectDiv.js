
import React from 'react';
import styled from 'styled-components';
import {fontFamily} from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import {themes} from '../../globalAssets/theme';
import {Select} from 'antd';


export const SelectDiv = (props) => {
    return (
        <StyledSelectDiv islong width={props.width}>
        <StyledSelect
          placeholder={props.placeholder}
          islong
          bordered={false}
          defaultValue={props.defaultValue}
          suffixIcon={props.suffixIcon}
        >
         {props.children}
        </StyledSelect>
      </StyledSelectDiv>
    );
};


const StyledSelectDiv = styled.div`
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

const StyledSelect = styled(Select)`
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