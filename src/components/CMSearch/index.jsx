import React, { useState, Suspense } from "react";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "../CMResults";
import useStyles from "../../common/styles";

function Search() {
  const [query, setQuery] = useState("");
  const styles = useStyles();

  const handleQueryChange = event => setQuery(event.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          className={styles.input}
          label="Search"
          inputProps={{ "aria-label": "description" }}
          value={query}
          margin="normal"
          onChange={handleQueryChange}
        />
        <Suspense fallback={<CircularProgress color="primary" />}>
          <Results />
        </Suspense>
      </div>
    </div>
  );
}

export default Search;
