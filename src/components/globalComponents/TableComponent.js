import React from "react";
import img1 from "../../images/img1.png";
import styled from "styled-components";
import { themes } from "../../globalAssets/theme";
import { getCenter } from "../../utils/getCenter";
import { fontFamily } from "../../globalAssets/fontFamily";
import { device } from "../../globalAssets/breakpoints";
import { CardScaffold } from "./CardScaffold";
import { Pagination } from "antd";

export const TableComponent = (props) => {
  return (
    <StyledTableComponent>
      <CardScaffold style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        {" "}
        {props.children}{" "}
        {props.isfulltable ? (
          <Paginate
            length={props.length}
            handlePaginationChange={props.handlePaginationChange}
            currentPage={props.currentPage}
            pageSize={props.pageSize}
          />
        ) : (
          <StyledTableFooter>
            <StyledSeeAll onClick={props.onClick}>
              {props.bottomText}
            </StyledSeeAll>{" "}
          </StyledTableFooter>
        )}{" "}
      </CardScaffold>{" "}
    </StyledTableComponent>
  );
};

export const Paginate = (props) => {
  return (
    <StyledTableFooter2>
      <p> {props.length} </p>{" "}
      <StyledPagination
        onChange={props.handlePaginationChange}
        pageSize={props.pageSize}
        current={props.currentPage}
        defaultCurrent={1}
        total={props.length}
        showSizeChanger={true}
        size="small"
      />
    </StyledTableFooter2>
  );
};

const StyledTableComponent = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const StyledTableFooter = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const StyledSeeAll = styled.p`
  text-transform: capitalize;
  color: ${themes.textColor};
  font-weight: 500;
  font-family: ${fontFamily.inter};
  text-decoration: underline;
  text-align: center;
  margin: 0px;
  font-size: 17px;
  cursor: pointer;

  @media ${device.laptop} {
    font-size: 1.2vw;
  }
`;

const StyledTableFooter2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  padding-top: 50px;

  & p {
    font-family: ${fontFamily.Inter};
    font-weight: 400;
    font-size: 14px;
    color: #7a7a9d;
    margin: 0px;
  }

  @media ${device.laptop} {
    & p {
      font-size: 0.97vw;
    }
  }
`;

const StyledPagination = styled(Pagination)`
  & .anticon svg {
    /* border: 1px solid ${themes.subtleBlack}; */
    font-size: 16px;
    padding: 5px;
    border-radius: 5px;
    margin-right: 10px;
    margin-left: 10px;
  }

  & .ant-pagination-item a {
    color: ${themes.subtleBlack};
    font-family: ${fontFamily.body};
  }

  & .ant-pagination-item-active a {
    color: ${themes.primaryColor};
    font-weight: bolder;
  }

  &.ant-pagination-item-active {
    background-color: #ecf2ff;
    border-color: transparent;

    &:hover,
    &:active,
    &:focus {
      background-color: transparent;
      border-color: transparent;
    }
  }

  @media ${device.laptop} {
    & .anticon svg {
      font-size: 1.9vw;
    }
  }
`;
