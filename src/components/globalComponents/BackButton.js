import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { getCenter } from '../../utils/getCenter';
import { fontFamily } from '../../globalAssets/fontFamily';
import { device } from '../../globalAssets/breakpoints';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

export const BackButton = (props) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return ( <StyledBackButton onClick = { goBack } >
        <IoIosArrowBack />
        <p> Back { props.location } </p> 
        </StyledBackButton>
    );
};


const StyledBackButton = styled.div `
    color: ${themes.subtleBlack};
    ${getCenter({justifyContent: 'flex-start'})};
    margin-bottom: 20px;
    font-size: 14px;
    font-family: ${fontFamily.inter};
    cursor: pointer;
    & p{
        margin-left: 10px;
        margin-bottom: 0px;
    }

    @media ${device.laptop}{
        font-size: 0.9vw;
    }
`