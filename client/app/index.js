
import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import CreatLesson from './components/CreateLesson/CreatLesson';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Contact from './components/Contact/Contact';
import EditItem from './components/AccountHomePage/EditItems';
import IndexItem from './components/AccountHomePage/MyAccountPage';
import './styles/styles.scss';
import SearchNew from "./components/Search/SearchNew";

render((
  <Router>
    <App>
      <div>
          <Switch>
        <Route exact path="/" component={Home}/>
        <Route  path="/Login" component={Login}/>
        <Route  path="/create" component={CreatLesson}/>
            <Route  path="/contact" component={Contact}/>
            <Route  path="/Register" component={Register}/>
            <Route  path="/MyAccount" component={IndexItem}/>
            <Route  path="/search" component={SearchNew}/>
            <Route path='/edit/:id' component={EditItem} />
            <Route component={NotFound}/>
          </Switch>
      </div>
    </App>
  </Router> ), document.getElementById('app'));

