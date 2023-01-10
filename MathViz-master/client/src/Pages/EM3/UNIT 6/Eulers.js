import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./theory.css";
import "./eul2.css";
import eul from "./euler.svg";

import { Paper, CircularProgress, LinearProgress, Button } from "@mui/material";

const P = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Item(props) {
  return (
    <P variant="outlined" square>
      {props.children}
    </P>
  );
}

export default function Eulers() {
  //const [mode, setMode] = useState("select");
  const [loading, setLoading] = useState(false);
  // const isVisible = mode !== "select" ? true : false;
  const [fx, setFx] = useState();
  const [xintial, setXintial] = useState();
  const [yintial, setYintial] = useState();
  const [xinput, setXinput] = useState();
  const [partitions, setPartitions] = useState();
  const [showPartitions, setShowPartitions] = useState(false);
  const [resp, setResp] = useState();
  const [actual, setActual] = useState();
  const [calculated, setCalculated] = useState();
  const [rows1, setRows1] = useState([
    { key: 1, one: null, two: null, three: null, four: null },
    { key: 2, one: null, two: null, three: null, four: null },
    { key: 3, one: null, two: null, three: null, four: null },
    { key: 4, one: null, two: null, three: null, four: null },
  ]);
  const [rows2, setRows2] = useState([
    { key: 1, one: null, two: null },
    { key: 2, one: null, two: null },
    { key: 3, one: null, two: null },
    { key: 4, one: null, two: null },
  ]);

  useEffect(() => {
    document.title = "EULERS: ENTER DIFFERENTIAL EQUATION";
  });
  // useEffect(() => {
  //   if (!isVisible) {
  //     setResp();
  //   }
  // }, [isVisible]);
  const apiCall = () => {
    //if (!isVisible) return;
    const data = {
      // mode,
      fx,
      x0: xintial,
      y0: yintial,
      xn: xinput,
      partitions,
    };
    console.log(JSON.stringify(data));
    if (
      //mode !== "select" &&
      fx !== undefined &&
      xintial !== undefined &&
      yintial !== undefined &&
      xinput !== undefined &&
      partitions !== undefined
    ) {
      setLoading(true);
      fetch("/api/eulers/run", {
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
          setLoading(false);
          setResp(URL.createObjectURL(imageBlob));
          setShowPartitions(true);
        });

      fetch("/api/eulers/runtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => {
        r.json().then((response) => {
          setRows1(response.table1);
          setRows2(response.table2);
          setCalculated(response.area1);
          setActual(response.area2);
        });
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="headingname">
          <h1>EULERS</h1>
        </div>
        <div className="theory">
          <p>
            In mathematics and computational science, the Euler method (also
            called forward Euler method) is a first-order numerical procedure
            for solving ordinary differential equations (ODEs) with a given
            initial value. The Euler method is named after Leonhard Euler, who
            treated it in his book Institutionum calculi integralis (published
            1768–1870). The Euler method is a first-order method, which means
            that the local error (error per step) is proportional to the square
            of the step size, and the global error (error at a given time) is
            proportional to the step size. The Euler method often serves as the
            basis to construct more complex methods.
            <br></br>
          </p>
          <center>
            <img src={eul} alt="formula" />
          </center>
        </div>
      </div>
      <div className="container calculationbox">
        <div className="inputboxes">
          {
            //isVisible &&
            <>
              <Item>
                <label>
                  Enter dY/dX {" : "}
                  <br />
                  <TextField
                    label="dY/dX"
                    variant="outlined"
                    onChange={(e) => {
                      if (e.target.value) {
                        setFx(e.target.value);
                      }
                    }}
                  />
                </label>
              </Item>
              <Item>
                <label>
                  initial value of X <br />
                  <TextField
                    label="x intial"
                    variant="outlined"
                    defaultValue={xintial}
                    onChange={(e) => {
                      if (e.target.value) {
                        setXintial(Number(e.target.value));
                      } else {
                        setXintial(undefined);
                      }
                    }}
                  />
                </label>
              </Item>
              <Item>
                <label>
                  Y intial <br />
                  <TextField
                    label="y initial"
                    variant="outlined"
                    defaultValue={yintial}
                    onChange={(e) => {
                      if (e.target.value) {
                        setYintial(Number(e.target.value));
                      } else {
                        setYintial(undefined);
                      }
                    }}
                  />
                </label>
              </Item>
              <Item>
                <label>
                  X at which y is evaluated <br />
                  <TextField
                    label="x input "
                    variant="outlined"
                    defaultValue={xinput}
                    onChange={(e) => {
                      if (e.target.value) {
                        setXinput(Number(e.target.value));
                      } else {
                        setXinput(undefined);
                      }
                    }}
                  />
                </label>
              </Item>
              {
                //showPartitions &&
                <Item>
                  <label>
                    partitions <br />
                    <TextField
                      label="partitions"
                      variant="outlined"
                      defaultValue={partitions}
                      onChange={(e) => {
                        if (e.target.value) {
                          setPartitions(Number(e.target.value));
                        } else {
                          setPartitions(undefined);
                        }
                      }}
                    />
                  </label>
                </Item>
              }
              <Item>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button onClick={apiCall}> Submit </Button>
                )}
              </Item>
              {showPartitions && (
                <Item>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            (x<sub>i</sub> ,y<sub>i</sub>)
                          </TableCell>
                          <TableCell align="center">m= dy/dx</TableCell>
                          <TableCell align="center">
                            θ =tan<sup>-1</sup>(m)
                          </TableCell>
                          <TableCell align="center">
                            y<sub>i+1</sub>=y<sub>i</sub> + hf(x<sub>i</sub>,y
                            <sub>i</sub>)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows1.map((row) => (
                          <TableRow
                            key={row.key}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {row.one}
                            </TableCell>
                            <TableCell align="center">{row.two}</TableCell>
                            <TableCell align="center">{row.three}</TableCell>
                            <TableCell align="center">{row.four}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
              )}
              {showPartitions && (
                <Item className="tableitem">
                  <TableContainer component={Paper}>
                    <Table
                      className="table"
                      id="tableid"
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            x<sub>i</sub>
                          </TableCell>
                          <TableCell align="center">
                            y<sub>i</sub>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows2.map((row) => (
                          <TableRow
                            key={row.key}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {row.one}
                            </TableCell>
                            <TableCell align="center">{row.two}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
              )}

              {actual ||
                (calculated && (
                  <Item>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Y actual</TableCell>
                            <TableCell align="center">{actual}</TableCell>
                            <TableCell align="center">Y calculated</TableCell>
                            <TableCell align="center">{calculated}</TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Item>
                ))}
            </>
          }
        </div>
        {
          <div className="graph">
            {loading && <LinearProgress color="inherit" />}
            {resp && (
              <img className="graphimg" src={resp} alt="... loading "></img>
            )}
          </div>
        }
      </div>
    </>
  );
}
