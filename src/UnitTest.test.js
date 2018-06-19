import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,configure} from 'enzyme';
import Enzyme from 'enzyme';
import Login from '../client/app/components/Login/Login';
import Adapter from 'enzyme-adapter-react-15';

describe('Component: MyAccountPage',() =>{
  Enzyme.configure({adapter: new Adapter});
  test('Rendering Login page',() => {
    const wrapper = shallow(
      <Login/>
    )

  });

  //it('links to create page when create button is clicked');
 // it('deletes when delete button is clicked');

});
