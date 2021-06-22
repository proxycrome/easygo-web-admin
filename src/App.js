import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Home} from './components/pages/Dashboard/index';
import { ProtectedRoute } from './components/ProtectedRoute';
import { loadProgressBar } from 'axios-progress-bar';
import {SignIn} from './components/pages/SignIn/index';

 


function App() {
  loadProgressBar()
  return (
    <Switch>
      <Route exact path='/'>
       <SignIn/>
      </Route>
      <ProtectedRoute path='/dashboard'>
        <Home/>
      </ProtectedRoute>
    </Switch>
  );
}








 

export default App;
