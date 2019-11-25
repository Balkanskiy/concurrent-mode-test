const express = require("express");
const cors = require("cors");
const data = require("./data.json");

const app = express();
const port = 9000;

app.use(cors());
app.get("/posts/data.json", (request, response) => {
  setTimeout(() => {
    const filteredData = data.filter(post =>
      post.title.toLowerCase().includes(request.query.q.toLowerCase())
    );
    response.send(filteredData);
  }, 3000);
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
