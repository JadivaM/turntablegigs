import React, { useState, useEffect, createRef } from 'react';
import '../App.css';

import loadscript from 'load-script';

function DjMusicPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [player, setPlayer] = useState(false);

  const iframeRef = createRef();

  useEffect(() => {
    loadscript('https://w.soundcloud.com/player/api.js', () => {
      const player = window.SC.Widget(iframeRef.current);
      setPlayer(player);

      const {
        PLAY,
        PLAY_PROGRESS,
        PAUSE,
        FINISH,
        ERROR
      } = window.SC.Widget.Events;

      player.bind(PLAY, () => {
        setIsPlaying(true);

        player.getCurrentSoundIndex((playerPlaylistIndex) => {
          setPlaylistIndex(playerPlaylistIndex);
        });
      });

      player.bind(PAUSE, () => {
        player.isPaused((playerIsPaused) => {
          if (playerIsPaused) setIsPlaying(false);
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!player) return;

    player.isPaused((playerIsPaused) => {
      if (isPlaying && playerIsPaused) {
        player.play();
      } else if (!isPlaying && !playerIsPaused) {
        player.pause();
      }
    });
  }, [isPlaying]);

  useEffect(() => {
    if (!player) return;

    player.getCurrentSoundIndex((playerPlaylistIndex) => {
      if (playerPlaylistIndex !== playlistIndex) player.skip(playlistIndex);
    });
  }, [playlistIndex]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const changePlaylistIndex = (skipForward = true) => {
    player.getSounds((playerSongList) => {
      let nextIndex = skipForward ? playlistIndex + 1 : playlistIndex - 1;

      if (nextIndex < 0) nextIndex = 0;
      else if (nextIndex >= playerSongList.length)
        nextIndex = playerSongList.length - 1;

      setPlaylistIndex(nextIndex);
    });
  };

  return (
    <div className="App">
      <div className="App-container">
        <div className="soundcloud-section">
          <iframe
            ref={iframeRef}
            id="sound-cloud-player"
            style={{ border: 'none', height: 314, width: 400 }}
            scrolling="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${props.music}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default DjMusicPlayer;
