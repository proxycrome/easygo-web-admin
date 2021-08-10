import React, {createContext, useContext, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Input, Badge, Select, Tabs, DatePicker } from 'antd';
import { device } from '../../../globalAssets/breakpoints';
import { themes } from '../../../globalAssets/theme';
import { getCenter } from '../../../utils/getCenter';
import {
  FiSearch as SearchIcon,
  FiLogOut as LogoutIcon,
  FiBell as BellIcon,
  FiPlus as PlusIcon,
  FiUsers,
  FiList as TransactionIcon,
  FiActivity
} from 'react-icons/fi';
import { RiCouponLine } from 'react-icons/ri'
import { GoHome as HomeIcon } from 'react-icons/go';
import { fontFamily } from '../../../globalAssets/fontFamily';
import img1 from '../../../images/img1.png';
import sterlingLogo from '../../../images/logo.png';

import { DashBoard } from './DashBoard';
import { User } from '../Users/index';
import { Transaction } from '../Transactions/index';
import { ProductServices } from '../ProductServices/index';
import {Switch, Link, Route, useRouteMatch, useHistory, useLocation, useParams} from 'react-router-dom';
import { fetchAllUser } from '../Users/slice';
import { fetchTransactions } from '../Transactions/slice';
import ScrollToTop  from '../../ScrollTop';
import { AiOutlineNotification } from 'react-icons/ai';
import { Notifications } from '../Notifications';
import { fetchAllServices } from '../ProductServices/slice';
import { getRoleTypes, getDiscountTypes} from './slice';
import { Coupons } from '../Coupon/index';

import moment from 'moment';
const { TabPane } = Tabs;

const { Option } = Select;

const navs = [
  { name: 'dashboard', icon: <HomeIcon />,  route:''},
  { name: 'users', icon: <FiUsers />, route:'/users'},
  { name: 'transactions', icon: <TransactionIcon />, route:'/transactions' },
  {name: 'notification', icon: <AiOutlineNotification/>, route: '/notifications'},
  {name: 'services', icon: <FiActivity/>, route: '/services'},
  {name: 'coupons', icon: <RiCouponLine/>, route: '/coupons'}
];

const title = ['ID', 'Merchat Name', 'Channels', 'Volume', 'Revenue', 'Transaction count', 'Last Activity']

const PageStateContext = createContext({});
export const UsePageStateContext = () => useContext(PageStateContext);



export function Home(props) {
  const [navState, setNavState] = React.useState(navs);
  const location = useLocation();
  let {path, url} = useRouteMatch();
  const history = useHistory();



  const dispatcher = useDispatch();

  const initialFetch = async () => {
    try {
      await dispatcher(fetchAllUser({page: 0, pageSize: 10, status: 'ACTIVE'}));
      await dispatcher(fetchAllUser({page: 0, pageSize: 10, status: 'SUSPENDED'}));
      await dispatcher(fetchTransactions({page: 0, pageSize: 10,'end-date': moment().format('YYYY/MM/DD'), 'start-date': '2019/01/01'}));
      await dispatcher(fetchAllServices({page: 0, pageSize: 10}));
      await dispatcher(getRoleTypes({page: 0, pageSize: 10}));
      await dispatcher(getDiscountTypes({page: 0, pageSize: 10}));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    initialFetch()
  }, [])

  const navList = navState.map((item, index) => {
    return (
      <StyledSingleNav
        isActive={location.pathname === `${url}${item.route}`}
        key={index}
        to={`${url}${item.route}`}
      >
        {item.icon}
        <p>{item.name}</p>
      </StyledSingleNav>
    );
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/')
  }

  return (
    <>
    <ScrollToTop/>
    <Row>
      <Col span={4}>
        <StyledSideBar>
          <StyledLogoDiv>
            <StyledLogo src={sterlingLogo} />
          </StyledLogoDiv>
          <StyledLinkDiv>
            <div>{navList}</div>
            <div>
              <StyledSingleNav onClick={handleLogout}>
                <LogoutIcon />
                <p>Logout</p>
              </StyledSingleNav>
            </div>
          </StyledLinkDiv>
        </StyledSideBar>
      </Col>
      <Col span={20}>
        <StyledMainBodyContainer>
          <Row>
            <Col span={24}>
              <StyledHeader>
                <StyledInputBorder>
                  <Input placeholder='Search' bordered={false} />
                  <SearchIcon />
                </StyledInputBorder>
                <StyledAlertDiv>
                  <Badge count={5}>
                    <BellIcon />
                  </Badge>
                  {/* <StyledButtonDiv>
                    <StyledButton>
                      <PlusIcon />
                      Create
                    </StyledButton>
                  </StyledButtonDiv> */}
                </StyledAlertDiv>
              </StyledHeader>
            </Col>
          </Row>
          <Row>
            <Col sm={24}>
              <StyledBodyComtainer>
                <Switch>
                    <Route exact path={`${path}`}>
                        <DashBoard/>
                    </Route>
                    <Route path={`${path}/users`}>
                        <User/>
                    </Route>
                    <Route path={`${path}/transactions`}>
                      <Transaction/>
                    </Route>
                    <Route path={`${path}/notifications`}>
                      <Notifications/> 
                    </Route>
                    <Route path={`${path}/services`}>
                      <ProductServices/> 
                    </Route>
                    <Route  path={`${path}/coupons`}>
                      <Coupons/>
                    </Route>
                </Switch>
              </StyledBodyComtainer>
            </Col>
          </Row>
        </StyledMainBodyContainer>
      </Col>
    </Row>
    </>
  );
}

const StatCard = (props) => {
  return (
    <StyledStatCard>
      <div>
        <h5>{props.title}</h5>
        <h1>{props.amount}</h1>
        <div>
          <div>Count:</div>
          <p>{props.count}</p>
        </div>
      </div>
      <div>
        <img src={img1} alt='' />
      </div>
    </StyledStatCard>
  );
};

// SIDEBAR

const StyledSideBar = styled.aside`
  height: 100vh;
  background-color: ${themes.backgroundColor_w};
  position: fixed;
`;

const StyledLogoDiv = styled.div`
  height: 13%;
  ${getCenter({ justifyContent: 'flex-start' })};
  margin-left: 26px;
`;

const StyledLogo = styled.img`
  width: 10vw;
`;

const StyledLinkDiv = styled.div`
  height: 87%;
  margin-left: 26px;
  margin-top: 31px;
  ${getCenter({
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  })}
  padding-bottom: 20px;
`;

const StyledSingleNav = styled(Link)`
  width: 100%;
  ${getCenter({ justifyContent: 'flex-start' })};
  cursor: pointer;
  margin-bottom: 32px;
  text-transform: capitalize;

  &:hover {
    & > :first-child {
      color: ${themes.darkPrimaryColor};
      font-weight: bolder;
    }

    & p {
      color: ${themes.darkPrimaryColor};
    }
  }

  & > :first-child {
    font-size: 16px;
    color: ${(props) =>
      props.isActive ? themes.darkPrimaryColor : themes.textColor};
  }

  & p {
    margin-bottom: 0px;
    margin-left: 20px;
    font-family: ${fontFamily.inter};
    font-weight: ${(props) => (props.isActive ? 600 : 400)};
    font-size: 14px;
    color: ${(props) =>
      props.isActive ? themes.darkPrimaryColor : themes.textColor};
  }

  @media ${device.laptop} {
    & p{
      font-size: 1vw;
    }

    & > :first-child {
      font-size: 1.3vw;
    }
  }
`;

//MAIN BODY
const StyledMainBodyContainer = styled.section`
  min-height: 100vh;
  background-color: ${themes.backgroundColor_b};
`;

const StyledHeader = styled.div`
  background-color: ${themes.backgroundColor_w};
  height: 13vh;
  ${getCenter({ justifyContent: 'space-between' })};
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

const StyledButtonDiv = styled.div`
  height: fit-content;
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

const StyledBodyComtainer = styled.div`
  width: 100%;
  padding: 26px 30px;
`;

const StyledTitleBar = styled.div`
  width: 100%;
  ${getCenter({ justifyContent: 'space-between' })};

  & h1 {
    text-transform: capitalize;
    font-family: ${fontFamily.inter};
    font-weight: 600;
    color: ${themes.deepBlack};
    font-size: 24px;
  }

  & > div {
    ${getCenter()};
  }

  @media ${device.laptop} {
    font-size: 1.6vw;
  }
`;

const StyledOption = styled(Option)`
  /*  & span.ant-select-selection-item {
    font-size: 8px;
    font-family: ${fontFamily.inter};
    color: ${themes.deepBlack};
    color: red !important;
  } */
`;

const StyledSelect = styled(Select)`
  font-size: ${props => props.islong? '16px': '11px'};
  color: ${themes.deepBlack};
  font-weight: 500;
  /* width: ${props => props.islong? '100%': '100px'}; */

  width: 100% !important;

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0px 0px 0px 2px !important;
  }

  @media ${device.laptop} {
    font-size: ${props => props.islong? '1.1vw' : '0.7vw'};
    width: 7vw;
  }
`;

const StyledSelectDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${props => props.islong? '0px': '10px'};
  border: 0.725px solid #e2e2ea;
  cursor: pointer;

  background-color: #fff;
  border-radius: 5px;

  font-family: ${fontFamily.body};
  font-size: 11px;
  padding-left: 5px;
  width: ${props => props.width};

  & p {
    margin: 0px;
    color: #7a7a9d;
  }
`;



const StyledStatCard = styled.div`
  width: 31.5%;
  background-color: ${themes.backgroundColor_w};
  border-radius: 10px;
  padding: 28px 31px;
  ${getCenter({
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'no-wrap',
  })};
  margin-bottom: 20px;
  
  box-shadow: 0px 3px 8px -1px rgba(50, 50, 71, 0.05);

  & > div:first-child {
    font-family: ${fontFamily.inter};
    & h5 {
      color: ${themes.subtleBlack};
      font-weight: 600;
      font-size: 12px;
    }

    & h1 {
      font-size: 20px;
      color: ${themes.deepBlack};
      font-weight: 600;
    }

    & > div {
      ${getCenter({ justifyContent: 'flex-start' })};

      & p {
        margin: 0px;
        font-weight: 500;
        font-size: 10px;
        color: #556575;
      }

      & div {
        font-size: 10px;
        font-weight: 600;
        color: #8997a7;
        background-color: #eff6fc;
        border-radius: 6px;
        margin-right: 10px;
        padding: 4px 10px;
      }
    }
  }

  & > div:nth-child(2) {
    background-color: ${themes.blue};
    ${getCenter()};
    border-radius: 50%;
    height: 3vw;
    width: 3vw;

    img {
      width: 40%;
    }
  }

  @media ${device.laptop} {
    & > div {
      & h5 {
        font-size: 0.9vw;
      }

      & h1 {
        font-size: 1.35vw;
      }

      & > div {
        & p {
          font-size: 0.7vw;
        }

        & div {
          font-size: 0.7vw;
        }
      }
    }
  }
`;














