import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Map3ToolTip(props) {
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
      {hoveredLayer === "maskShops" && (
        <>
          <Typography classes={{ root: classes.title }}>Mask Shop</Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.name}
          </Typography>
        </>
      )}
      {hoveredLayer === "designerStores" && (
        <>
          <Typography classes={{ root: classes.title }}>
            Designer Stores
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.name}
          </Typography>
        </>
      )}
      {hoveredLayer === "jewelryShops" && (
        <>
          <Typography classes={{ root: classes.title }}>
            Jewelry Shop
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.name}
          </Typography>
        </>
      )}
      {hoveredLayer === "restaurants" && (
        <>
          <Typography classes={{ root: classes.title }}>Restaurant</Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.name}
          </Typography>
          <Typography classes={{ root: classes.body }}>
            Internationality:{" "}
            {hoveredObject && hoveredObject.properties && hoveredObject.properties.composite_ital_3 ? hoveredObject.properties.composite_ital_3.toFixed(2) : ""}
          </Typography>
        </>
      )}
      {hoveredLayer === "airbnb" && (
        <>
          <Typography classes={{ root: classes.title }}>AirBnb</Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.name}
          </Typography>
          <Typography classes={{ root: classes.body }}>
            {hoveredObject.properties.beds} beds
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
