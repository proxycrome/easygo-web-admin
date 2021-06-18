import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { FiMoreHorizontal } from 'react-icons/fi';



export const MerchantProfileRow = (props) => {
    return (
        <tr onClick={props.onClick}>
            <StyledId>{props.data.id}</StyledId>
            <td>{props.data.name}</td>
            <StyledChannel value={props.data.channel}>{props.data.channel}</StyledChannel>
            <td>{props.data.amount}</td>
            <td>{props.data.type}</td>
            <td><StyledStatus status = {props.data.status}>{props.data.status? 'Success': 'Failed'}</StyledStatus></td>
            <td>{props.data.activity}</td> {/* this is the date */}
            <td><FiMoreHorizontal/></td>
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