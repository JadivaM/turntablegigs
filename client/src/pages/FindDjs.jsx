import Navbar from '../components/Navbar';
import DjSearchBar from '../components/DjSearchBar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import FindDjsCard from '../components/FindDjsCard';
import FeatDjs from '../components/FeatDjs';
import Footer from '../components/Footer';

const FindDjs = () => {
  return (
    <>
      <Navbar />
      <div className="djs-hero-image">
        <div className="main-container-dj__text">
          <h1 className="main-container-dj__text__title">
            Who's On the One's and Two's?
          </h1>
          <div className="searchbar-container">
            <DjSearchBar />
          </div>
        </div>
      </div>

      <section className="explore-djs-main-container">
        <div className="exploreDjs">
          <h2 className="explore-title">Explore</h2>
        </div>

        <div className="dj-card-container">
          <div className="dj-card">
            <FindDjsCard />
          </div>
        </div>
      </section>
      <FeatDjs />
      <Footer />
    </>
  );
};

export default FindDjs;
