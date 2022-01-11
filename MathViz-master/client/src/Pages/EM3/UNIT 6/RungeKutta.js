import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import simp from "./simpsons.svg";
import "./theory.css";
import "./runkutta.css"

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

export default function Simpsons() {
  const [loading, setLoading] = useState(false);
  const isVisible = true;
  const [fx, setFx] = useState();
  const [xLower, setXLower] = useState();
  const [xUpper, setXUpper] = useState();
  const [xn, setXn] = useState();
  const [partitions, setPartitions] = useState();
  const [run, setRun] = useState();
  const [table, setTable] = useState();

  useEffect(() => {
    document.title = "Simpsons: Enter the Integrand and its limits";
  });
  useEffect(() => {
    if (!isVisible) {
      setRun();
    }
  }, [isVisible]);
  const apiCall = () => {
    if (!isVisible) return;
    const data = {
      dy_dx: fx,
      x0: xLower,
      y0: xUpper,
      xn: xn,
      n: partitions,
    };
    console.log(JSON.stringify(data));
    if (
      fx !== undefined &&
      xLower !== undefined &&
      xUpper !== undefined &&
      xn !== undefined &&
      partitions !== undefined
    ) {
      setLoading(true);
      fetch("/api/rungeKutta/run", {
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
          setRun(URL.createObjectURL(imageBlob));
        });

      fetch("/api/rungeKutta/runtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => {
        r.json().then((response) => {
          setTable(response.Img);
          // console.log(response.img)
          // document.getElementById("tableid").innerHTML=response.img
        });
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="headingname">
          <h1>RungeKutta</h1>
        </div>
        <div className="theory">
          <p>
            {" "}
            In numerical integration, Simpson's rules are several approximations
            for definite integrals, named after Thomas Simpson (1710–1761). The
            most basic of these rules, called Simpson's 1/3rd rule, or just
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
              Enter f(x)(dy/dx) {" : "}
              <br/>
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
              Value of x{" "}
              <br/>
              <TextField
                label="Value of x"
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
            Value of y{" "}
            <br/>
              <TextField
                label="Value of y"
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
          <Item>
            <label>
              Value of x to evaluate y{" "}
              <br/>
              <TextField
                label="Value of x to evaluate y"
                variant="outlined"
                defaultValue={xUpper}
                onChange={(e) => {
                  if (e.target.value) {
                    setXn(Number(e.target.value));
                  } else {
                    setXn(undefined);
                  }
                }}
              />
            </label>
          </Item>
          <Item>
            <label>
              Partitions{" "}
              <br/>
              <TextField
                label="Partitions"
                variant="outlined"
                defaultValue={xUpper}
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
          {table && <Item className="tableitem">
          <center>
            <div
              className="table"
              id="tableid"
              dangerouslySetInnerHTML={{ __html: table }}
            ></div>
          </center>
          </Item>}
          <Item>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button onClick={apiCall}> Submit </Button>
            )}
          </Item>
        </div>
        {isVisible && (
          <div className="graph">
            {loading && <LinearProgress color="inherit" />}
            {run && (
              <img className="graphimg" src={run} alt="... loading "></img>
            )}
          </div>
        )}
      </div>
    </>
  );
}
