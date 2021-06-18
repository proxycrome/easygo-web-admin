import React from 'react';
import styled from 'styled-components';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { themes } from '../../globalAssets/theme';
import { CardScaffold } from './CardScaffold';
import { getCenter } from '../../utils/getCenter';
import { Select } from 'antd';
import { TopSelectButton } from './TopSelectButton';

const { Option } = Select;

export const PageTitleBar = (props) => {
  return (
    <StyledTitleBar>
      <h1> {props.title} </h1>{' '}
      <div>
        {' '}
        {!props.hideButtons && (
          <>
            <TopSelectButton
              optionList={['All Channels', 'lucy', 'Yiminghe']}
            />{' '}
            <TopSelectButton optionList={['Today', 'lucy', 'Yiminghe']} />{' '}
          </>
        )}{' '}
      </div>{' '}
    </StyledTitleBar>
  );
};

const StyledTitleBar = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};

  & h1 {
    text-transform: capitalize;
    font-family: ${fontFamily.inter};
    font-weight: 600;
    color: ${themes.deepBlack};
    font-size: 24px;
  }

  & > div {
    ${getCenter()};
  }

  @media ${device.laptop} {
    font-size: 1.6vw;
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
