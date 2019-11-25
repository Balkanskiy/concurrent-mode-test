import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import useStyles from "../../common/styles";

const Loading = () => {
  const styles = useStyles();
  return (
    <div className={styles.loading}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
