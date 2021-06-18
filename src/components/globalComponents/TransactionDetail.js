import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { CardScaffold } from './CardScaffold';
import { data } from '../data/merchantData2';
import { MerchantProfileRow } from '../TableRows/MerchantProfileRow';
import {
  PrimaryButton,
  TransparentButton,
  StyledButton,
} from './Buttons';
import { FaCheck } from 'react-icons/fa';
import { Input, Avatar, Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FiSearch, FiClock } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import { abbreviate } from '../../utils/abbreviate';
import { PageTitleBar } from './PageTitleBar';
import { BackButton } from './BackButton';
import { Table } from './Table';
import { TableTopBar } from './TableTopBar';
import { TableComponent } from './TableComponent';
import {  Tabs } from 'antd';
import { TableActionButtons } from './TableActionButtons';

const { TabPane } = Tabs;

const title = [
    'ID',
    'User',
    'Channel',
    'Amount',
    'Type',
    'Status',
    'Date',
    'Actions'
  ];

export const TransactionDetail = (props) => {
  const [message, setMessage] = useState([]);
  const [inputState, setInputState] = useState('');
  const [equalHeight, setEqualHeight] = useState('500');
  const chatPaneRef = useRef();
  const chatcontainerRef = useRef();

  const tableBody = data.map((data, index) => (
    <MerchantProfileRow data={data} key={index} />
  ));

  useEffect(() => {
    setEqualHeight(chatcontainerRef.current.getBoundingClientRect().height);
  }, []);

  const outgoingMessageArr = message.map((item, index) => {
    return <OutgoingSingleChat key={index} message={item} />;
  });

  const onMessageTyping = (event) => {
    setInputState(event.target.value);
  };

  const handleSendMessage = () => {
    setMessage((prevState) => [...prevState, inputState]);
    setInputState('');
    chatPaneRef.current.scrollTop = chatPaneRef.current.scrollHeight;
  };

  const tableTitle = title.map((item, index) => {
    return <th key={index}>{item}</th>;
  });

  return (
    <Fragment>
      <BackButton location='to Overview'/>
      <PageTitleBar title='Usman Abiola' />
      <StyledTransactionDetailsContainer>
        <StyledPaymentDetail ref={chatcontainerRef}>
          <CardScaffold
            style={{ paddingLeft: '0px', paddingRight: '0px', height: '100%' }}
          >
            <StyledPaymentHeader>
              <div>
                <div>
                  <h2>UA</h2>
                </div>
              </div>
              <h1>Usman Abiola</h1>
              <p>
                User ID: <span>#92819389</span>
              </p>
            </StyledPaymentHeader>
            <div>
              <PaymentDetail left='amount' right='N2000.00' />
              <PaymentDetail
                left='Transaction date'
                right='10 Jun, ’20  10:31pm'
              />
              <PaymentDetail left='Transaction type' right='Money Transfer' />
              <PaymentDetail left='Customer Name' right='Usman Abiola' isRed />
              <PaymentDetail
                left='Bank Name'
                right='United Bank for Africa Plc (UBA)'
              />
              <PaymentDetail left='Account ID/User ID' right='07043837292' />
              <PaymentDetail
                left='Payment Reference'
                right='UBA|Web|JDK39AJ NAIRA.COM|120624|SJDUAH'
              />
              <div style={{ margin: '30px 40px' }}>
                {props.showDouble ? 
                 ( <div style={{display: 'flex', justifyContent: 'space-between'}}>
                 <TransparentButton width='47%' backgroundColor='#fff' color={themes.red} borderColor={themes.red} text='Reset Password'/>
                 <PrimaryButton other={props.other} text='View Audit Log' style={{backgroundColor: '#425466', width: '47%'}} />
                 </div>)
                :
                <PrimaryButton other={props.other} text='Download Reciept' />
                
              }
                
              </div>
            </div>
          </CardScaffold>
        </StyledPaymentDetail>
        <StyledChatContainer style={{ height: `${equalHeight}px` }}>
          <CardScaffold
            style={{ paddingLeft: '0px', paddingRight: '0px', height: '100%' }}
          >
            <StyledChatHeader>
              <div>
                <h2>Clane Support Chat</h2>
                <StyledChatStatus>
                  <div></div>
                  <p>Active</p>
                </StyledChatStatus>
              </div>
              <StyledSearchDiv>
                <Input
                  prefix={<FiSearch />}
                  placeholder='Search...'
                  bordered={false}
                />
              </StyledSearchDiv>
            </StyledChatHeader>
            <StyledChatPane ref={chatPaneRef}>
              <IncomingSingleChat />
              <IncomingSingleChat />
              {outgoingMessageArr}
            </StyledChatPane>
            <StyledChatFooter>
              <StyledChatInput>
                <StyledInput
                  value={inputState}
                  onChange={onMessageTyping}
                  placeholder='Enter Message...'
                  bordered={false}
                />
              </StyledChatInput>
              <StyledSendButton onClick={handleSendMessage}>
                Send
                <IoMdSend />
              </StyledSendButton>
            </StyledChatFooter>
          </CardScaffold>
        </StyledChatContainer>
      </StyledTransactionDetailsContainer>
        {props.showTable && (<TableComponent>
        <Tabs
            tabBarStyle={{ color: '#A0AEC0', padding: '0px 23px' }}
            defaultActiveKey='1'
        >
            <TabPane tab='All Transactions' key='1'>
            <TableTopBar />
            <TableActionButtons />
            <Table tableTitle={tableTitle} tableBody={tableBody} />
            </TabPane>
        </Tabs>
        </TableComponent>)}
    </Fragment>
  );
};

const IncomingSingleChat = (props) => {
  return (
    <StyledSingleChat>
      <div>
        <Avatar
          src={
            <Image src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          }
          size='large'
          icon={<UserOutlined />}
        />
      </div>
      <StyledChatMessageContainer>
        <h4>Clane Support</h4>
        <StyledChatMessage>
          <p>Hey! Welcome to Clane Support </p>
        </StyledChatMessage>
        <div>
          <FiClock />
          <span>12:09</span>
        </div>
      </StyledChatMessageContainer>
    </StyledSingleChat>
  );
};

const OutgoingSingleChat = (props) => {
  return (
    <StyledSingleChat isoutgoing>
      <StyledChatMessageContainer isoutgoing>
        <h4>{abbreviate('Adeniji Adefisayo Adeniji Adefisayo', 25)}</h4>
        <StyledChatMessage isoutgoing>
          <p>{props.message}</p>
        </StyledChatMessage>
        <div>
          <FiClock />
          <span>12:09</span>
        </div>
      </StyledChatMessageContainer>
    </StyledSingleChat>
  );
};

const PaymentDetail = (props) => {
  return (
    <StyledSingleDetail borderless={props.borderless} isRed={props.isRed}>
      <p>{props.left}</p>
      <p>{props.right}</p>
    </StyledSingleDetail>
  );
};

const StyledTransactionDetailsContainer = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};
  margin-top: 20px;
`;

const StyledPaymentDetail = styled.div`
  flex-basis: 54%;
`;

const StyledPaymentHeader = styled.div`
  display: grid;
  place-items: center;
  font-family: ${fontFamily.inter};
  margin-bottom: 30px;
  margin-top: 40px;

  & > div:first-child {
    width: 7vw;
    height: 7vw;
    background-color: #fff0e8;
    display: grid;
    place-items: center;
    border-radius: 50%;
    margin-bottom: 20px;

    & div {
      width: 6vw;
      height: 6vw;
      background-color: #fff0e8;
      display: grid;
      place-items: center;
      border-radius: 50%;
      border: 5px solid #fff;

      & h2 {
        margin: 0px;
        color: #f7936f;

        font-weight: 600;
        font-size: 28px;
      }
    }
  }

  & h1 {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 0px;
  }

  & p {
    font-weight: 400;
    font-size: 14px;
    color: ${themes.subtleBlack};

    & span {
      font-weight: 600;
      color: ${themes.blue};
      text-decoration: underline;
    }
  }
`;

const StyledSingleDetail = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};
  font-size: 1vw;
  font-family: ${fontFamily.inter};
  border-bottom: ${(props) =>
    props.borderless ? 'none' : '1px solid rgba(209, 217, 225, 0.46)'};
  text-transform: capitalize;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;

  &:nth-child(7) {
    border-bottom: none;
  }

  & p:first-child {
    color: ${themes.subtleBlack};
  }

  & p:nth-child(2) {
    color: ${(props) => (props.isRed ? themes.red : themes.deepBlack)};
  }
`;

const StyledChatContainer = styled.div`
  flex-basis: 44%;
  font-family: ${fontFamily.inter};
  height: 100vh;
`;

const StyledChatHeader = styled.div`
  ${getCenter({ justifyContent: 'space-between' })};
  border-bottom: 1px solid #eff2f7;
  padding: 0px 20px;
  padding-bottom: 20px;

  & > div:first-child {
    & h2 {
      font-weight: 500;
      font-size: 15px;
      color: ${themes.deepBlack};
    }
  }

  @media ${device.laptop} {
    & > div:first-child {
      & h2 {
        font-size: 0.95vw;
      }
    }
  }
`;

const StyledChatStatus = styled.div`
  ${getCenter({ justifyContent: 'flex-start' })};

  & div {
    width: 0.7vw;
    height: 0.7vw;
    background-color: ${themes.green2};
    border-radius: 50%;
  }

  & p {
    font-weight: 400;
    font-size: 14.4px;
    color: ${themes.subtleBlack};
    margin: 0px;
    margin-left: 5px;
  }

  @media ${device.laptop} {
    & p {
      font-size: 0.9vw;
    }
  }
`;

const StyledSearchDiv = styled.div`
  background: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 30px;
  padding: 5px;
`;

const StyledSingleChat = styled.div`
  ${getCenter({
    alignItems: 'flex-start',
    flexWrap: 'no-wrap',
    justifyContent: (props) => (props.isoutgoing ? 'flex-end' : 'flex-start'),
  })};
  margin-bottom: 40px;
`;

const StyledChatMessageContainer = styled.div`
  width: fit-content;
  ${getCenter({ flexDirection: 'column', alignItems: 'flex-start' })}

  & h4 {
    font-weight: 600;
    font-size: 14.4px;
    color: ${themes.textColor};
    align-self: ${(props) => (props.isoutgoing ? 'flex-end' : 'flex-start')};
  }

  & div:nth-child(3) {
    ${getCenter({ justifyContent: 'flex-start' })};
    color: ${themes.subtleBlack};
    margin-top: 5px;

    & span {
      margin-left: 5px;
    }
  }

  @media ${device.laptop} {
    & h4 {
      font-size: 0.9vw;
    }
  }
`;

const StyledChatMessage = styled.div`
  background: ${(props) => (props.isoutgoing ? '#EFF2F7' : '#463D5E')};
  border-radius: 4px;
  padding: 15px 30px;
  width: fit-content;

  & p {
    margin: 0px;
    color: ${(props) => (props.isoutgoing ? themes.deepBlack : '#fff')};
    font-size: 14px;
    font-weight: 500;
  }

  @media ${device.laptop} {
    & p {
      font-size: 0.9vw;
    }
  }
`;

const StyledChatPane = styled.div`
  height: 80%;
  overflow: auto;
  padding: 20px;
`;

const StyledChatFooter = styled.div`
  ${getCenter({ justifyContent: 'space-between' })};
  margin: 0px 20px;
`;

const StyledChatInput = styled.div`
  background: #eff2f7;
  border: 1px solid #eff2f7;
  border-radius: 4px;
  padding: 5px 12px;
  width: 70%;
`;

const StyledInput = styled(Input)`
  font-size: 14px;

  @media ${device.laptop} {
    font-size: 0.9vw;
  }
`;
const StyledSendButton = styled(StyledButton)`
  width: 27%;
  background-color: ${props => props.other? themes.red: themes.primaryColor};
  padding-top: 9px;
  padding-bottom: 9px;
  font-size: 14px;

  & :nth-child(1) {
    margin-left: 10px;
  }

  @media ${device.laptop} {
    font-size: 0.9vw;
  }
`;
