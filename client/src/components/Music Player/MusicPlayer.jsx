import React, { useState, useEffect, useRef } from 'react';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

const MusicPlayer = (props) => {
  const [playing, setPlaying] = useState(false);
  // const [songProgress, setSongProgress] = useState(0);
  // const [currentSong, setCurrentSong] = useState('');

  const audioRef = useRef(new Audio(props.song));

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return (
    <div className="music-player-control-buttons">
      {playing ? (
        <button
          type="button"
          className="button-music-card"
          onClick={() => setPlaying(false)}
          aria-label="Pause"
        >
          <PauseRoundedIcon fontSize="large" className="music-button" />
        </button>
      ) : (
        <button
          type="button"
          className="button-music-card"
          onClick={() => setPlaying(true)}
          aria-label="Play"
        >
          <PlayArrowRoundedIcon fontSize="large" className="music-button" />
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;
