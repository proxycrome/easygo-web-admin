import React from 'react';
import styled from 'styled-components';
import {fontFamily} from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import {CardScaffold} from './CardScaffold';
import {themes} from '../../globalAssets/theme';
import {getCenter} from '../../utils/getCenter';
import {
    PrimaryButton,
  } from './Buttons';
import { SelectDiv } from './SelectDiv';
import { Select } from 'antd'

const {Option} = Select

export const MerchantFinder = (props) => {
    return (
        <StyledMerchantFinder>
          <h1>Merchant Finder</h1>
          <CardScaffold>
            <StyledCardTitle>Merchant/POS agent</StyledCardTitle>
            <StyledMerchantFinderSelectDiv>
              <SelectDiv width='65.6%' placeholder='SELECT MERCHANT'>
                  <Option value='jack'>Jack</Option>
                  <Option value='lucy'>Lucy</Option>
                  <Option value='Yiminghe'>yiminghe</Option>
                </SelectDiv>
              <div>
                <PrimaryButton text='View Merchant Portal' />
              </div>
            </StyledMerchantFinderSelectDiv>
          </CardScaffold>
        </StyledMerchantFinder>
    );
};

const StyledMerchantFinder = styled.div`
  flex-basis: 65.6%;
  & > h1 {
    font-family: ${fontFamily.inter};
    color: ${themes.deepBlack};
    font-size: 18px;
    font-weight: 600;
  }
`;

const StyledCardTitle = styled.h1`
  text-transform: uppercase;
  font-family: ${fontFamily.sora};
  color: #556575;
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 14px;
  margin-bottom: 16px;

  @media ${device.laptop} {
    font-size: 0.95vw;
  }
`;

const StyledMerchantFinderSelectDiv = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};

  & > div:nth-child(2) {
    width: 31.5%;
  }
`;