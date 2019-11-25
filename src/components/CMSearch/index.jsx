import React, { useState, useTransition, Suspense } from "react";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Results from "../CMResults";
import useStyles from "../../common/styles";
import Loading from "../Loading";

const Search = () => {
  const [query, setQuery] = useState("");
  const styles = useStyles();
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
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
          endAdornment={
            <InputAdornment position="end">
              {isPending && <CircularProgress color="black" size={12} />}
            </InputAdornment>
          }
        />
        {query && (
          <Suspense fallback={<Loading />}>
            <Results query={query} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Search;
