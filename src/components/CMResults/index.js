import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import useStyles from "../styles";

function Results({ resource }) {
  const styles = useStyles();
  const posts = resource.read();

  if (posts.length === 0) {
    return (
      <Paper className={styles.noResults}>
        <div>couldn't find results</div>
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
