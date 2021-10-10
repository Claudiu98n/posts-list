import React, { useState, useEffect } from 'react';

// material-ui
import { CircularProgress, Container, Typography } from '@mui/material';

// axios
import axios from 'axios';

// components
import PostsList from '../../components/postsList/PostsList';
import Header from '../../components/header/Header';
import Filters from '../../components/filters/Filters';

// interfaces
import { Post } from '../../interfaces/interfaces';

// styling
import './Home.scss';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeSortingOption, setActiveSortingOption] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // fetch posts when page mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const postsRequest = await axios.get(
        process.env.REACT_APP_POSTS_URL + '/posts'
      );
      return postsRequest;
    };

    fetchPosts()
      .then(posts => setPosts(posts.data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  // pagination
  const paginate = (pageNumber: number): void => {
    if (pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  // sorting
  const sort = (activeSortingOption: number): Post[] => {
    switch (activeSortingOption) {
      case 0:
        return [...posts];
      case 1:
        return [...posts].sort((a: Post, b: Post): number =>
          a.title.localeCompare(b.title)
        );
      case 2:
        return [...posts].sort((a: Post, b: Post): number =>
          b.title.localeCompare(a.title)
        );
      default:
        return [...posts];
    }
  };

  // get current posts
  const postsPerPage: number = 20;
  const lastPostIndex: number = currentPage * postsPerPage;
  const firstPostIndex: number = lastPostIndex - postsPerPage;
  const currentPosts: Post[] = sort(activeSortingOption).slice(firstPostIndex, lastPostIndex);
  const count: number = Math.floor(posts.length / postsPerPage);

  // conditionally render loader or posts list
  let toRender: JSX.Element;

  if (loading) {
    toRender = (
      <div className="loader-container">
        <CircularProgress size={60} />
        <Typography className="loading-paragraph" variant="h6" align="center">
          Loading...
        </Typography>
      </div>
    );
  } else {
    toRender = <PostsList posts={currentPosts} />;
  }

  return (
    <Container className="wrapper" maxWidth="xl">
      <Header />
      <Filters
        setActiveSortingOption={setActiveSortingOption}
        activeSortingOption={activeSortingOption}
        count={count}
        currentPage={currentPage}
        paginate={paginate}
      />
      {toRender}
    </Container>
  );
};

export default Home;
