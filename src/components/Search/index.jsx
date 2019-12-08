import React, { useState, useEffect } from "react";
import debounce from "awesome-debounce-promise";
import Input from "@material-ui/core/Input";
import Results from "../Results";
import Loading from "../Loading";
import useStyles from "../styles";

const search = async query => {
  const response = await fetch(`/posts/data.json?q=${query}`);
  return await response.json();
};
const debouncedSearch = debounce(search, 500);

function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();

  const searchPosts = async searchQuery => {
    try {
      setIsLoading(true);
      const posts = await debouncedSearch(searchQuery);
      setPosts(posts);
      setIsLoading(false);
    } catch (e) {
      console.error("fetch error");
    }
  };

  const handleQueryChange = event => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      searchPosts(searchQuery);
    }
  };

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
