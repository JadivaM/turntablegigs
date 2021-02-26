import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    padding: '8px 16px'
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className="main-container-home">
        <div className="main-container-home__text">
          <h1 className="main-container-home__text__title">
            Connecting DJs and Venues
          </h1>

          <p className="main-container-home__text__caption">
            Discover available gigs and support local DJs in your area
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
