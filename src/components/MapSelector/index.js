import React from "react";
import { useStyles } from "./styles";
import {
  Drawer,
  List,
  ListItem,
  Divider,
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

function MapSelector(props) {
  const {
    onClose,
    layerIndex,
    showMapSelector,
    onSliderChange,
    onClick,
  } = props;
  const classes = useStyles();
  return (
    <Drawer
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
      classes={{ paper: classes.paper }}
      anchor="left"
      open={showMapSelector}
      onClose={onClose}
    >
      <List classes={{ root: classes.list }}>
        <Typography classes={{ root: classes.title }} variant="h6" gutterBottom>
          Population
        </Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="year-slider"
          step={1}
          value={layerIndex >= 0 && layerIndex < 3 ? layerIndex : null}
          valueLabelDisplay="off"
          marks={marks}
          onChange={onSliderChange}
          min={0}
          max={2}
          classes={{
            root: classes.root,
            markLabel: classes.markLabel,
            track: classes.trackPop,
            rail: classes.trackPop,
            thumb: classes.trackPop,
            mark: classes.trackPop,
          }}
        ></Slider>
        <ListItem button onClick={() => onClick(3)}>
          <Typography classes={{ root: classes.subtitle }}>
            Change (1991-2011)
          </Typography>
        </ListItem>
        <Divider classes={{ root: classes.divider }} />
        <Typography classes={{ root: classes.title }} variant="h6">
          Unoccupied Dwellings
        </Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="year-slider"
          step={1}
          value={layerIndex >= 4 && layerIndex < 7 ? layerIndex : null}
          valueLabelDisplay="off"
          marks={marksUOH}
          onChange={onSliderChange}
          min={4}
          max={6}
          classes={{
            root: classes.root,
            markLabel: classes.markLabel,
            track: classes.trackUOH,
            rail: classes.trackUOH,
            thumb: classes.trackUOH,
            mark: classes.trackUOH,
          }}
        ></Slider>
        <ListItem>
          <Typography
            classes={{ root: classes.subtitle }}
            onClick={() => onClick(7)}
          >
            Change (1991-2011)
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default MapSelector;
