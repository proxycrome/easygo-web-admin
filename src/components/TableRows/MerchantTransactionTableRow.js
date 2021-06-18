import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';



export const MerchantTransactionTableRow = (props) => {
    return (
        <tr>
            <td>{props.data.remarks}</td>
            <td>{props.data.txnDate}</td>
            <td>{props.data.currencyCode}</td>
            <td>{props.data.amount}</td>
            <td>{props.data.indicator}</td>
            <td>{props.data.valueDate}</td>
        </tr>
    )
}

const StyledId = styled.td`
    color: ${themes.primaryColor};
`