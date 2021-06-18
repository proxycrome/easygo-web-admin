import styled from 'styled-components';
import { Row, Col, Input } from 'antd';
import backgroundImage from '../../../images/backgroundImage.png'
import { themes } from '../../../globalAssets/theme';
import { fontFamily } from '../../../globalAssets/fontFamily';
import { device } from '../../../globalAssets/breakpoints';
import { getCenter } from '../../../utils/getCenter'
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';


/*  */
export const Container = styled(Row)`
    background-image: url(${backgroundImage});
    background-size: 70vw 100vh;
    background-repeat: no-repeat;
    background-position: left;
    background-attachment: fixed;
    
`
export const SubContainer = styled(Col)`
    width: 90%;
    margin: 0 auto;
    height: 100%;
`
export const LeftDiv = styled(Col)`
    font-family: ${fontFamily.inter};
    height: 100vh;
    padding-top: 50px;
    
   

    & h1{
        color: #fff;
        font-size: 54px;
        margin: 0px;
        font-weight: 600;
        line-height: 1.2em;
    }

    & p{
        color: #fff;
        font-weight: 500;
        font-size:18px;
        margin-top: 16px;
    }

    @media ${device.laptop}{
        & h1{
            font-size: 4vw;
        }

        & p{
            font-size: 1.2vw;

        }
    }
   
`

export const RightDiv = styled(Col)`
    height: 100vh;
    ${getCenter()};

    & > div {
        height: 60vh;
        width: 30vw;

        & h2{
            color: ${themes.deepBlack};
            font-size: 2.5vw;
            font-weight: 600;
        }
    }
    
`

export const LogoDiv = styled.div `
    width: 10vw;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 15px;
    margin-bottom: 40px;

    & img{
        width: 100%;
        height: auto;
    }
`

export const StyledInputDiv = styled.div `
    background-color: #F7F7F7;
    padding: 20px 24px;
    border-radius: 12px;
    mix-blend-mode: normal;
    border: 1px solid transparent;


    &:hover{
        border: 1px solid ${props => props.isred? themes.red: themes.primaryColor};
        background-color: #fff;
    }

    & p{
        margin-bottom: 0px;
        font-family: ${fontFamily.inter};
        font-weight: 700;
        font-size: 0.8vw;
        margin-left: 10px;
    }
`

export const StyledInput = styled(Input)`
    background-color:  #F7F7F7;
    &:focus, &:active, &:hover {
        background-color:  #fff !important;
        border-color: #fff !important;
    } 
`


export const StyledPassword = styled(Input.Password)`
    background-color:  #F7F7F7;
    &:focus, &:active, &:hover {
        background-color:  #fff !important;
        border-color: #fff !important;
    } 
`

export const StyledAnchor = styled(FaLink)`
   /*  transform: rotate(40deg); */
    font-size: 16px;

    @media ${device.laptop}{
        font-size: 1.15vw;
    }
`

export const StyledFooter = styled.div `
    ${getCenter()};
    font-family: ${fontFamily.inter};

    & p{
        font-weight: 700;
        color: ${themes.deepBlack};
        font-size: 13px;
    }

    @media ${device.laptop}{
        & p{
            font-size: 0.95vw;
        }
    }
`

export const StyledLink = styled(Link)`
    color: ${themes.primaryColor};
    font-weight: 700;

`