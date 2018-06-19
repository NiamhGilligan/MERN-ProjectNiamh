import React from 'react';
import {shallow} from 'enzyme';
import CreateLesson from './CreatLesson';

describe('Create Lesson Test', ()=> {

  test('Rendering Create Lesson page',() => {
    const wrapper = shallow(
      <CreateLesson/>
    );

    expect(wrapper).toMatchSnapshot();
  });

});
