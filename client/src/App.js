import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindGigs from './pages/FindGigs';
import FindDjs from './pages/FindDjs';
import Profile from './pages/Profile';
import GigApplication from './pages/GigApplication';
import { AppContextProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/gigs" component={FindGigs} />
          <Route exact path="/search/djs" component={FindDjs} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/applygig" component={GigApplication} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
