import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Map1ToolTip(props) {
  const { x, y, hoveredObject, layerIndex } = props;

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
      {layerIndex === 0 && (
        <>
          <Typography classes={{ root: classes.title }}>Population</Typography>
          <Typography classes={{ root: classes.body }}>
            {Math.round(hoveredObject.properties.pop_91)}{" "}
            {Math.round(hoveredObject.properties.pop_91) === 1
              ? "person"
              : "people"}
          </Typography>
        </>
      )}
      {layerIndex === 1 && (
        <>
          <Typography classes={{ root: classes.title }}>Population</Typography>
          <Typography classes={{ root: classes.body }}>
            {Math.round(hoveredObject.properties.pop_01)}{" "}
            {Math.round(hoveredObject.properties.pop_01) === 1
              ? "person"
              : "people"}
          </Typography>
        </>
      )}
      {layerIndex === 2 && (
        <>
          <Typography classes={{ root: classes.title }}>Population</Typography>
          <Typography classes={{ root: classes.body }}>
            {Math.round(hoveredObject.properties.pop_11)}{" "}
            {Math.round(hoveredObject.properties.pop_11) === 1
              ? "person"
              : "people"}
          </Typography>
        </>
      )}
      {layerIndex === 3 && (
        <>
          <Typography classes={{ root: classes.title }}>
            Population (Ratio of 1991)
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.pop_91 === 0
              ? hoveredObject.properties.pop_11 === 0
                ? "0"
                : "NaN"
              : hoveredObject.properties.pop_mult}
          </Typography>
        </>
      )}
      {layerIndex === 4 && (
        <>
          <Typography classes={{ root: classes.title }}>
            Unoccupied Dwellings
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {Math.round(hoveredObject.properties.uoh_91)} dwelling
            {Math.round(hoveredObject.properties.uoh_91) !== 1 && "s"}
          </Typography>
        </>
      )}
      {layerIndex === 5 && (
        <>
          <Typography classes={{ root: classes.title }}>
            Unoccupied Dwellings
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {Math.round(hoveredObject.properties.uoh_01)} dwelling
            {Math.round(hoveredObject.properties.uoh_01) !== 1 && "s"}
          </Typography>
        </>
      )}
      {layerIndex === 6 && (
        <>
          <Typography classes={{ root: classes.title }}>
            Unoccupied Dwellings
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {Math.round(hoveredObject.properties.uoh_11)} dwelling
            {Math.round(hoveredObject.properties.uoh_11) !== 1 && "s"}
          </Typography>
        </>
      )}
      {layerIndex === 7 && (
        <>
          <Typography classes={{ root: classes.title }}>
            Unoccupied Dwellings (Ratio of 1991)
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.uoh_91 === 0
              ? hoveredObject.properties.uoh_11 === 0
                ? "1"
                : "NaN"
              : hoveredObject.properties.uoh_mult}
          </Typography>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
