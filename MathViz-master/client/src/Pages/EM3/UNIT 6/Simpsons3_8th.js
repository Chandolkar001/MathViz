import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import simp from "./simpsons3_8th.svg";
import "./theory.css";

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

export default function Simpsons3_8th() {
  const [mode, setMode] = useState("select");
  const [loading, setLoading] = useState(false);
  const isVisible = mode !== "select" ? true : false;
  const [fx, setFx] = useState();
  const [xLower, setXLower] = useState();
  const [xUpper, setXUpper] = useState();
  const [partitions, setPartitions] = useState();
  const [showPartitions, setShowPartitions] = useState(false);
  const [resp, setResp] = useState();
  const [actual, setActual] = useState();
  const [calculated, setCalculated] = useState();
  const [rows, setRows] = useState([
    { key: 1, one: null, two: null },
    { key: 2, one: null, two: null },
    { key: 3, one: null, two: null },
    { key: 4, one: null, two: null },
  ]);

  useEffect(() => {
    document.title = "Simpsons: Enter the Integrand and its limits";
  });
  useEffect(() => {
    if (!isVisible) {
      setResp();
    }
  }, [isVisible]);
  const apiCall = () => {
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
      setLoading(true);
      fetch("/api/simpsons/run", {
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

      fetch("/api/simpsons38/runtable", {
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
  return (
    <>
      <div className="container">
        <div className="headingname">
          <h1>Simpsons 3/8th Rule</h1>
        </div>
        <div className="theory">
          <p>
            {" "}
            In numerical integration, Simpson's rules are several approximations
            for definite integrals, named after Thomas Simpson (1710–1761). The
            most basic of these rules, called Simpson's 3/8 rule, or just
            Simpson's rule, reads
            <br></br>
          </p>
          <center>
            <img src={simp} alt="formula" />
          </center>
        </div>
      </div>
      <div className="container calculationbox">
        <div className="inputboxes">
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
          {isVisible && (
            <>
              <Item>
                <label>
                  Enter f(x) {" : "}
                  <TextField
                    label="f(x)"
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
                  x lower limit{" "}
                  <TextField
                    label="x lower"
                    variant="outlined"
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
              </Item>
              <Item>
                <label>
                  x upper limit{" "}
                  <TextField
                    label="x upper"
                    variant="outlined"
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
              </Item>
              {showPartitions && (
                <Item>
                  <label>
                    partitions{" "}
                    <TextField
                      label="partitions(multiple of 3)"
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
              )}
              <Item>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button onClick={apiCall}> Submit </Button>
                )}
              </Item>
              <Item>
                {showPartitions && (
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">x</TableCell>
                          <TableCell align="center">y</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
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
                )}
              </Item>
              {(actual || calculated) && 
              <Item>
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
            </Item>}
            </>
          )}
        </div>
        {isVisible && (
          <div className="graph">
            {loading && <LinearProgress color="inherit" />}
            {resp && (
              <img className="graphimg" src={resp} alt="... loading "></img>
            )}
          </div>
        )}
      </div>
    </>
  );
}
