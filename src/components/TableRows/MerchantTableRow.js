import React from 'react';
import styled from 'styled-components';
import { themes } from '../../globalAssets/theme';
import { FiMoreVertical } from 'react-icons/fi';
import { Popover } from 'antd';

export const MerchantTableRow = (props) => {
  const content = (
    <div>
      <p>Send Email Verification</p>
      <p style={{ color: 'red' }}>Deactivate</p>
    </div>
  );

  return (
    <tr>
      <StyledId>{props.data.id}</StyledId>
      <td>{props.data.name}</td>
      <td>{props.data.count}</td>
      <td>{props.data.activity}</td>
      <td>
        <Popover trigger="click" content={content}>
          <FiMoreVertical />
        </Popover>
      </td>
    </tr>
  );
};

const StyledId = styled.td`
  color: ${themes.primaryColor};
`;
