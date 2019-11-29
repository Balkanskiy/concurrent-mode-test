import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "../styles";

const Loading = () => {
  const styles = useStyles();
  return (
    <div className={styles.loading}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
