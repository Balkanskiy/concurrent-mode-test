import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

const InputLoading = () => (
  <InputAdornment position="end">
    <CircularProgress color="primary" size={12} />
  </InputAdornment>
);

export default InputLoading;
