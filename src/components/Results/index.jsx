import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function Results({ posts, query }) {
  if (posts.length < 0) {
    return <div>couldn't find results for {query}</div>;
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
