import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Map6ToolTip(props) {
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
      {hoveredLayer === "tourismIndex" && (
        <>
          <Typography classes={{ root: classes.title }}>
            Tourism Index
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.tourism_sc.toFixed(2)}
          </Typography>
        </>
      )}
      {hoveredLayer === "landmarks" && (
        <>
          <Typography classes={{ root: classes.title }}>Landmark</Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.Name}
          </Typography>
        </>
      )}
      {hoveredLayer === "canal" && (
        <>
          <Typography classes={{ root: classes.title }}>Grand Canal</Typography>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
