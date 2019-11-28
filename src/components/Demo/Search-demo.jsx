import React, { useState, useTransition, Suspense } from "react";
import axios from "axios";
import Input from "@material-ui/core/Input";
import Results from "./Results-demo";
import Loading from "../Loading";
import useStyles from "../../common/styles";
import { unstable_createResource as createResource } from "react-cache";
import InputLoading from "../InputLoading";
import debounce from "awesome-debounce-promise";

const search = async query => await axios.get(`/posts/data.json?q=${query}`);
const debouncedSearch = debounce(search, 500);

const fetchPosts = query =>
  createResource(async () => {
    if (query) {
      const { data } = await debouncedSearch(query);
      return data;
    }
  });

function Search() {
  const styles = useStyles();
  const [query, setQuery] = useState("");
  const [resource, setResource] = useState(fetchPosts());
  // Wait 3 seconds before fallback
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  const handleQueryChange = event => {
    setQuery(event.target.value);
    startTransition(() => {
      setResource(fetchPosts(event.target.value));
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          className={styles.input}
          label="Search"
          inputProps={{ "aria-label": "description" }}
          value={query}
          onChange={handleQueryChange}
          endAdornment={isPending && <InputLoading />}
        />
        {query && (
          <Suspense fallback={<Loading />}>
            <Results resource={resource} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Search;
