const express = require("express");
const cors = require("cors");
const data = require("./data.json");

const app = express();
const port = 9000;

app.use(cors());
app.get("/posts/data.json", (request, response) => {
  setTimeout(() => {
    const searchQuery = request.query.q;
    const filteredData = searchQuery
      ? data.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
    response.send(filteredData);
  }, 1000);
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
