import React, { useState } from 'react';
import axios from 'axios';

const UploadMusic = () => {
  const [musicInfo, setMusicInfo] = useState('');
  const [musicFile, setMusicFile] = useState('');
  const [imageFile, setImageFile] = useState('');

  const handleMusicSelect = (e) => {
    setMusicFile(e.target.files[0]);
    console.log(musicFile);
  };

  const handleImageSelect = (e) => {
    setImageFile(e.target.files[0]);
    console.log(imageFile);
  };

  const handleChange = (e) => {
    setMusicInfo({ ...musicInfo, [e.target.name]: e.target.value });
    console.log(musicInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('songFile', musicFile, musicFile.name);
    data.append('coverPhoto', imageFile, imageFile.name);
    data.append('title', musicInfo.title);
    data.append('description', musicInfo.description);
    data.append('genre', musicInfo.genre);
    try {
      await axios.post('/api/music/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Music file:</p>
        <input
          name="songFile"
          type="file"
          accept="audio/*"
          onChange={handleMusicSelect}
        />
        <p>Image file:</p>
        <input
          name="coverPhoto"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
        />
        <p>Title:</p>
        <input
          name="title"
          onChange={handleChange}
          value={musicInfo.title}
        ></input>
        <p>Description</p>
        <input
          name="description"
          onChange={handleChange}
          value={musicInfo.description}
        ></input>
        <p>Genre</p>
        <input
          name="genre"
          onChange={handleChange}
          value={musicInfo.genre}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadMusic;
