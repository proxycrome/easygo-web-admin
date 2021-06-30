import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  background-color: transparent;
  border-radius: 20px;
  //min-width: 50vw;
  color: ${(props) => props.theme.boldText};
  text-align: center;
  & .ant-modal-content {
    border-radius: 8px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.foreground};
  }
`;
