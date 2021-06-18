// @flow
import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';

export const CardScaffold = (props) => {
  return (
    <StyledCardScaffold style={props.style}>
      {' '}
      {props.children}
    </StyledCardScaffold>
  );
};

const StyledCardScaffold = styled.div`
  box-shadow: 0px 3px 8px -1px rgba(50, 50, 71, 0.05);
  background-color: ${themes.backgroundColor_w};
  border-radius: 10px;
  padding: 24px 23px;
  width: 100%;
`;
