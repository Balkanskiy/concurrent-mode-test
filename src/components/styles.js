import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "72px 0"
  },
  search: {
    width: "100%",
    maxWidth: "360px",
    display: "flex",
    justifyContent: "flexStart",
    alignItems: "flexStart",
    flexFlow: "column nowrap"
  },
  input: {
    width: "100%"
  },
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "32px",
    boxSizing: "border-box"
  },
  noResults: {
    marginTop: "16px",
    padding: "32px"
  }
}));
