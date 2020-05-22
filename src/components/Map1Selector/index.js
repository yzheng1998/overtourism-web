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
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const marks = [
  {
    value: 1,
    label: "1991",
  },
  {
    value: 2,
    label: "2001",
  },
  {
    value: 3,
    label: "2011",
  },
];

const marksUOH = [
  {
    value: 5,
    label: "1991",
  },
  {
    value: 6,
    label: "2001",
  },
  {
    value: 7,
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

  const theme = createMuiTheme({
    overrides: {
      MuiSlider: {
        root: {
          width: "80%",
          marginLeft: 28,
        },
        track: {
          color: "#EB7254",
        },
        rail: { color: "#EB7254" },
        thumb: { color: "#EB7254" },
        markLabel: { color: "#FFFFFF", fontFamily: "Helvetica" },
        markLabelActive: { color: "#FFFFFF", fontFamily: "Helvetica" },
        mark: { color: "#EB7254" },
        markActive: { color: "#EB7254" },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
          <Typography
            classes={{ root: classes.title }}
            variant="h6"
            gutterBottom
          >
            Population
          </Typography>
          <Slider
            defaultValue={0}
            aria-labelledby="year-slider"
            step={1}
            value={layerIndex >= 1 && layerIndex < 4 ? layerIndex : null}
            valueLabelDisplay="off"
            marks={marks}
            onChange={onSliderChange}
            min={1}
            max={3}
          ></Slider>
          <ListItem button onClick={() => onClick(4)}>
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
            value={layerIndex >= 5 && layerIndex < 8 ? layerIndex : null}
            valueLabelDisplay="off"
            marks={marksUOH}
            onChange={onSliderChange}
            min={5}
            max={7}
          ></Slider>
          <ListItem>
            <Typography
              classes={{ root: classes.subtitle }}
              onClick={() => onClick(8)}
            >
              Change (1991-2011)
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

export default MapSelector;
