import posts from "../common/posts.js";

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
// export const filterPosts = (posts, query) => {
//   const filteredPosts = posts.filter(post =>
//     post.title.toLowerCase().includes(query.toLowerCase())
//   );
//
//   return filteredPosts;
// };

export const fetchPosts = query =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(
        posts.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 3000);
  });
