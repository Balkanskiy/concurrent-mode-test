export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const filterPosts = (posts, query) => {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return filteredPosts;
};

export const getUrl = query =>
  query
    ? "https://jsonplaceholder.typicode.com/posts?userId=1"
    : "https://jsonplaceholder.typicode.com/posts";

export const asyncFilterPosts = (posts, query) =>
  new Promise(resolve => {
    resolve(
      posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  });
