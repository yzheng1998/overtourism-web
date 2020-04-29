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
        <Typography variant={"h6"}>
          Hexagon ID: {clickedObject && clickedObject.properties.Id}
        </Typography>
        <div style={{ height: "40vh" }}>
          <Graph data={data} label={"Population"} />
        </div>
        <Typography style={{ marginBottom: 12 }}>
          Population Change (1991-2011):{" "}
          {clickedObject && clickedObject.properties.pop_pchang}%
        </Typography>
        <div style={{ height: "40vh" }}>
          <Graph data={uohData} label={"Unoccupied Dwellings"} />
        </div>
        <Typography style={{ marginBottom: 12 }}>
          Unoccupied Housing Change (1991-2011):{" "}
          {clickedObject && clickedObject.properties.uoh_pchang}%
        </Typography>
      </List>
    </Drawer>
  );
}

export default InfoMenu;
