import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, Typography } from "@material-ui/core";
import Graph from "./Graph";

const useStyles = makeStyles({
  root: {
    width: "80%",
    marginLeft: 28,
  },
  backDrop: {
    backgroundColor: "transparent",
  },
});

function InfoMenu(props) {
  const { onClose, showMenu, clickedObject } = props;

  const classes = useStyles();

  const data =
    clickedObject && clickedObject.properties
      ? [
          {
            id: clickedObject.properties.OBJECTID,
            data: [
              { x: 1991, y: 300 },
              { x: 2001, y: 200 },
              { x: 2011, y: 150 },
            ],
          },
        ]
      : [
          {
            id: 0,
            data: [
              { x: 1991, y: 300 },
              { x: 2001, y: 200 },
              { x: 2011, y: 150 },
            ],
          },
        ];
  return (
    <Drawer
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
      anchor="right"
      open={showMenu}
      onClose={onClose}
    >
      <List
        style={{
          width: 300,
          height: "100vh",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <Typography style={{ marginBottom: 12 }}>
          Neighborhood: {clickedObject && clickedObject.properties.neighbourh}
        </Typography>
        <div style={{ height: "30vh" }}>
          <Graph data={data} />
        </div>
        <Typography style={{ marginBottom: 12 }}>
          Population: {clickedObject && clickedObject.properties.totPop} people
        </Typography>
        <Typography style={{ marginBottom: 12 }}>
          Population Density:{" "}
          {clickedObject && clickedObject.properties.pop_hec} people/hectare
        </Typography>
        <Typography style={{ marginBottom: 12 }}>
          Unoccupied Housing: {clickedObject && clickedObject.properties.uoh}{" "}
          homes
        </Typography>
        <Typography style={{ marginBottom: 12 }}>
          Unoccupied Housing Density:{" "}
          {clickedObject && clickedObject.properties.uoh_hec} homes/hectare
        </Typography>
        <Typography>TODO: Graph of trends</Typography>
        <Typography>between 1991, 2001, 2011</Typography>
      </List>
    </Drawer>
  );
}

export default InfoMenu;
