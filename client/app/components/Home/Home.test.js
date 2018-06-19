import React from 'react';
import {shallow} from 'enzyme';
import Home from './Home';

describe('Home Test', ()=> {

  test('Rendering Home page',() => {
    const wrapper = shallow(
      <Home/>
    );

    expect(wrapper).toMatchSnapshot();
  });

});
