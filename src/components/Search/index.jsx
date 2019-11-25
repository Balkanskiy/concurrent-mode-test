import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import Results from "../Results";
import Loading from "../Loading";
import useStyles from "../../common/styles";

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
          (isLoading ? <Loading /> : <Results posts={posts} query={query} />)}
      </div>
    </div>
  );
}

export default Search;
