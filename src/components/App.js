import React from 'react';

import Main from './Main';
import { Provider } from './Context';

const App = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};

export default App;
