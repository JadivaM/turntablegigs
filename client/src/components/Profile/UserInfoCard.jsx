import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';

const UserInfoCard = (props) => {
  return (
    <div>
      <Card className="user-profile-info-card">
        <CardActionArea>
          <CardMedia image={props.avatar} title={props.name} />
          <CardContent>
            <h4>{props.name}</h4>
            <p className="user-profile-card-location">{props.location}</p>
          </CardContent>
        </CardActionArea>
        <div className="user-social-row">
          <IconButton aria-label="instagram profile">
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="facebook profile">
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="twitter profile">
            <TwitterIcon fontSize="small" />
          </IconButton>
        </div>
      </Card>
    </div>
  );
};

export default UserInfoCard;
