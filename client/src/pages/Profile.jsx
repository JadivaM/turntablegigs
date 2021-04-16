import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookingDialog from '../components/BookingDialog';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../context/AppContext';
import AvatarDefault from '../default_avatar.png';
import Divider from '@material-ui/core/Divider';
import Footer from '../components/Footer';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import DjMusicPlayer from '../components/DjMusicPlayer';
import Commendations from '../components/Commendations';
import Reviews from '../components/Reviews';
import VenueMaps from '../components/VenueMaps';
import Chat from '../components/Chat';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none'
  }
}));
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { currentUser } = useContext(AppContext);
  const { id } = useParams();
  const classes = useStyles();
  useEffect(() => {
    fetch(`/api/search/profiles/${id}`)
      .then((data) => data.json())
      .then((res) => {
        console.log(currentUser);
        console.log('updating profile to', res);
        setProfile(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <div className="profile-cover-img">
        {!profile?.user?.dj ? (
          <img
            className="cover-img"
            src={
              'https://images.unsplash.com/photo-1610051167190-0a80d5976755?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
            }
            alt="cover-photo"
          />
        ) : (
          <img
            className="cover-img"
            src={
              'https://images.unsplash.com/photo-1571428051944-a23e02fdadc9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
            }
            alt="cover-photo"
          />
        )}
        {currentUser?._id === id && (
          <div className="cover-img-icon">
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="default"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        )}
        <div className="user-profile-avatar">
          <img
            className="user-avatar"
            src={preview || profile?.user?.avatar || AvatarDefault}
            alt="user-avatar"
          />
          {currentUser?._id === id && (
            <div className="avatar-photo-icon">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="default"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          )}
        </div>
        <div className="book-me-button">
          {!profile?.user?.dj ? <Chat /> : <BookingDialog />}
        </div>
      </div>
      <div className="profile-block">
        <div className="profile-block-row">
          <div className="profile-info-column">
            <div className="user-info-row" style={{ textAlign: 'center' }}>
              <h3>{profile?.user?.name}</h3>
              <p>{profile?.user?.location}</p>
              <Divider variant="middle" />
              <div className="user-social-row" style={{ textAlign: 'center' }}>
                <h4>Connect</h4>
                <IconButton
                  aria-label="instagram profile"
                  style={{ color: '#c34893' }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  aria-label="facebook profile"
                  style={{ color: '#1677f2' }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  aria-label="twitter profile"
                  style={{ color: '#1fa1f2' }}
                >
                  <TwitterIcon />
                </IconButton>
                <Divider variant="middle" />
              </div>
            </div>
            <div className="profile-music-row">
              {!profile?.user?.dj ? (
                <VenueMaps />
              ) : (
                <DjMusicPlayer
                  key={profile.profile.id}
                  music={profile.profile.music}
                />
              )}
              {currentUser?._id === id && (
                <div className="edit-icon">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
          <div className="profile-about-column">
            <div className="profile-about-row">
              <h4>About</h4>
              <p>{profile?.profile?.about}</p>
              <Divider variant="middle" />
              <div className="profile-experience-row">
                <h4>Experience</h4>
                <p>{profile?.profile?.experience}</p>
                <Divider variant="middle" />
                <div className="profile-experience-row">
                  {!profile?.user?.dj ? <Reviews /> : <Commendations />}
                  {currentUser?._id === id && (
                    <div className="edit-icon">
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Profile;
