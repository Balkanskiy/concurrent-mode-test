import React from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { unstable_createResource as createResource } from "react-cache";
import Paper from "@material-ui/core/Paper";
import useStyles from "../../common/styles";

const postsResource = createResource(async query => {
  const { data } = await axios.get(`/posts/data.json?q=${query}`);
  return data;
});

function Results({ query }) {
  const posts = postsResource.read(query);
  const styles = useStyles();

  if (posts.length === 0) {
    return (
      <Paper className={styles.noResults}>
        <div>couldn't find results for {query}</div>
      </Paper>
    );
  }
  return (
    <List component="nav" aria-label="main mailbox folders">
      {posts.map(post => (
        <ListItem button key={post.id}>
          <ListItemText primary={post.title} secondary={post.body} />
        </ListItem>
      ))}
    </List>
  );
}

export default Results;
