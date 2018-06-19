import React from 'react';
import {shallow} from 'enzyme';
import Login from './Login';

describe('Login Test', ()=> {

  test('Rendering Login page',() => {
const wrapper = shallow(
  <Login/>
);

expect(wrapper).toMatchSnapshot();
  });

  it('renders a email input', () => {
    expect(shallow(<Login />).find('#inputUsername').length).toEqual(1)
  });
  it('renders a password input', () => {
    expect(shallow(<Login />).find('#password').length).toEqual(1)
  });




});
