import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Slider,
} from "@material-ui/core";

const marks = [
  {
    value: 0,
    label: "1991",
  },
  {
    value: 1,
    label: "2001",
  },
  {
    value: 2,
    label: "2011",
  },
];

const marksUOH = [
  {
    value: 4,
    label: "1991",
  },
  {
    value: 5,
    label: "2001",
  },
  {
    value: 6,
    label: "2011",
  },
];

const useStyles = makeStyles({
  root: {
    width: "80%",
    marginLeft: 28,
  },
  backDrop: {
    backgroundColor: "transparent",
  },
});

function Menu(props) {
  const { onClose, showMap, showMenu, onSliderChange, onClick } = props;
  const classes = useStyles();
  return (
    <Drawer
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
      anchor="left"
      open={showMenu}
      onClose={onClose}
    >
      <List
        style={{
          width: 300,
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Population
        </Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="year-slider"
          step={1}
          value={showMap}
          valueLabelDisplay="off"
          marks={marks}
          onChange={onSliderChange}
          min={0}
          max={2}
          style={{
            width: 250,
            marginLeft: 20,
            marginTop: 10,
          }}
        ></Slider>
        <ListItem button onClick={() => onClick(3)}>
          <ListItemText primary="Change (1991-2011)"></ListItemText>
        </ListItem>
        <Typography variant="h6">Unocupied Dwellings</Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="year-slider"
          step={1}
          value={showMap}
          valueLabelDisplay="off"
          marks={marksUOH}
          onChange={onSliderChange}
          min={4}
          max={6}
          style={{
            width: 250,
            marginLeft: 20,
            marginTop: 10,
          }}
        ></Slider>
        <ListItem>
          <ListItemText
            primary="Change (1991-2011)"
            onClick={() => onClick(7)}
          ></ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Menu;
