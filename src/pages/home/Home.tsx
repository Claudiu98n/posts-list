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
import { Post, SortingOption } from '../../interfaces/interfaces';

// styling
import './Home.scss';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
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
      .then(posts => {
        setPosts(posts.data);
        setSortedPosts(posts.data);
      })
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
  const sort = (activeSortingOption: SortingOption): void => {
    let sortedPosts: Post[];

    switch (activeSortingOption.value) {
      case 0:
        sortedPosts = [...posts].sort((a: Post, b: Post): number =>
          a.title.localeCompare(b.title)
        );
        break;
      case 1:
        sortedPosts = [...posts].sort((a: Post, b: Post): number =>
          b.title.localeCompare(a.title)
        );
        break;
      case 2:
        sortedPosts = [...posts];
        break;
      default:
        sortedPosts = [...posts];
    }

    setSortedPosts(sortedPosts);
    setActiveSortingOption(
      activeSortingOption.value === 2 ? 0 : activeSortingOption.value + 1
    );
  };

  // get current posts
  const postsPerPage: number = 20;
  const lastPostIndex: number = currentPage * postsPerPage;
  const firstPostIndex: number = lastPostIndex - postsPerPage;
  const currentPosts: Post[] = sortedPosts.slice(firstPostIndex, lastPostIndex);
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
        count={count}
        currentPage={currentPage}
        paginate={paginate}
        sort={sort}
        activeSortingOption={activeSortingOption}
      />
      {toRender}
    </Container>
  );
};

export default Home;
