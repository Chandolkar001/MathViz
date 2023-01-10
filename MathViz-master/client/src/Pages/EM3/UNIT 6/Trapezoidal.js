// React and MUI
import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Skeleton } from "@mui/material";
import { Paper, LinearProgress, Button } from "@mui/material";
import { Toast } from "react-bootstrap";
import { Alert } from "@mui/material";

// File imports
import trape from "./trapezoidal.svg";
import "./theory.css";

var Latex = require("react-latex");

const P = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Item(props) {
  return (
    <P variant="outlined" style={{ margin: "15px" }} square>
      {props.children}
    </P>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Simpsons() {
  const [mode, setMode] = useState("select");
  const [graph1loading, setgraph1loading] = useState(false);
  const [graph2loading, setgraph2loading] = useState(false);
  const isVisible = mode !== "select" ? true : false;
  const [fx, setFx] = useState();
  const [xLower, setXLower] = useState();
  const [xUpper, setXUpper] = useState();
  const [partitions, setPartitions] = useState();
  const [showPartitions, setShowPartitions] = useState(false);
  const [resp, setResp] = useState();
  const [graphII, setGraphII] = useState();
  const [actual, setActual] = useState();
  const [calculated, setCalculated] = useState();
  const [rows, setRows] = useState([{ key: 1, one: null, two: null }]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Setting page title

  useEffect(() => {
    if (!isVisible) {
      setResp();
    }
  }, [isVisible]);

  useEffect(() => {
    document.title = "Trapezoidal";
  });
  const apiCall = () => {
    if (!isVisible) return;
    const data = {
      mode,
      fx,
      x_l: xLower,
      x_u: xUpper,
    };
    console.log(JSON.stringify(data));
    if (
      mode !== "select" &&
      fx !== undefined &&
      xLower !== undefined &&
      xUpper !== undefined
    ) {
      setgraph1loading(true);
      fetch("/api/trapezoidal/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((r) => {
          return r.blob();
        })
        .then((imageBlob) => {
          setgraph1loading(false);
          setResp(URL.createObjectURL(imageBlob));
          setShowPartitions(true);
        });
    }
  };

  const graph = () => {
    if (!isVisible) return;
    const data = {
      mode,
      fx,
      x_l: xLower,
      x_u: xUpper,
      partitions,
    };
    console.log(JSON.stringify(data));
    if (
      mode !== "select" &&
      fx !== undefined &&
      xLower !== undefined &&
      xUpper !== undefined
    ) {
      setgraph1loading(false);
      setgraph2loading(true);
      fetch("/api/trapezoidal/runGraphsII", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((r) => {
          return r.blob();
        })
        .then((imageBlob) => {
          setgraph2loading(false);
          setGraphII(URL.createObjectURL(imageBlob));
          setShowPartitions(true);
        });

      fetch("/api/trapezoidal/runtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => {
        r.json().then((response) => {
          setRows(response.a);
          setCalculated(response.area1);
          setActual(response.area2);
        });
      });
    }
  };
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  return (
    <Grid container spacing={2} sx={{ paddingInline: "15%" }}>
      <Grid item xs={12}>
        <h1>Trapezoidal Rule</h1>
      </Grid>
      <Grid item xs={12}>
        <p className="theory-text">
          {" "}
          <i>
            In Mathematics and more specifically in numerical analysis, the
            trapezoidal rule is a technique for approximating the definite
            integral.The trapezoid rule was in use in Babylon before 50 BCE for
            integrating the velocity of Jupiter along the ecliptic.
          </i>
          <br></br>
        </p>
      </Grid>

      <Grid item xs={12}>
        <center>
          <img src={trape} alt="formula" style={{ width: "50%" }} />
        </center>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <label>
            Enter mode as :{" "}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  setMode(e.target.value);
                }
              }}
              value={mode}
            >
              <option value="select">select</option>
              <option value="radian">radian</option>
              <option value="degrees">degrees</option>
            </select>
          </label>
        </Item>
      </Grid>

      <Grid item xs={12} sm={6}>
        {isVisible && (
          <>
            <Item>
              <Alert
                variant="outlined"
                severity="info"
                style={{ textAlign: "left" }}
              >
                <h5>Instructions</h5>
                {/* <ul> */}
                <li>
                  Enter an variable in the paranthesis "()". <br />
                  Ex. sin(x), cos(x)
                </li>
                <li>
                  For powering the function write (x)**a , <br /> where "a" is
                  the power
                </li>

                {/* </ul> */}
              </Alert>
            </Item>
            <Item>
              <Toast show={!showA} onClose={toggleShowA}>
                <Toast.Body>
                  <small>
                    <b>Enter the Integrand and the limits of integration</b>
                  </small>
                </Toast.Body>
              </Toast>
              <br />
              <label>
                Enter f(x) {" : "} &emsp;
                <TextField
                  label="f(x)"
                  variant="filled"
                  onChange={(e) => {
                    if (e.target.value) {
                      setFx(e.target.value);
                    }
                  }}
                  onClick={toggleShowA}
                />
                <br />
              </label>

              <br />
              <label>
                x lower limit {" : "}
                <TextField
                  label="x lower"
                  variant="filled"
                  defaultValue={xLower}
                  onChange={(e) => {
                    if (e.target.value) {
                      setXLower(Number(e.target.value));
                    } else {
                      setXLower(undefined);
                    }
                  }}
                />
              </label>
              <br />
              <br />
              <label>
                x upper limit {" : "}
                <TextField
                  label="x upper"
                  variant="filled"
                  defaultValue={xUpper}
                  onChange={(e) => {
                    if (e.target.value) {
                      setXUpper(Number(e.target.value));
                    } else {
                      setXUpper(undefined);
                    }
                  }}
                />
              </label>
              <br />
              <br />
              {/* {graph1loading ? (
                setgraph2loading(false);
                <CircularProgress />
              ) : (
                <Button onClick={apiCall}> Submit </Button>
              )} */}
              <Button onClick={apiCall}> Submit </Button>
            </Item>
            {showPartitions && (
              <Item>
                <Alert
                  variant="outlined"
                  severity="info"
                  style={{ textAlign: "left" }}
                >
                  <h5>Instructions</h5>
                  <li>Please enter even number of partitions</li>
                </Alert>
                <label>
                  <br></br>
                  partitions{" "}
                  <TextField
                    label="partitions(even)"
                    variant="filled"
                    defaultValue={partitions}
                    onChange={(e) => {
                      if (e.target.value) {
                        setPartitions(Number(e.target.value));
                      } else {
                        setPartitions(undefined);
                      }
                    }}
                  />
                  <br />
                  <br />
                  <Button onClick={graph}> Submit </Button>
                </label>
              </Item>
            )}

            {graph2loading && (
              <>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={470}
                  height={850}
                />
                <br />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={470}
                  height={200}
                />
              </>
            )}
            {graphII && (
              <Item>
                {graphII && (
                  <p
                    className="steptheory"
                  >{`Above curve will be approximated by ${partitions} straight lines
                                      and the area bounded by it, will be approximated by ${partitions}  Trapeziums`}</p>
                )}
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Latex>$$x$$</Latex>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Latex>$$y$$</Latex>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? rows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : rows
                      ).map((row) => (
                        <TableRow key={row.key}>
                          <TableCell style={{ width: 100 }} align="left">
                            {row.one}
                          </TableCell>
                          <TableCell style={{ width: 100 }} align="left">
                            {row.two}
                          </TableCell>
                        </TableRow>
                      ))}

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={3} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          align="left"
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={3}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Item>
            )}
            {(actual || calculated) && (
              <Item>
                <p className="steptheoryred">
                  For better approximation increase the number of partitions
                </p>
                <hr />
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Actual Area</TableCell>
                        <TableCell align="center">{actual}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">Calculated Area</TableCell>
                        <TableCell align="center">{calculated}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Item>
            )}
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        {isVisible && (
          <div className="graph">
            {graph1loading && (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={500}
                height={500}
              />
            )}

            {resp && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{ fontSize: "15px", textAlign: "center" }}
                >{`Area  bounded  by  the  curve  y=${fx}  above  x−axis  and  between  the  vertial  lines  x=${xLower}  and  x=${xUpper}`}</p>
                <center>
                <img
                  className="styledimg"
                  src={resp}
                  alt="... loading "
                ></img>
                </center>
                {graph2loading && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={500}
                    height={500}
                  />
                )}
                {graphII && (
                  <div style={{marginTop: '15px'}}>
                    {/* <hr /> */}
                    <p
                      style={{ textAlign: "center", marginTop: "2%" }}
                    >{`${partitions}  Trapeziums  approximating  the  required  Area`}</p>
                   <center>
                   <img
                      className="styledimg"
                      src={graphII}
                      alt="... loading "
                    ></img>
                   </center>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Grid>
    </Grid>
  );
}

//  <Item>
//   {showPartitions && (
//     <TableContainer component={Paper}>
//       <Table aria-label='simple table' sx={{ height: '400px' }}>
//         <TableHead>
//           <TableRow>
//             <TableCell align='center'>x</TableCell>
//             <TableCell align='center'>y</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody style={{ height: '300px' }}>
//           {rows.map((row) => (
//             <TableRow key={row.key}>
//               <TableCell component='th' scope='row' align='center'>
//                 {row.one}
//               </TableCell>
//               <TableCell align='center'>{row.two}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )}
// </Item>
//
