import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import Results from "../Results";
import Loading from "../Loading";
import useStyles from "../../common/styles";
import debounce from "awesome-debounce-promise";

const search = async query => await axios.get(`/posts/data.json?q=${query}`);
const debouncedSearch = debounce(search, 500);

function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();

  const searchPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await debouncedSearch(query);
      setPosts(data);
      setIsLoading(false);
    } catch (e) {
      console.error("fetch error");
    } finally {
    }
  };

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query) {
      searchPosts();
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
