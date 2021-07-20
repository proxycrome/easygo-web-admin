import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { CardScaffold } from '../globalComponents/CardScaffold';
import {
  PrimaryButton,
  TransparentButton,
} from './../globalComponents/Buttons';
import { FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
/* import { getTransactionDetailAction } from '../../actions' */
import { BackButton } from './BackButton';
import { PageTitleBar } from './PageTitleBar';

export const CustomerDetail = (props) => {
  const { id } = useParams();
  const dispatcher = useDispatch();
  const transactionDetail = useSelector((state) => state.transactionDetail);
  const [singleTransactionDetail, setTransactionDetail] = useState({});

  /* useEffect(() => {
    const selectedDetail = transactionDetail.find((item) => item.id === id);
    setTransactionDetail(selectedDetail);
    console.log('IMPORTANT', selectedDetail);
  }, []); */

  return (
    <StyledTransactionDetailsContainer>
      <BackButton />
      <PageTitleBar title="All Transactions" />
      <StyledPaymentDetail>
        <CardScaffold style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <StyledPaymentHeader>
            <div>
              <FaCheck />
            </div>
            <div>
              <h1>Payment successful!</h1>
              <p>
                You sent {singleTransactionDetail?.amount ?? 'null'} to{' '}
                {singleTransactionDetail?.merchantProfile?.registeredName ??
                  'null'}{' '}
                - <br />
                {singleTransactionDetail?.merchantProfile?.bankAccount
                  ?.bankName ?? 'null'}{' '}
                {singleTransactionDetail?.merchantProfile?.bankAccount
                  ?.accountNumber ?? 'null'}
                .
              </p>
            </div>
          </StyledPaymentHeader>
          <div>
            <PaymentDetail
              left="amount"
              right={singleTransactionDetail?.amount ?? 'null'}
            />
            <PaymentDetail
              left="Transaction date"
              right={singleTransactionDetail?.createdAt ?? 'null'}
            />
            <PaymentDetail
              left="Transaction type"
              right={singleTransactionDetail?.qrType ?? 'null'}
            />
            <PaymentDetail
              left="Customer Name"
              right={
                singleTransactionDetail?.merchantProfile?.registeredName ??
                'null'
              }
              isRed
            />
            <PaymentDetail
              left="Bank Name"
              right={
                singleTransactionDetail?.merchantProfile?.bankAccount
                  ?.bankName ?? 'null'
              }
            />
            <PaymentDetail
              left="Account ID/User ID"
              right={
                singleTransactionDetail?.merchantProfile?.bankAccount
                  ?.accountNumber ?? 'null'
              }
            />
            <PaymentDetail left="Payment Reference" right="coming soon" />
            <div style={{ margin: '30px 40px' }}>
              <PrimaryButton other={true} text="Download Reciept" />
            </div>
          </div>
        </CardScaffold>
      </StyledPaymentDetail>
      <StyledCustomerDetail>
        <CardScaffold style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <StyledCustomerDetailHeader>
            <div>
              <h5>Customer Detail</h5>
              <p>View Profile</p>
            </div>
            <h1>
              {singleTransactionDetail?.merchantProfile?.registeredName ??
                'null'}
            </h1>
            <p>
              {singleTransactionDetail?.merchantProfile?.contactEmailAddress ??
                'null'}
            </p>
            <p>
              {singleTransactionDetail?.merchantProfile
                ?.contactMobilePhoneNumber ?? 'null'}
            </p>
          </StyledCustomerDetailHeader>
          <div style={{ marginBottom: '120px' }}>
            <PaymentDetail
              left="BVN"
              right={
                singleTransactionDetail?.merchantProfile?.bankAccount
                  ?.verificationNumber ?? 'null'
              }
              borderless
            />
            <PaymentDetail left="Channel" right="coming soon" borderless />
            <PaymentDetail
              left="Total Transaction"
              right="comming soon"
              borderless
            />
            <PaymentDetail
              left="Wallet Balance"
              right="coming soon"
              borderless
            />
          </div>
        </CardScaffold>
      </StyledCustomerDetail>
    </StyledTransactionDetailsContainer>
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
  flex-basis: 59%;
`;

const StyledCustomerDetail = styled.div`
  flex-basis: 39%;
`;
const StyledPaymentHeader = styled.div`
  ${getCenter({ justifyContent: 'flex-start' })};
  width: 100%;
  border-bottom: 1px solid rgba(209, 217, 225, 0.46);
  padding-left: 30px;
  margin-bottom: 50px;
  & > div:first-child {
    ${getCenter()};

    padding: 1vw;
    background-color: #00b442;
    color: #fff;
    font-size: 2vw;
    border-radius: 50%;
    margin-right: 30px;
  }

  & > div:nth-child(2) {
    text-align: left;
    font-family: ${fontFamily.inter};

    & h1 {
      color: ${themes.deepBlack};
      font-weight: 600;
      font-size: 1.4vw;
      margin-bottom: 10px;
    }

    & p {
      font-weight: 400;
      font-size: 0.8vw;
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

const StyledCustomerDetailHeader = styled.div`
  font-family: ${fontFamily.inter};
  padding: 0 23px;
  border-bottom: 1px solid rgba(209, 217, 225, 0.46);
  padding-bottom: 80px;
  margin-bottom: 20px;
  & > div {
    ${getCenter({ justifyContent: 'space-between' })};
    margin-bottom: 34px;

    & > h5:first-child {
      font-weight: 600;
      font-size: 1.3vw;
    }

    & p {
      font-weight: 400;
      text-decoration: underline;
      color: ${themes.subtleBlack};
    }
  }

  & > h1 {
    color: ${themes.red};
    font-weight: 500;
    font-size: 1.3vw;
  }

  & > p {
    font-weight: 400;
    color: ${themes.subtleBlack};
    font-size: 1.05vw;
  }
`;
