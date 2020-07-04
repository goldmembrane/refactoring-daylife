import React from 'react';
import { Home , Monthly, Yearly, Weekly } from './pages';
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {

  render() {
    return (
     <div>
      <Route exact path = '/' component = {Home} />
      <Switch>
        <Route path = '/Yearly' component = {Yearly} />
        <Route path = '/Monthly' component = {Monthly} />
        <Route path = '/Weekly' component = {Weekly} />
      </Switch>
     </div>
    )
  }
}

export default App;
