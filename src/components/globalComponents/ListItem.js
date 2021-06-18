import React from 'react';
import img1 from '../../images/img1.png';
import styled from 'styled-components';
import {themes} from '../../globalAssets/theme';
import {getCenter} from '../../utils/getCenter';
import {fontFamily} from '../../globalAssets/fontFamily';




export const ListItem = (props) => {
    return (
        <StyledBankRating>
        <p>{props.left}</p>
        <p>{props.right}</p>
      </StyledBankRating>
    );
};


const StyledBankRating = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between', flexWrap: 'no-wrap' })};
  margin-bottom: 12px;

  & p:first-child {
    font-family: ${fontFamily.sora};
    font-weight: 400;
    font-size: 12px;
    color: ${themes.subtleBlack};
  }

  & p:nth-child(2) {
    font-family: ${fontFamily.inter};
    font-weight: 700;
    font-size: 14px;
    color: ${themes.deepBlack};
    text-align: right;
  }
`;