import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import websocket from './middleware/websocket';
import reducers from './reducers';
import { messageToActionAdapter } from './actions/chat';
import App from './app';

const store = applyMiddleware(
  reduxThunk,
  websocket({messageToActionAdapter})
)(createStore)(reducers)

const renderApp = (Component) => {
  render(

    <Provider store={store}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </Provider>
    , document.querySelector("#app")
  );
}
renderApp(App);
if (module && module.hot) {
  module.hot.accept('./app', () => {
    const NextRootContainer = require('./app');
    renderApp(NextRootContainer);
  });
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers/index').default;
    store.replaceReducer(nextReducer);
  });
}
