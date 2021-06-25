// @flow
import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';

export const PrimaryButton = ({ other, hasIcon, icon, text, ...props }) => {
  return (
    <StyledButton others={other} hasIcon={hasIcon} {...props}>
      {' '}
      {icon} {text}{' '}
    </StyledButton>
  );
};

export const TransparentButton = (props) => {
  return (
    <StyledTranparentButton
      color={props.color}
      backgroundColor={props.backgroundColor}
      borderColor={props.borderColor}
      width={props.width}>
      {props.text}{' '}
    </StyledTranparentButton>
  );
};

export const StyledButton = styled.button`
  ${getCenter()};
  font-size: 12px;
  background-color: ${(props) =>
    props.others ? themes.red : themes.primaryColor};
  border: none;
  color: #fff;
  border-radius: 6px;
  padding: 8px 20px;
  font-family: ${fontFamily.inter};
  font-weight: 600;
  cursor: pointer;
  width: 100%;

  &:hover,
  &:focus {
    outline: none;
  }

  & > :first-child {
    margin-right: ${(props) => props.hasIcon && '10px'};
    font-size: ${(props) => props.hasIcon && '16px'};
  }

  @media ${device.laptop} {
    font-size: 0.9vw;

    & > :first-child {
      font-size: ${(props) => props.hasIcon && '1.1vw'};
    }
  }
`;

const StyledTranparentButton = styled.button`
  background: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 6px;
  font-family: ${fontFamily.sora};
  font-size: 14px;
  color: ${(props) => props.color};
  letter-spacing: -0.16187px;
  padding: 5.6px 17.6px;
  cursor: pointer;
  width: ${(props) => props.width};

  &:focus {
    outline: none;
  }

  @media ${device.laptop} {
    font-size: 1vw;
  }
`;
