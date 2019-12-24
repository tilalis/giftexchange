import React from 'react';

import './Main.css';

import { Switch, Route } from 'react-router-dom'

import CreateBox from '../create-box';
import OpenBox from '../open-box';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={CreateBox}/>
          <Route path='/box/:box' component={OpenBox}/>
        </Switch>
      </main>
    )
  }
}

export default Main;
