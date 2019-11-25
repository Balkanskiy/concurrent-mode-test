import React, { useState, useTransition, Suspense } from "react";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "../CMResults";
import useStyles from "../../common/styles";

const Search = () => {
  const [query, setQuery] = useState("");
  const styles = useStyles();
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000
  });

  const handleQueryChange = event => {
    startTransition(() => {
      setQuery(event.target.value);
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
        />
        {isPending ? " Loading..." : null}
        {query && (
          <Suspense fallback={<CircularProgress color="primary" />}>
            <Results query={query} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Search;
