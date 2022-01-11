import * as React from "react";
import { styled } from "@mui/material/styles";
// import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Switch, Link, Route } from "react-router-dom";

import Home from "../../Pages/Home/Home";
import EM1 from "../../Pages/EM1/EM1";
import EM2 from "../../Pages/EM2/EM2";
import EM3 from "../../Pages/EM3/EM3";
import Simpsons from "../../Pages/EM3/UNIT 6/Simpsons";
import Simpsons3_8th from "../../Pages/EM3/UNIT 6/Simpsons3_8th";
import TrapezoidalRule from "../../Pages/EM3/UNIT 6/Trapezoidal";
import "./drawer.css";
import NewtonsF from "../../Pages/EM3/UNIT 6/NewtonsF";
import NewtonsB from "../../Pages/EM3/UNIT 6/NewtonsB";
import Eulers from "../../Pages/EM3/UNIT 6/Eulers";
import ModifiedEuler from "../../Pages/EM3/UNIT 6/modifiedEuler";
import RungeKutta from "../../Pages/EM3/UNIT 6/RungeKutta";
// Convert <a> to Link

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PersistentDrawerLeft() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  // setOpen(true);
  // };
  const [unit1, setunit1] = React.useState(false);
  const [unit2, setunit2] = React.useState(false);
  const [unit3, setunit3] = React.useState(false);
  const [unit4, setunit4] = React.useState(false);
  const [unit5, setunit5] = React.useState(false);
  const [unit6, setunit6] = React.useState(false);

  const handleClick1 = () => {
    setunit1(!unit1);
  };
  const handleClick2 = () => {
    setunit2(!unit2);
  };
  const handleClick3 = () => {
    setunit3(!unit3);
  };
  const handleClick4 = () => {
    setunit4(!unit4);
  };
  const handleClick5 = () => {
    setunit5(!unit5);
  };
  const handleClick6 = () => {
    setunit6(!unit6);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "hidden",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        color="inherit"
        sx={{
          boxShadow: "0 0 0 white",
        }}
      >
        <Toolbar
          sx={{
            boxShadow: "0 0 0 white",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }), color: "black" }}
          >
            <MenuIcon style={{ fontSize: 30 }} />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              style={{ textDecoration: "none", color: "black" }}
            >
              MathsWiz
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        className="boxdrawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          textAlign: "center",
          fontWeight: 900,
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        hideBackdrop={true}
        transitionDuration={200}
      >
        <DrawerHeader
          sx={{ backgroundColor: "black", color: "white", textAlign: "center" }}
          onClick={handleDrawerClose}
        >
          <Typography
            sx={{
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              width: "100vw",
            }}
          >
            CLOSE
          </Typography>
        </DrawerHeader>

        <Accordion className="accordian" style={{scrollbarWidth: 0}}>
          {/* <Link to="/EM1" style={{ textDecoration: "none", color: "black" }}> */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              EM-1
            </AccordionSummary>
          {/* </Link> */}
          <AccordionDetails className="accordianlist">
            <Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClick1}>
                  <ListItemText primary="UNIT 1" />
                  {unit1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick2}>
                  <ListItemText primary="UNIT 2" />
                  {unit2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick3}>
                  <ListItemText primary="UNIT 3" />
                  {unit3 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit3} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick4}>
                  <ListItemText primary="UNIT 4" />
                  {unit4 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit4} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick5}>
                  <ListItemText primary="UNIT 5" />
                  {unit5 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit5} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick6}>
                  <ListItemText primary="UNIT 6" />
                  {unit6 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit6} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          {/* <Link to="/EM2" style={{ textDecoration: "none", color: "black" }}> */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              EM-2
            </AccordionSummary>
          {/* </Link> */}
          <AccordionDetails>
            <Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClick1}>
                  <ListItemText primary="UNIT 1" />
                  {unit1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick2}>
                  <ListItemText primary="UNIT 2" />
                  {unit2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick3}>
                  <ListItemText primary="UNIT 3" />
                  {unit3 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit3} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick4}>
                  <ListItemText primary="UNIT 4" />
                  {unit4 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit4} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick5}>
                  <ListItemText primary="UNIT 5" />
                  {unit5 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit5} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick6}>
                  <ListItemText primary="UNIT 6" />
                  {unit6 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit6} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          {/* <Link to="/EM3" style={{ textDecoration: "none", color: "black" }}> */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              EM-3
            </AccordionSummary>
          {/* </Link> */}
          <AccordionDetails>
            <Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClick1}>
                  <ListItemText primary="UNIT 1" />
                  {unit1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick2}>
                  <ListItemText primary="UNIT 2" />
                  {unit2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick3}>
                  <ListItemText primary="UNIT 3" />
                  {unit3 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit3} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick4}>
                  <ListItemText primary="UNIT 4" />
                  {unit4 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit4} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick5}>
                  <ListItemText primary="UNIT 5" />
                  {unit5 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit5} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="TOPIC NAME" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleClick6}>
                  <ListItemText primary="UNIT 6" />
                  {unit6 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={unit6} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link
                      to="/simpsons"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Simpson's 1/3rd" />
                      </ListItemButton>
                    </Link>
                    <Link
                      to="/simpsons3_8th"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Simpson's 3/8th" />
                      </ListItemButton>
                    </Link>
                    <Link
                      to="/trapezoidal"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Trapezoidal" />
                      </ListItemButton>
                    </Link>
                    <Link
                      to="/newtonsf"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Newton's Forward" />
                      </ListItemButton>
                    </Link>
                    <Link
                      to="/newtonsb"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Newton's Backward" />
                      </ListItemButton>
                    </Link>
                    <Link
                      to="/eulers"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Eulers" />
                      </ListItemButton>
                    </Link>
                    <Link
                      to="/modifiedEulers"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Modified Eulers" />
                      </ListItemButton>
                    </Link>
                    <Link
                      to="/rungekutta"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="RungeKutta" />
                      </ListItemButton>
                    </Link>
                  </List>
                </Collapse>
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/simpsons" exact component={Simpsons} />
          <Route path="/simpsons3_8th" exact component={Simpsons3_8th} />
          <Route path="/trapezoidal" exact component={TrapezoidalRule} />
          <Route path="/newtonsf" exact component={NewtonsF} />
          <Route path="/newtonsb" exact component={NewtonsB} />
          <Route path="/eulers" exact component={Eulers} />
          <Route path="/modifiedEulers" exact component={ModifiedEuler} />
          <Route path="/rungekutta" exact component={RungeKutta} />
          <Route path="/EM1" exact component={EM1} />
          <Route path="/EM2" exact component={EM2} />
          <Route path="/EM3" exact component={EM3} />
        </Switch>
      </Main>
    </Box>
  );
}

export default PersistentDrawerLeft;
