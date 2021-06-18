import React, {useEffect} from 'react';
import {
  StyledAnchor,
  Container,
  RightDiv,
  LeftDiv,
  SubContainer,
  StyledPassword,
  LogoDiv,
  StyledInputDiv,
  StyledInput,
  StyledFooter,
  StyledLink
} from './style';
import {Row, Form,Space} from 'antd';
import Logo from '../../../images/logo.png';
import { PrimaryButton } from '../../globalComponents/Buttons';
import {useSelector, useDispatch} from 'react-redux';
import {Route, useHistory, useLocation} from 'react-router-dom';
import {notificationAlert} from '../../../utils/notificationAlert'
import {themes} from '../../../globalAssets/theme'


const buttonStyle = {
  fontSize: '1vw',
  backgroundColor: themes.primaryColor,
  paddingTop: '15px',
  paddingBottom: '15px',
  fontWeight: '700',
  marginTop: '15px',
};

export function SignIn(props) {
  /* const dispatcher = useDispatch()
  let history = useHistory();
  let location = useLocation();
  const signInResponse = useSelector(state => state.signInResponse);

  let { from } = location.state || { from: { pathname: "/bank-module", state: {from: location} } };


useEffect(() => {
  if(localStorage.token){
    history.replace(from);
  }

  if(signInResponse.status === 'error'){
    notificationAlert('error', 'Failed', signInResponse.message);

    dispatcher(saveTokenAction({token: '', status: '', message: ''}));
  }
}, [signInResponse])

  const onFinish = (values) => {
    dispatcher(getTokenAction(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; */

  return (
    <Container>
      <SubContainer>
        <Row>
          <LeftDiv xs={11}>
            <LogoDiv>
              <img src={Logo} alt='logo' />
            </LogoDiv>
            <h1>
              Clane Super 
            </h1>
            <h1> Admin Portal</h1>
            <p>Copyright 2021</p>
          </LeftDiv>
          <RightDiv xs={13}>
            <div>
              <h2>
                Sign in to <br />
                Clane Admin Portal
              </h2>

              <Form
                name='basic'
                initialValues={{
                }}
                /* onFinish={onFinish}
                onFinishFailed={onFinishFailed} */
              >
                <Form.Item
                  name='email'
                  type='email'
                  hasFeedback
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please input your email!',
  
                    },
                  ]}
                >
                  <StyledInputDiv>
                    <p>EMAIL</p>
                    <StyledInput placeholder='Enter your email' bordered={false} />
                  </StyledInputDiv>
                </Form.Item>

                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <StyledInputDiv>
                    <p>PASSWORD</p>
                    <StyledPassword placeholder='Enter your password' bordered={false} />
                  </StyledInputDiv>
                </Form.Item>

                <Form.Item>
                  <PrimaryButton
                    style={buttonStyle}
                    text='Sign in'
                    type='primary'
                    htmlType='submit'
                  />
                </Form.Item>
                <StyledFooter>
                    <Space size='large'>
                        <p style={{marginBottom: '0px'}}>Not a member?</p>
                        <StyledAnchor/>
                        <StyledLink>
                            Sign up now
                        </StyledLink>
                    </Space>
                </StyledFooter>
              </Form>
            </div>
          </RightDiv>
        </Row>
      </SubContainer>
    </Container>
  );
}
