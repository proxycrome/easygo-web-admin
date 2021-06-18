import React from 'react';
import styled from 'styled-components';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { CardScaffold } from './CardScaffold';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { PrimaryButton, TransparentButton } from './Buttons';
import { LineChartt } from '../globalComponents/Chart';
import { abbreviate } from '../../utils/abbreviate';
import { StyledDateInputDiv, StyledSelectDiv, StyledSelect } from './TableTopBar';
import { Select } from 'antd';
import { IoMdArrowDropdown } from 'react-icons/io';

const {Option} = Select;

export const ChartComponent = ({
  width = '100%',
  noMargin,
  data,
  title,
  isRed,
  dataKey,
  valueKey,
}) => {
  const [analyticWidth, setAnalyticWidth] = React.useState(900);
  const analyticRef = React.useRef();

  React.useEffect(() => {
    if (analyticRef.current !== null) {
      setAnalyticWidth(analyticRef?.current?.getBoundingClientRect()?.width);
    }
  }, []);

  React.useEffect(() => {
    const analyticRefCurrent = analyticRef.current;

    if (Object.entries(analyticRef).length !== 0) {
      window.addEventListener('load', () => {
        setAnalyticWidth(analyticRefCurrent.getBoundingClientRect().width);
      });

      return () =>
        window.addEventListener('load', () => {
          setAnalyticWidth(analyticRefCurrent.getBoundingClientRect().width);
        });
    }
  }, []);

  React.useEffect(() => {
    const analyticRefCurrent = analyticRef.current;
    if (analyticRef.current !== null) {
      window.addEventListener('resize', () => {
        setAnalyticWidth(analyticRefCurrent.getBoundingClientRect().width);
      });

      return () =>
        window.addEventListener('resize', () => {
          setAnalyticWidth(analyticRefCurrent.getBoundingClientRect().width);
        });
    }
  }, []);

  const chartData = (merchantData) => {
    if (merchantData?.length > 0) {
      return merchantData.slice().map((item) => {
        item.merchant = abbreviate(item.merchant, 5);
        return item;
      });
    } else {
      return null;
    }
  };

  return (
    <LineChardDiv noMargin={noMargin} width={width} ref={analyticRef}>
      <CardScaffold style={{ overflow: 'auto' }}>
        <StyledChartHeader>
          <h1>{title}</h1>
          {/* <TransparentButton
            text="Export"
            color="#16192C"
            borderColor="#e2e2ea"
            backgroundColor="transparent"
          /> */}
          {/* <StyledDateInputDiv> */}
            {/* <StyledSelectDiv islong>
              <StyledSelect
                suffixIcon={
                  <IoMdArrowDropdown style={{ color: themes.deepBlack }} />
                }
                islong
                defaultValue="Month"
                bordered={false}>
                <Option value="jack"> Month </Option>{' '}
                <Option value="Select"> Year </Option>{' '}
              </StyledSelect>{' '}
            </StyledSelectDiv>{' '} */}
         {/*  </StyledDateInputDiv>{' '} */}
        </StyledChartHeader>
        <LineChartt
          data={data}
          isRed={isRed}
          width={analyticWidth}
          dataKey={dataKey}
          valueKey={valueKey}
        />
      </CardScaffold>
    </LineChardDiv>
  );
};

const LineChardDiv = styled.div`
  width: ${({ width }) => width};
  margin-top: ${({ noMargin }) => (noMargin ? '0px' : '40px')};
`;

const StyledChartHeader = styled.div`
  ${getCenter({ justifyContent: 'space-between' })};

  & h1 {
    font-family: ${fontFamily.inter};
    font-weight: 600;
    font-size: 16px;
    color: ${themes.deepBlack};
  }

  @media ${device.laptop} {
    & h1 {
      font-size: 1.1.vw;
    }
  }
`;

/* const StyledDateInputDiv = styled.div`
  width: 31.5%;
  ${getCenter({ justifyContent: 'space-between' })};
`;

const StyledDateInputBorder = styled(StyledInputBorderSmall)`
  display: flex;
  align-items: center;
  width: 45%;
`;

const StyledSelectDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.islong ? '0px' : '10px')};
  border: 0.725px solid #e2e2ea;
  cursor: pointer;

  background-color: #fff;
  border-radius: 5px;

  font-family: ${fontFamily.body};
  font-size: 11px;
  padding-left: 5px;
  width: ${(props) => props.width};

  & p {
    margin: 0px;
    color: #7a7a9d;
  }
`;

const StyledSelect = styled(Select)`
  font-size: ${(props) => (props.islong ? '16px' : '11px')};
  color: ${themes.deepBlack};
  font-weight: 500;

  width: 100% !important;

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0px 0px 0px 2px !important;
  }

  @media ${device.laptop} {
    font-size: ${(props) => (props.islong ? '1.1vw' : '0.7vw')};
    width: 7vw;
  }
`; */
