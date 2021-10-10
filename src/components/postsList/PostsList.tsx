import React from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// components
import PostItem from './postItem/PostItem';

// styling
import './PostsList.scss';

// interface
import { PostsListProps } from '../../interfaces/interfaces';

const PostsList = ({ posts }: PostsListProps) => {
  let toRender: JSX.Element;

  if (posts.length > 0) {
    toRender = (
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid key={post.id} item md={3} sm={6} xs={12}>
            <PostItem id={post.id} title={post.title} body={post.body} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    toRender = <Typography variant="h6">There are no posts.</Typography>;
  }

  return (
    <div className="posts-list-container">
      {toRender}
    </div>
  );
};

export default PostsList;
