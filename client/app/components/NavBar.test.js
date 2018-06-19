import React from 'react';
import {shallow} from 'enzyme';
import NavBar from './NavBar';

describe('Login Test', ()=> {

  test('Rendering Login page',() => {
    const wrapper = shallow(
      <NavBar/>
    );

    expect(wrapper).toMatchSnapshot();
  });


});
