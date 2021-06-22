import React, {useEffect, useState} from 'react';
import img1 from '../../images/img1.png';
import styled from 'styled-components';
import {themes} from '../../globalAssets/theme';
import {getCenter} from '../../utils/getCenter';
import {fontFamily} from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { Statistic } from 'antd';


export const StatCard = (props) => {
  const [numberColor, setNumberColor] = useState(themes.deepBlack);

  useEffect(() => {
    if(props.warning){
      setNumberColor(themes.orange);
    }

    if(props.failed){
      setNumberColor(themes.red);
    }
  }, [])
    return (
      <StyledStatCard warning={props.warning} isOdd={props.isOdd} failed={props.failed} isGrey={props.isGrey}>
        <div>
          <h5>{props.title}</h5>
          {/* <h1>{props.amount}</h1> */}
          <Statistic precision={props.hidePrecision? 0:2} valueStyle={{fontSize: '20px', color: numberColor, backgroundColor:'transparent', padding: '0px', marginBottom:'10px',  margin: '0px',  fontFamily: fontFamily.inter}} value={props.amount} prefix={props.hidenaira? '':'₦'} /> 
            <div style={{marginTop: 10, visibility: props.count >= 0? 'visible': 'hidden'}}>
              <div>{props.isCount? 'Count': 'Profit'}:</div>
              <p>{props.count}</p>
            </div>
        </div>
        <div style={{backgroundColor: props.backgroundColor}}>
          {props.icon ?? <img src={img1} alt='' />}
        </div>
      </StyledStatCard>
    );
};

const StyledAmount = styled(Statistic)`
  & .ant-statistic-content{
  }
`

const StyledStatCard  = styled.div`
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
    color: ${props => props.failed? themes.red: props.warning? themes.orange: themes.deepBlack};
   /*  color: red; */
    font-weight: 600;
  }

  & > div {
    ${getCenter({ justifyContent: 'flex-start' })};

    & > p {
      margin: 0px;
      font-weight: 500;
      font-size: 10px;
      color: #556575;
    }

    & div {
      font-size: 10px;
      font-weight: 600;
      color: ${props => props.isGrey? '#8997a7':'#66CB9F'};
      background-color: ${props => props.isGrey? '#eff6fc': '#DEFFEE'};
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


&:last-child{
  margin-left: ${props => props.isOdd && '2vw'};
  margin-right: ${props => props.isOdd && 'auto'};
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