import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "80%",
    marginLeft: 28
  },
  backDrop: {
    backgroundColor: "transparent"
  }
});

function InfoMenu(props) {
  const { onClose, showMenu, clickedObject } = props;
  const classes = useStyles();
  return (
    <Drawer
      BackdropProps={{
        classes: {
          root: classes.backDrop
        }
      }}
      anchor="right"
      open={showMenu}
      onClose={onClose}
    >
      <List
        style={{
          width: 300,
          marginLeft: 20,
          marginTop: 20
        }}
      >
        <Typography style={{ marginBottom: 12 }}>
          Neighborhood: {clickedObject && clickedObject.properties.neighbourh}
        </Typography>
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
