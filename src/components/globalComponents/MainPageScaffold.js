import { useState } from 'react';
import { Row, Col, Input, Badge, Typography, Statistic } from "antd";
import {
  FiSearch as SearchIcon,
  FiBell as BellIcon,
  FiPlus as PlusIcon,
} from "react-icons/fi";
import styled from "styled-components";
import { themes } from "../../globalAssets/theme";
import { getCenter } from "../../utils/getCenter";
import { device } from "../../globalAssets/breakpoints";
import { fontFamily } from "../../globalAssets/fontFamily";
import { StyledModal } from "./styles";
import { Services } from '../../services';

export const MainPageScaffold = (props) => {
 const [walletBalanceModalProps, setWalletBalanceModalProps] = useState({
    visible: false,
    loading: false,
    balance: 0
 })


 const getWalletBalance = async () => {
    try {
        setWalletBalanceModalProps(prevState =>  ({...prevState, loading: true}));
        const response = await Services.getWalletBalance();
        setWalletBalanceModalProps(prevState =>  ({...prevState, loading: false, balance: parseFloat(response.data.split(" = ")[1]) }));

    } catch (error) {
        console.log(error);
    }
 }
 
 const onOpenWalletBalance = () => {
    getWalletBalance();
    setWalletBalanceModalProps(prevState =>  ({...prevState, visible: true}))
 }

  return (
    <Col span={20}>
      <StyledMainBodyContainer>
        <Row>
          <Col span={24}>
            <StyledHeader>
              {props.showSearch && (
                <StyledInputBorder>
                  <Input bordered={false} onChange={props.onSearch} />
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

              <StyledButtonDiv onClick={onOpenWalletBalance}>
                <StyledButton>
                 {/*  <PlusIcon /> */}
                  VT-Pass Wallet Balance
                </StyledButton>
              </StyledButtonDiv>
            </StyledHeader>
          </Col>
        </Row>
        <Row>
          <Col sm={24}>
            <StyledBodyComtainer>{props.children}</StyledBodyComtainer>
          </Col>
        </Row>
      </StyledMainBodyContainer>
      <WalletBalanceModal
        loading={walletBalanceModalProps.loading}
        onCancel={() => setWalletBalanceModalProps(prevState =>  ({...prevState, visible: false}))}
        visible={walletBalanceModalProps.visible}
        getWalletBalance={getWalletBalance}
        balance={walletBalanceModalProps.balance}
      />

      {/* <StyledModal
          onCancel={() => setWalletBalanceModalProps(prevState =>  ({...prevState, visible: false}))}
          visible={walletBalanceModalProps.visible}
          footer={false}
        >
          <Typography.Title level={4}>Re-query Transaction</Typography.Title>
         
        </StyledModal> */}
    </Col>
  );
};



const WalletBalanceModal = (props) => {
    const onOk = () => {
      props.form.submit();
    };
  
    return (
      <StyledModal
        title="VT-Pass Wallet Balance"
        visible={props.visible}
        okButtonProps={{
          loading: props.loading,
          style: {
            backgroundColor: themes.primaryColor,
            border: `1px solid ${themes.primaryColor}`,
          },
        }}
        cancelButtonProps={{
          type: "danger",
        }}
        onOk={props.getWalletBalance}
        okText="Get Wallet Balance"
        onCancel={props.onCancel}
      >
       {props.loading? <div>
           <p>...loading</p>
       </div> : <div> <Statistic value={props.balance} prefix='₦'/></div>}
      </StyledModal>
    );
  };

const StyledButtonDiv = styled.div`
  height: fit-content;
  margin-left: auto;
`;

const StyledButton = styled.button`
  ${getCenter()};
  font-size: 12px;
  background-color: ${themes.primaryColor};
  border: none;
  color: #fff;
  margin-left: 70px;
  border-radius: 6px;
  padding: 8px 20px;
  font-family: ${fontFamily.inter};
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
  }
  & > :first-child {
    margin-right: 10px;
    font-size: 16px;
  }
  @media ${device.laptop} {
    font-size: 0.9vw;
    & > :first-child {
      font-size: 1.1vw;
    }
  }
`;

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
