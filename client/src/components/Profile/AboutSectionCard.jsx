import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const AboutSectionCard = (props) => {
  return (
    <div>
      <Card className="user-profile-about-card">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            About
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography color="textSecondary"></Typography>
          <Typography variant="body2" component="p">
            {props.about}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSectionCard;
