import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "../Results";
import useStyles from "../../common/styles";
import { sleep, filterPosts } from "../../common/getPosts";

let updateQueryTimeout = null;

const fetchPosts = async query => {
  const [posts] = await Promise.all([
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(resp => filterPosts(resp.data, query)),
    sleep(3000)
  ]);
  return posts;
};

function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const handleQueryChange = event => setQuery(event.target.value);

  const search = async query => {
    setIsLoading(true);
    try {
      const data = await fetchPosts(query);
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
      search(searchQuery);
    }, 300);
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
          inputProps={{ "aria-label": "description" }}
          value={query}
          margin="normal"
          onChange={handleQueryChange}
        />
        {query && isLoading ? (
          <div className={styles.loading}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Results posts={posts} />
        )}
      </div>
    </div>
  );
}

export default Search;
