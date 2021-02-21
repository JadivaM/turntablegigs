import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer';
import heroImage from '../images/hero-image.png';

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
      <div className="hero-image_container" style={{ marginBottom: 0 }}>
        <img className="hero-image" src={heroImage} alt="vinyls" />
        <div className="hero-image-details">
          <h1 className="hero-image-text">
            Connecting DJs and Venues in One Place
          </h1>
          <div className="hero-image-btn-container">
            <Button
              variant="contained"
              color="default"
              href="/search/gigs"
              className="hero-image-btn"
            >
              Find a Gig
            </Button>
            <Button
              variant="contained"
              color="default"
              href="/search/djs"
              className="hero-image-btn"
            >
              Find a DJ
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
