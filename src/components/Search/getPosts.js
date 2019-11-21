import axios from "axios";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const filterPosts = (posts, query) => {
  return posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
};

const fetchPosts = async query => {
  const [posts] = await Promise.all([
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(resp => filterPosts(resp.data, query)),
    sleep(3000)
  ]);
  return posts;
};

export default fetchPosts;
