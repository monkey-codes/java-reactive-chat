import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reducers from './reducers';
import { fetchMessages }  from './actions';

import App from './app';
import Home from './components/home';
const store = applyMiddleware(reduxThunk)(createStore)(reducers)

fetchMessages()(store.dispatch);

//const store = createStore(reducers);
const renderApp = (Component) => {
  render(

    <Provider store={store}>
      <AppContainer>
        <Component>
          <Router>
            <Route path="/" component={Home}>
            </Route>
          </Router>
        </Component>
      </AppContainer>
    </Provider>
    , document.querySelector("#app")
  );
}
renderApp(App);
if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NextRootContainer = require('./app');
    renderApp(NextRootContainer);
  });
}
