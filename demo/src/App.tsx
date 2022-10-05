import React from 'react';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@demo/store';
// import Home from '@demo/pages/Home';
import { history } from './utils/history';

// const Editor = React.lazy(() => import('@demo/pages/Editor'));

function App() {
  return (
    <Provider store={store}>

          <Router history={history}>
           <Switch>
             <Route path='/' exact component={Home} />
             {/* <Route path='/editor' component={Editor} /> */}
           </Switch>
         </Router>
    </Provider>
  );
}

function Home() {
  return <>Home</>
}

export default App;
