import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindGigs from './pages/FindGigs';
import FindDjs from './pages/FindDjs';
import Profile from './pages/Profile';
import Gigs from './pages/Gigs';
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
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/gigs" component={Gigs} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
