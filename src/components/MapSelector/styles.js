import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    width: "80%",
    marginLeft: 28,
  },
  paper: {
    height: "200px",
    marginLeft: "20px",
    marginTop: "20px",
    borderRadius: "12px",
    backgroundColor: "#2e2e2e",
    color: "#FFFFFF",
  },
  backDrop: {
    backgroundColor: "transparent",
  },
  list: {
    width: 300,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  typography: {
    fontFamily: "Futura",
  },
  slider: {
    width: 250,
    marginTop: 10,
  },
  markLabel: {
    color: "#FFFFFF",
    fontFamily: "Futura",
  },
  trackPop: {
    backgroundColor: "#EB7254",
  },
  trackUOH: {
    backgroundColor: "#87C17E",
  },
  divider: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginBottom: 10,
  },
});
