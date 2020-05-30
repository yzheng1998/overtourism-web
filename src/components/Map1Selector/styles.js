import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    marginLeft: 28,
  },
  paper: {
    height: "345px",
    position: "absolute",
    left: "20px",
    top: "20px",
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
  title: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  subtitle: {
    fontFamily: "Helvetica",
  },
  note: {
    fontFamily: "Helvetica",
    fontSize: 13,
    alignSelf: "center",
  },
  slider: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  sliderBox: {
    width: 200,
    backgroundColor: "green",
  },
  markLabel: {
    color: "#FFFFFF",
    fontFamily: "Helvetica",
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
