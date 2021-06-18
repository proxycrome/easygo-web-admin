import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { FiMoreHorizontal } from 'react-icons/fi';



export const MerchantTableRow2 = (props) => {
    return (
        <tr onClick={props.onClick}>
            <StyledId>{props.data.tradingName}</StyledId>
            <td>{props.data.firstname}</td>
            <td>{props.data.lastname}</td>
            <td>{props.data.mobileNumber}</td>
            <td>{props.data.email}</td>
            <td>{props.data.address}</td>
            <td>{props.data.businessType}</td>
        </tr>
    )
}

const StyledId = styled.td`
    color: ${themes.primaryColor};
`

const StyledStatus = styled.button`
    background: ${props => props.status? '#00C880': 'transparent'};
    border: 2px solid ${props => props.status? '#09B577': themes.red};
    border-radius: 100px;
    color: ${props => props.status? 'black': themes.red};
    width: 5vw;

    &:focus{
        outline: none;
    }
`

const StyledChannel = styled.td`
    color: ${props => props.value === 'POS'? '#27ADD8':props.value === 'QR'? '#2F80ED': props.value === 'NFC'? '#EB5757': '#A0AEC0'}
`