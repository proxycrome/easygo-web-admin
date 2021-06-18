import React from 'react';
import styled from 'styled-components';
import {fontFamily} from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import {CardScaffold} from './CardScaffold';
import {themes} from '../../globalAssets/theme';
import {getCenter} from '../../utils/getCenter';
import {
    PrimaryButton,
    TransparentButton,
  } from './Buttons';



export const ActionKeys = (props) => {
    return (
        <StyledKeyActionsDiv>
          <h1>Key Actions</h1>
          <CardScaffold>
            <PrimaryButton text='Review Merchant KYC (13)' />
            <StyledButttonDiv>
              <TransparentButton
                width='48%'
                borderColor='transparent'
                text='Edit Fees'
                color='#fff'
                backgroundColor='#425466'
              />
              <TransparentButton
                width='48%'
                borderColor='#08A06A'
                text='Add Merchant'
                color='#08A06A'
                backgroundColor='transparent'
              />
            </StyledButttonDiv>
          </CardScaffold>
        </StyledKeyActionsDiv>
        
    );
};


const StyledKeyActionsDiv = styled.div`
  flex-basis: 31.5%;
  & h1 {
    font-family: ${fontFamily.inter};
    color: ${themes.deepBlack};
    font-size: 18px;
    font-weight: 600;
  }
`;

const StyledButttonDiv = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};
  margin-top: 20px;
`;




