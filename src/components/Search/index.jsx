import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "../Results";
import useStyles from "./styles";
import fetchPosts from "./getPosts";

let updateQueryTimeout = null;

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
