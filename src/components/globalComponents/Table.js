import React from 'react';
import img1 from '../../images/img1.png';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { Pagination } from 'antd';

export const Table = (props) => {
  return (
    <StyledTable>
      <StyledTableHead subtleheader={props.subtleheader}>
        <tr> {props.tableTitle} </tr>{' '}
      </StyledTableHead>{' '}
      <StyledTableBody> {props.tableBody} </StyledTableBody>{' '}
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 100%;
  background-color: #fff;
  margin-top: 20px;
`;

const StyledTableHead = styled.thead`
  background-color: transparent;
  text-transform: capitalize;
  border-bottom: 1px solid ${themes.grey};
  text-align: left;

  & tr {
    & th {
      padding-top: 24px;
      padding-bottom: 24px;
      font-family: ${fontFamily.inter};
      color: ${(props) =>
        props.subtleheader ? themes.textColor : themes.deepBlack};
      font-weight: 500;
      font-size: 14px;

      &:first-child {
        padding-left: 24px;
      }
    }
  }

  @media ${device.laptop} {
    & tr {
      & th {
        font-size: 1vw;
      }
    }
  }
`;
const StyledTableBody = styled.tbody`
  & tr {
  }

  & td {
    padding-top: 16px;
    padding-bottom: 16px;
    font-size: 14px;
    font-family: ${fontFamily.heading};
    border-bottom: 1px solid #edf2f7;
    cursor: pointer;

    &:first-child {
      padding-left: 24px;
    }
  }

  & .specialFont {
    font-family: ${fontFamily.body};
    font-weight: 400;
    color: #425466;
  }

  @media ${device.laptop} {
    & td {
      font-size: 0.97vw;
    }
  }
`;
