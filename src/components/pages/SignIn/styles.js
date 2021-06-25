
import styled from "styled-components";
import { Col, Button, Input, Form} from 'antd';
import backgroundImage from '../../../images/bg3.jpg';
import { themes } from "../../../globalAssets/theme";
import { StyledCardScaffold } from '../../globalComponents/CardScaffold';

const {Password} = Input

export const StyledContainer = styled(Col)`
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 10% 10%;
`

export const StyledInnerContainer = styled.div`
    background: rgba(77, 201, 16, 0.5);
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`

export const StyledCard = styled(StyledCardScaffold)`
    width: 25%;
    text-align: center;
    padding-left: 0px;
    padding-right: 0px;

    & img{
        width: 8vw;
        height: auto;
    }

    & h3{
        color: ${themes.primaryColor};
        margin-bottom: 25px;
    }
`

export const StyledButton = styled(Button)`
    background-color: ${themes.primaryColor};
    color: #fff;
    width: 100%;
    outline: none;
    border-radius: 5px;

    &:hover, &:focus{
        background-color: ${themes.primaryColor};
        color: #fff;
        outline: none;
        border: none;
    }
`

export const StyledInput = styled(Input)`
    border-bottom: 1px solid #d9d9d9;
    border-radius: 0px;
    margin-bottom: 15px;

    &:focus, &:hover{
        border-bottom: 1px solid ${themes.primaryColor} !important;;
    }
`

export const StyledPassword = styled(Password)`
    border-bottom: 1px solid #d9d9d9;
    border-radius: 0px;
    margin-bottom: 15px;

    &:focus, &:hover{
        border-bottom: 1px solid ${themes.primaryColor} !important;
    }
`

export const StyledForm = styled(Form)`
    padding: 0 15px;
`

