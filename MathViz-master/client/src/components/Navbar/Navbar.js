import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from '@mui/material';

import MoreIcon from "@mui/icons-material/MoreVert";
import { Switch, Link, Route } from "react-router-dom";
import { Grid } from "@mui/material";

import "./Navbar.css";
import Home from "../../Pages/Home/Home";
import EM1 from "../../Pages/EM1/EM1";
import EM2 from "../../Pages/EM2/EM2";
import EM3 from "../../Pages/EM3/EM3";
import Simpsons from "../../Pages/EM3/UNIT 6/Simpsons";
import Simpsons3_8th from "../../Pages/EM3/UNIT 6/Simpsons3_8th";
import TrapezoidalRule from "../../Pages/EM3/UNIT 6/Trapezoidal";
import NewtonsF from "../../Pages/EM3/UNIT 6/NewtonsF";
import NewtonsB from "../../Pages/EM3/UNIT 6/NewtonsB";
import Eulers from "../../Pages/EM3/UNIT 6/Eulers";
import ModifiedEuler from "../../Pages/EM3/UNIT 6/modifiedEuler";
import RungeKutta from "../../Pages/EM3/UNIT 6/RungeKutta";
import { Paper, CircularProgress, LinearProgress, Button } from "@mui/material";

const P = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Item(props) {
  return (
    <P variant="outlined" style={{ margin: "2px"}} square>
      {props.children}
    </P>
  );
}
const pages = [
  {
    key: 1,
    name: "Simpsons 1/3 Rule",
    link: "/simpsons",
  },
  {
    key: 3,
    name: "Simpsons 3/8 rule",
    link: "/simpsons3_8th",
  },
  {
    key: 4,
    name: "Trapezoidal",
    link: "/trapezoidal",
  },
  {
    key: 5,
    name: "Newton's Forward",
    link: "/newtonsf",
  },
  {
    key: 6,
    name: "Newton's Backward",
    link: "/newtonsb",
  },
  {
    key: 7,
    name: "Euler's",
    link: "/eulers",
  },
  {
    key: 8,
    name: "Modified Euler's",
    link: "/modifiedEulers",
  },
  {
    key: 9,
    name: "RungeKutta",
    link: "/rungekutta",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      color="black"
    >
      <MenuItem>
        <Link className="heading-comp" to="/EM1">
          EM-1
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="heading-comp" to="/EM2">
          EM-2
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="heading-comp" to="/EM3">
          EM-3
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link className="heading-comp" to="/EM1">
          EM-1
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="heading-comp" to="/EM2">
          EM-2
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className="heading-comp" to="/EM3">
          EM-3
        </Link>
      </MenuItem>
    </Menu>
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="inherit"
          sx={{
            boxShadow: "10px 10px 10px black ",
            zIndex: 100,
          }}
        >
          <Toolbar
            sx={{
              boxShadow: "0 0 0 white",
              backgroundColor: "grey",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                textAlign: "center",
              }}
            >
              <h1 className="heading-navbar">
                <span>M</span>aths<span>W</span>iz
              </h1>
            </Link>
          </Toolbar>

          <Toolbar
            color="primary"
            sx={{
              display: { xs: "flex", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Link className="heading-comp" to="/EM1">
                EM-1
              </Link>

              <Link className="heading-comp" to="/EM2">
                EM-2
              </Link>

              <Link className="heading-comp" to="/EM3">
                EM-3
              </Link>
            </Box>

            <Box
              sx={{
                display: { xs: "flex", sm: "flex" },
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Search
                sx={{ backgroundColor: "#f2f2f2" }}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                >
                  <MoreIcon style={{ color: "black" }} />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <Container fixed>
      <Box
        component="span"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {pages
          .filter((val) => {
            if (searchTerm === "") {
              return null;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((topic) => (
            <>
              <div style={{display: 'flex', justifyContent: 'flex-end',}}>
              <Grid item xs={4}  style={{borderRadius: '10px'}}>
                <div>
                 <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textAlign: "center",
                    }}
                    to={topic.link}
                    onClick={()=>setSearchTerm("")}
                    >
                    <Item>
                    {topic.name}
                </Item>
                  </Link>
                </div>
              </Grid>
              </div>
            </>
          ))}
      </Box>
      </Container>
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
    </div>
  );
}
