import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "../Results";
import useStyles from "../../common/styles";
import axios from "axios";

let updateQueryTimeout = null;

function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const handleQueryChange = event => setQuery(event.target.value);

  const search = async query => {
    try {
      const { data } = await axios.get(`/posts/data.json?q=${query}`);
      setPosts(data);
    } catch (e) {
      console.error("fetch error");
    }
  };

  const debouncedSearch = searchQuery => {
    if (updateQueryTimeout) {
      clearTimeout(updateQueryTimeout);
    }

    setIsLoading(true);
    updateQueryTimeout = setTimeout(async () => {
      console.count();
      await search(searchQuery);
      setIsLoading(false);
    }, 1000);
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
          onChange={handleQueryChange}
        />
        {query &&
          (isLoading ? (
            <div className={styles.loading}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Results posts={posts} query={query} />
          ))}
      </div>
    </div>
  );
}

export default Search;
