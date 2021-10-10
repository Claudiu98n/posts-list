import React from 'react';

// material-ui
import { Box, Card, CardContent, Typography } from '@mui/material';

// styling
import './PostItem.scss';

// interface
import { Post } from '../../../interfaces/interfaces';

const PostItem = ({ id, title, body }: Post) => {
  const card: JSX.Element = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {id}. {title}
        </Typography>
        <Typography variant="body2" component="div">
          {body}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box className="post-item">
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default PostItem;
