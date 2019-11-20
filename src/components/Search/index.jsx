import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const fetchTodos = async () => {
  const [todos] = await Promise.all([
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(resp => resp.data),
    sleep(3000)
  ]);
  return todos;
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

  useEffect(() => {
    getPosts(query);
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
        />
        {query &&
          (isLoading ? (
            <div>loading</div>
          ) : (
            <List component="nav" aria-label="main mailbox folders">
              {posts.map(post => {
                return (
                  <ListItem button key={post.id}>
                    <ListItemText primary={post.title} secondary={post.body} />
                  </ListItem>
                );
              })}
            </List>
          ))}
      </div>
    </div>
  );
}

export default Search;
