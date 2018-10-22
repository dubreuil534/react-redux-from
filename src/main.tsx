import * as React from "react";
import { createBrowserHistory } from "history";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import { configureStore } from "app/store";

import { App } from "./app";

// prepare store
const history = createBrowserHistory();
const store = configureStore(history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
