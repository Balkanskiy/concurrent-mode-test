import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";

import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "../Results";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "72px"
  },
  search: {
    width: "100%",
    maxWidth: "360px",
    display: "flex",
    justifyContent: "flexStart",
    alignItems: "flexStart",
    flexFlow: "column nowrap"
  },
  input: {
    width: "100%"
  },
  results: {}
}));

let updateQueryTimeout = null;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const fetchTodos = async query => {
  const [posts] = await Promise.all([
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(resp => filterPosts(resp.data, query)),
    sleep(3000)
  ]);
  return posts;
};

const filterPosts = (posts, query) => {
  return posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
};

function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  const getPosts = async query => {
    setIsLoading(true);
    try {
      const data = await fetchTodos(query);
      setPosts(data);
    } catch (e) {
      console.error("fetch error");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = searchQuery => {
    if (updateQueryTimeout) {
      clearTimeout(updateQueryTimeout);
    }

    updateQueryTimeout = setTimeout(() => {
      getPosts(searchQuery);
    }, 250);
  };

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          className={styles.input}
          label="Search"
          inputProps={{
            "aria-label": "description"
          }}
          value={query}
          margin="normal"
          onChange={handleQueryChange}
          endAdornment={
            <InputAdornment position="end">
              {isLoading && <CircularProgress color="black" size={12} />}
            </InputAdornment>
          }
        />
        {query && <Results posts={posts} />}
      </div>
    </div>
  );
}

export default Search;
