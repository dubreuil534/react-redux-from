import * as React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router";

import Home from "app/containers/home";
import Login from "app/containers/login";

export const App = hot(module)(() => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route path="/login" component={Login} />
  </Switch>
));
