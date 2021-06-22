import {useState} from 'react'
import { Row, Divider, Form, Input } from 'antd';
import {
  StyledForm,
  StyledContainer,
  StyledInnerContainer,
  StyledCard,
  StyledButton,
  StyledInput,
  StyledPassword,
} from './styles';
import Logo from '../../../images/logo.png';
import { FiLock, FiUser } from 'react-icons/fi';
import { loginAdmin } from './slice';
import { useDispatch } from 'react-redux';
import { notificationAlert } from '../../../utils/notificationAlert'

export const SignIn = (props) => {
    const [signInLoading, setSignInLoading] = useState(false);
    const dispatcher = useDispatch()

    const onFinish = async (values) => {
        setSignInLoading(true);

        try {
           const response =  await dispatcher(loginAdmin({data: values}));
           console.log({response});
           setSignInLoading(false);
        } catch (error) {
            notificationAlert('error', 'Failed', error.message || 'Please try again')
            console.log(error);
            setSignInLoading(false);
        }
    }
  return (
    <Row>
      <StyledContainer sm={{ span: 24 }}>
        <StyledInnerContainer>
          <StyledCard>
            <img src={Logo} alt="logo" />
            <Divider />
            <StyledForm onFinish={onFinish}>
              <Form.Item name="emailOrPhone">
                <StyledInput
                  type="email"
                  prefix={<FiUser />}
                  bordered={false}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item name="password">
                <StyledPassword
                  prefix={<FiLock />}
                  bordered={false}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <StyledButton loading={signInLoading} htmlType='submit' size="large">Log in</StyledButton>
              </Form.Item>
            </StyledForm>
          </StyledCard>
        </StyledInnerContainer>
      </StyledContainer>
    </Row>
  );
};
