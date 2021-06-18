import React from 'react';
import styled from 'styled-components';
import { Row, Col, Input, Badge, Select } from 'antd';
import logo from './images/logo.png';
import { device } from './globalAssets/breakpoints';
import { themes } from './globalAssets/theme';
import { getCenter } from './utils/getCenter';

import { MdPeopleOutline as UsersIcon } from 'react-icons/md';
import { GoHome as HomeIcon } from 'react-icons/go';
import { fontFamily } from './globalAssets/fontFamily';
import img1 from './images/img1.png';
import {Switch, Route} from 'react-router-dom';
import {Home} from './components/pages/Dashboard/index';
import { ProtectedRoute } from './components/ProtectedRoute';
import { loadProgressBar } from 'axios-progress-bar'
 


function App() {
  loadProgressBar()
  return (
    <Switch>
      <Route exact path='/'>
       <div>Sign In page</div>
      </Route>
      <ProtectedRoute path='/dashboard'>
        <Home/>
      </ProtectedRoute>
    </Switch>
  );
}








 

export default App;
