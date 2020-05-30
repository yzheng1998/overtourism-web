import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Map2ToolTip(props) {
  const { x, y, hoveredObject, hoveredLayer } = props;

  const useStyles = makeStyles({
    title: {
      color: "#FFFFFF",
      fontFamily: "Helvetica",
      fontSize: 12,
    },
    body: {
      color: "#FFFFFF",
      fontFamily: "Helvetica",
      fontSize: 10,
    },
  });

  const classes = useStyles();

  return hoveredObject ? (
    <div
      style={{
        backgroundColor: "rgba(46, 46, 46, 0.8)",
        padding: 8,
        position: "absolute",
        top: y,
        left: x,
      }}
    >
      {hoveredLayer === "stops" && (
        <>
          <Typography classes={{ root: classes.title }}>
            Transit Stop
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.stop_name}
          </Typography>
        </>
      )}
      {hoveredLayer === "transitLines" && (
        <>
          <Typography classes={{ root: classes.title }}>
            Transit Line
          </Typography>
        </>
      )}
      {hoveredLayer === "schools" && (
        <>
          <Typography classes={{ root: classes.title }}>School</Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.name}
          </Typography>
        </>
      )}
      {hoveredLayer === "groceries" && (
        <>
          <Typography classes={{ root: classes.title }}>
            Grocery Store
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.name}
          </Typography>
        </>
      )}
      {hoveredLayer === "landmarks" && (
        <>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.Name}
          </Typography>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
