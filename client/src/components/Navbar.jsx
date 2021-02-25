import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

export default function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-title-container">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p className="navbar-title">Turntable Gigs</p>
          </Link>
        </div>
        <div className="navbar-list-container">
          <ul className="navbar-list">
            <Link to="/search/gigs" style={{ textDecoration: 'none' }}>
              <li>Find Gigs</li>
            </Link>
            <Link to="/search/djs" style={{ textDecoration: 'none' }}>
              <li>Find DJs</li>
            </Link>
            <Divider orientation="vertical" flexItem style={{ height: 20 }} />
            <li>Log in</li>
            <li>Sign up</li>
          </ul>
        </div>
      </div>
    </>
  );
}
