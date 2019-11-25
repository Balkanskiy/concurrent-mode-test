import React, { useEffect, useState } from "react";
import axios from "axios";

const SandBox = () => {
  const [data, setData] = useState([]);

  const fetchPosts = async () => {
    const result = await axios.get("/posts/data.json?q=est");
    setData(result.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return <div>{data.length}</div>;
};

export default SandBox;
