import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, Typography } from "@material-ui/core";
import Graph from "./Graph";

const useStyles = makeStyles({
  backDrop: {
    backgroundColor: "transparent",
  },
  paper: {
    backgroundColor: "#2e2e2e",
  },
  list: {
    width: 300,
    height: "100vh",
    marginLeft: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  typography: {
    color: "#FFFFFF",
    fontFamily: "Helvetica",
    fontSize: 14,
  },
  graphTitle: {
    marginTop: 15,
    color: "#FFFFFF",
    alignSelf: "center",
    fontFamily: "Helvetica",
    fontSize: 18,
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
              { x: 1991, y: clickedObject.properties.pop_91 },
              { x: 2001, y: clickedObject.properties.pop_01 },
              { x: 2011, y: clickedObject.properties.pop_11 },
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

  const uohData =
    clickedObject && clickedObject.properties
      ? [
          {
            id: clickedObject.properties.OBJECTID,
            data: [
              { x: 1991, y: clickedObject.properties.uoh_91 },
              { x: 2001, y: clickedObject.properties.uoh_01 },
              { x: 2011, y: clickedObject.properties.uoh_11 },
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
      classes={{
        paper: classes.paper,
      }}
      anchor="right"
      open={showMenu}
      onClose={onClose}
    >
      <List classes={{ root: classes.list }}>
        <Typography variant={"h6"} classes={{ root: classes.typography }}>
          Hexagon ID: {clickedObject && clickedObject.properties.Id}
        </Typography>
        <Typography classes={{ root: classes.graphTitle }}>
          Population
        </Typography>
        <div style={{ height: "40vh" }}>
          <Graph data={data} label={"Population"} color={"#EB7254"} />
        </div>
        <Typography classes={{ root: classes.typography }}>
          Population Change (1991-2011):{" "}
          {clickedObject && clickedObject.properties.pop_pchang}%
        </Typography>
        <Typography classes={{ root: classes.graphTitle }}>
          Unoccupied Dwellings
        </Typography>
        <div style={{ height: "40vh" }}>
          <Graph
            data={uohData}
            label={"Unoccupied Dwellings"}
            color={"#87C17E"}
          />
        </div>
        <Typography
          classes={{ root: classes.typography }}
          style={{ marginBottom: 20 }}
        >
          Unoccupied Dwellings Change (1991-2011):{" "}
          {clickedObject && clickedObject.properties.uoh_pchang}%
        </Typography>
      </List>
    </Drawer>
  );
}

export default InfoMenu;
