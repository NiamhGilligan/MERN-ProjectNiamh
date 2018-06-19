
import React from 'react';
import NavBar from '../NavBar';

import EmailBox from '../Forms/EmailBox';
const App = ({ children }) => (
  <div>
    <div><NavBar/></div>

    <div>
    <EmailBox/>
    </div>
      <div>
    <main className='col-sm-9'>
      {children}
    </main>

      </div>
  </div>
);

export default App;

