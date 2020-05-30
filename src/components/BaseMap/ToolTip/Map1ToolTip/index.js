import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Map1ToolTip(props) {
  const { x, y, hoveredObject, hoveredLayer, layerIndex } = props;

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
      {hoveredLayer !== "landmarks" && hoveredLayer !== "canal" && (
        <>
          {layerIndex === 1 && (
            <>
              <Typography classes={{ root: classes.title }}>
                Population
              </Typography>
              <Typography classes={{ root: classes.body }}>
                {Math.round(hoveredObject.properties.pop_91)}{" "}
                {Math.round(hoveredObject.properties.pop_91) === 1
                  ? "person"
                  : "people"}
              </Typography>
            </>
          )}
          {layerIndex === 2 && (
            <>
              <Typography classes={{ root: classes.title }}>
                Population
              </Typography>
              <Typography classes={{ root: classes.body }}>
                {Math.round(hoveredObject.properties.pop_01)}{" "}
                {Math.round(hoveredObject.properties.pop_01) === 1
                  ? "person"
                  : "people"}
              </Typography>
            </>
          )}
          {layerIndex === 3 && (
            <>
              <Typography classes={{ root: classes.title }}>
                Population
              </Typography>
              <Typography classes={{ root: classes.body }}>
                {Math.round(hoveredObject.properties.pop_11)}{" "}
                {Math.round(hoveredObject.properties.pop_11) === 1
                  ? "person"
                  : "people"}
              </Typography>
            </>
          )}
          {layerIndex === 4 && (
            <>
              <Typography classes={{ root: classes.title }}>
                Population Change
              </Typography>
              <Typography classes={{ root: classes.body }}>
                {hoveredObject.properties.pop_91 === 0
                  ? hoveredObject.properties.pop_11 === 0
                    ? "0"
                    : "-"
                  : Math.round(hoveredObject.properties.pop_pchang)}
                %
              </Typography>
            </>
          )}
          {layerIndex === 5 && (
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
          {layerIndex === 6 && (
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
          {layerIndex === 7 && (
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
          {layerIndex === 8 && (
            <>
              <Typography classes={{ root: classes.title }}>
                Unoccupied Dwellings Change
              </Typography>
              <Typography classes={{ root: classes.body }}>
                {hoveredObject.properties.uoh_91 === 0
                  ? hoveredObject.properties.uoh_11 === 0
                    ? "1"
                    : "-"
                  : Math.round(hoveredObject.properties.uoh_pchang)}
                %
              </Typography>
            </>
          )}
        </>
      )}
      {hoveredLayer === "landmarks" && (
        <>
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
