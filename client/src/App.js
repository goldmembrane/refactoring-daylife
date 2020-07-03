import React from 'react';
import { Home, Monthly, Yearly, Weekly } from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends React.Component {

  render() {
    return (
     <BrowserRouter>
      <Route exact path = '/' component = {Home} />
      <Switch>
        <Route path = '/Yearly' component = {Yearly} />
        <Route path = '/Monthly' component = {Monthly} />
        <Route path = '/Weekly' component = {Weekly} />
      </Switch>
     </BrowserRouter>
    )
  }
}

export default App;
