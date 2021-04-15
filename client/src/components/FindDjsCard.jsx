import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

export default function FindDjsCard() {
  const [djs, setDjs] = useState([]);

  useEffect(() => {
    fetch('/api/users/djs')
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log(res);
        setDjs(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="findDjs-cards">
      {djs.map((dj) => {
        return (
          <Card key={dj.id} className="dj-individual-card">
            <CardActionArea>
              <CardMedia
                className="dj-card-image"
                component="img"
                alt="DJ avatar"
                image={dj.avatar}
                title="DJs performing"
              ></CardMedia>
              <CardContent style={{ textAlign: 'center' }}>
                <div className="dj-card-information">
                  <Link
                    to={`/profile/${dj._id}`}
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    <h4 className="dj-card-name">{dj.name}</h4>
                  </Link>
                  <p className="dj-card-location">{dj.location}</p>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}
