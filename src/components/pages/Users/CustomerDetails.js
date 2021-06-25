import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { themes } from '../../../globalAssets/theme';
import { getCenter } from '../../../utils/getCenter';
import { fontFamily } from '../../../globalAssets/fontFamily';
import { CardScaffold } from '../../globalComponents/CardScaffold';
import {
  PrimaryButton,
  TransparentButton,
} from '../../globalComponents/Buttons';
import { FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
/* import { getTransactionDetailAction } from '../../actions' */
import { BackButton } from '../../globalComponents/BackButton';
import { PageTitleBar } from '../../globalComponents/PageTitleBar';
import { fetchUserByEmail, selectUser } from './slice';
import { Tag } from 'antd';

export const CustomerDetail = (props) => {
  const { email } = useParams();
  const dispatcher = useDispatch();
  const { singleUser } = useSelector(selectUser);
  const [userAttributes, setUserAttributes] = useState([]);

  console.log({ singleUser });
  const getSingleUser = async () => {
    try {
      const response = await dispatcher(fetchUserByEmail({ email }));
      console.log({ response });
      /*  const arr = Object.entries(response).filter(
        (item) => typeof item[0] !== 'object'
      );
      console.log({ arr });
      setUserAttributes(arr); */
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleUser();
  }, []);

  const formatBoolean = (value) => {
    if (typeof value === 'boolean' && value) {
      return 'Verified';
    }

    if (typeof value === 'boolean' && !value) {
      return 'Not Verified';
    }

    return value;
  };

  const userProperties = Object.keys({ ...singleUser })
    .filter(
      (item) =>
        item !== 'fullName' &&
        item !== 'email' &&
        item !== 'pictureUrl' &&
        typeof singleUser[item] !== 'object'
    )
    .map((item, index) => {
      return (
        <PaymentDetail
          key={index}
          left={item}
          right={formatBoolean(singleUser[item])}
        />
      );
    });

  const handleSuspendOrActivateUser = (e) => {
    e.preventDefault();

    if (localStorage.userStatus === 'active') {
      console.log(localStorage.userStatus === 'active');
      return props.onSuspendUser(singleUser);
    } else if (localStorage.userStatus === 'suspended') {
     return  props.onActivateUser(singleUser);
    }
  };

  return (
    <StyledTransactionDetailsContainer>
      <BackButton />
      <PageTitleBar hideButtons={true} title="User Details" />
      <StyledPaymentDetail>
        <CardScaffold style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <StyledPaymentHeader>
            <div>
              <img src={singleUser?.pictureUrl} alt="customer" />
            </div>
            <div>
              <h1>{singleUser?.fullName}</h1>
              <p>{singleUser?.email}</p>
            </div>
            <Tag
              style={{ marginLeft: 'auto' }}
              color={localStorage.userStatus === 'active' ? '#87d068' : '#f50'}>
              {localStorage.userStatus.toUpperCase()}
            </Tag>
          </StyledPaymentHeader>
          <div>
            {userProperties}
            <div style={{ margin: '30px 40px' }}>
              <PrimaryButton
                onClick={
                  localStorage.userStatus === 'active'
                    ? props.onSuspendUser(singleUser)
                    : props.onActivateUser(singleUser)
                }
                other={localStorage.userStatus === 'active'}
                text={
                  localStorage.userStatus === 'active' ? 'Suspend' : 'Activate'
                }
              />
            </div>
          </div>
        </CardScaffold>
      </StyledPaymentDetail>
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
  ${getCenter({ justifyContent: 'flex-start', alignItems: 'flex-start' })};
  width: 100%;
  border-bottom: 1px solid rgba(209, 217, 225, 0.46);
  padding-left: 30px;
  margin-bottom: 50px;
  padding-bottom: 15px;
  & > div:first-child {
    border-radius: 50%;
    width: 7vw;
    height: 7vw;
    overflow: hidden;
    margin-right: 30px;
    /*  ${getCenter()};
   

    padding: 1vw;
    background-color: #00b442;
    color: #fff;
    font-size: 2vw;
    
     */

    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: contain;
    }
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
