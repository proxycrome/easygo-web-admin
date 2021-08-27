import { Row, Col, Input, Badge, Select } from "antd";
import { FiSearch as SearchIcon, FiBell as BellIcon } from "react-icons/fi";
import styled from "styled-components";
import { themes } from "../../globalAssets/theme";
import { getCenter } from "../../utils/getCenter";
import { device } from "../../globalAssets/breakpoints";


export const MainPageScaffold = (props) => {
 /*  function onChange(value) {
    console.log(`selected ${value}`);
  } */

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  /* function onSearch(val) {
    console.log("search:", val);
  } */

  return (
    <Col span={20}>
      <StyledMainBodyContainer>
        <Row>
          <Col span={24}>
            <StyledHeader>
              {props.showSearch && (
                <StyledInputBorder>
                  {/* <Select
                    showSearch
                    suffixIcon={<SearchIcon />}
                    style={{ width: "100%" }}
                    bordered={false}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={props.onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={props.onSearch}
                    allowClear
                  >
                   {props.searchOptions}
                  </Select> */}
                  <Input bordered={false} onChange={props.onSearch}/>
                   <SearchIcon />
                </StyledInputBorder>
              )}
              {props.showAlerm && (
                <StyledAlertDiv>
                  <Badge count={5}>
                    <BellIcon />
                  </Badge>
                </StyledAlertDiv>
              )}
            </StyledHeader>
          </Col>
        </Row>
        <Row>
          <Col sm={24}>
            <StyledBodyComtainer>{props.children}</StyledBodyComtainer>
          </Col>
        </Row>
      </StyledMainBodyContainer>
    </Col>
  );
};

const StyledMainBodyContainer = styled.section`
  min-height: 100vh;
  background-color: ${themes.backgroundColor_b};
`;

const StyledHeader = styled.div`
  background-color: ${themes.backgroundColor_w};
  height: 13vh;
  ${getCenter({ justifyContent: "space-between" })};
  padding-left: 30px;
  padding-right: 49px;
`;

const StyledInputBorder = styled.div`
  border: 1px solid #d1d9e1;
  border-radius: 10px;
  width: 35%;
  padding: 10px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: ${themes.primaryColor};
  }

  & > :nth-child(2) {
    color: #8f92a1;
    font-size: 24px;
  }

  @media ${device.laptop} {
    & > :nth-child(2) {
      font-size: 1.8vw;
    }
  }
`;

const StyledAlertDiv = styled.div`
  ${getCenter()};

  & > :first-child {
    font-size: 24px;
    color: ${themes.textColor};
  }

  @media ${device.laptop} {
    & > :first-child {
      font-size: 1.6vw;
    }
  }
`;

const StyledBodyComtainer = styled.div`
  width: 100%;
  padding: 26px 30px;
`;
