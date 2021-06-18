import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { TransparentButton } from '../globalComponents/Buttons';



export const TopErrorRows = (props) => {
    return (
        <tr>
            <td>{props.data.title}</td>
            <td>{props.data.volume}</td>
            <td>
                <TransparentButton borderColor={themes.grey} backgroundColor='#fff' text='View'/>
            </td>
        </tr>
    )
}
