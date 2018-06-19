import React from 'react';
import {shallow} from 'enzyme';

import Contact from './Contact';

describe('Contact Test', ()=> {

  test('Rendering Contact page',() => {
    const wrapper = shallow(
      <Contact/>
    );

    expect(wrapper).toMatchSnapshot();
  })
});
