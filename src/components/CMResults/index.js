import React from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { unstable_createResource as createResource } from "react-cache";
import { sleep, filterPosts } from "../../common/getPosts";

const fetchPosts = createResource(async query => {
  const [posts] = await Promise.all([
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(resp => filterPosts(resp.data, query)),
    sleep(3000)
  ]);
  return posts;
});

function Results({ query }) {
  const posts = fetchPosts.read(query);

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
