import React from 'react';
import styled from 'styled-components';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { CardScaffold } from './CardScaffold';
import { TopSelectButton } from './TopSelectButton';

export const ListCard = (props) => {
  return (
    <CardScaffold style={props.style}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'no-wrap',
        }}
      >
        <StyledCardTitle>{props.title}</StyledCardTitle>
       {props.showbutton && (<div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TopSelectButton optionList={['All Channels', 'lucy', 'Yiminghe']} />
          <TopSelectButton optionList={['Today', 'lucy', 'Yiminghe']} />
        </div>)}
      </div>

      <StyledCardTitle style={{ textAlign: 'right' }}>
        {props.subtitle}
      </StyledCardTitle>

      {props.children}
    </CardScaffold>
  );
};

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
