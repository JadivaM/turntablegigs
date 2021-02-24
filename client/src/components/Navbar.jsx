import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import LoginDialog from '../logged-out/LogInDialog';
import SignupDialog from '../logged-out/SignupDialog';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f3f3f3',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1)
  }
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{ backgroundColor: '#fff', color: '#000' }}
        >
          <Toolbar>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h2 className="navbar-title">Turntable Gigs</h2>
            </Link>
            <div className="navbar-items-container">
              <div className="navbar-items">
                <p>Find Gigs</p>
                <p>Find DJs</p>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ height: 20, marginTop: 15 }}
                />
                <LoginDialog />
                <SignupDialog />
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search and discover"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
