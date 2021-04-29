import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useParams } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';

const MusicCard = () => {
  const [musics, setMusics] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/music/${id}`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setMusics(res);
        console.log('this is the data', musics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="user-music-cards">
      {musics.music &&
        musics.music.map((song) => {
          return (
            <Card
              variant="outlined"
              style={{ border: 'none', backgroundColor: 'transparent' }}
              className="user-music-card"
            >
              <CardMedia
                className="music-card-media"
                image={song.coverPhoto}
                title={song.title}
              ></CardMedia>
              <MusicPlayer song={song.songFile} />
              <CardContent id="music-card-information">
                <h6 className="music-card-song-title">{song.title}</h6>
                <p className="music-card-song-genre">{song.genre}</p>
                {/* <p className='music-card-song-description'>{song.description}</p> */}
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};

export default MusicCard;
