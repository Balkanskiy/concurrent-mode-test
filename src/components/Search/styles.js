import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "72px"
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
  }
}));
