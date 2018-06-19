import React from 'react';
import {shallow} from 'enzyme';
import EmailBox from './EmailBox';

describe('Email Box Test', ()=> {

  test('Rendering EmailBox page',() => {
    const wrapper = shallow(
      <EmailBox/>
    );

    expect(wrapper).toMatchSnapshot();
  });

});
