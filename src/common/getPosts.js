export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const filterPosts = (posts, query) => {
  return posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
};

// export const filterPosts = (posts, query) =>
//   new Promise(resolve => {
//     resolve(
//       posts.filter(post =>
//         post.title.toLowerCase().includes(query.toLowerCase())
//       )
//     );
//   });
