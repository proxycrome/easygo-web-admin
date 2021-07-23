import styled from 'styled-components';
import { Modal } from 'antd';
import { getCenter } from '../../utils/getCenter';
import { themes } from '../../globalAssets/theme'

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

       
       
export const StyledInputContainer = styled.div`
  ${getCenter()}
  border: 1px solid ${themes.border};
  width: 100%;
  padding: 4px;
  border-radius: 5px;

  & p {
    color: ${(props) => props.theme.lightText};
  }
`;
