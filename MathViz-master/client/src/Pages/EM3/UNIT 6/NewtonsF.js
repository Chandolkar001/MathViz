import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import newf from "./newf.png";
import "./theory.css";
import "./newf.css";

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

export default function NewtonsF() {
  const [loading, setLoading] = useState(false);
  const isVisible = true;
  const [x0, setx] = useState();
  const [y0, setY] = useState();
  const [xc, setXc] = useState();
  const [showxc, setShowxc] = useState(false);
  const [showrun, setShowrun] = useState(true);
  const [valueY, setValueY] = useState();
  // const [showPartitions, setShowPartitions] = useState(false);
  const [run, setRun] = useState();
  const [runtable, setRuntable] = useState();
  const [table, setTable] = useState();

  useEffect(() => {
    document.title = "Newtons Forward Interpolation";
  });
  useEffect(() => {
    if (!isVisible) {
      // setRun();
      setRuntable();
      setTable();
    }
  }, [isVisible]);
  const apiCall = () => {
    if (!isVisible) return;
    const data = {
      x0,
      y0,
      xc,
    };
    console.log(JSON.stringify(data));
    if (x0 !== undefined && y0 !== undefined) {
      setLoading(true);
      fetch("/api/newtonForward/run", {
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
          setShowxc(true);
          setRun(URL.createObjectURL(imageBlob));
        });

      fetch("/api/newtonForward/runtable", {
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
          setRuntable(URL.createObjectURL(imageBlob));
          setShowrun(false);
          // setShowPartitions(true);
        });

      // fetch("/api/newtonForward/table", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // }).then((r) => {
      //   r.json().then((response) => {
      //     setTable(response.datatable);
      //   });
      // });
      fetch("/api/newtonForward/table", {
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
      fetch("/api/newtonForward/runner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => {
        r.json().then((response) => {
          setValueY(response.Answer);
        });
      });
    }
  };
  return (
    <>
    <Grid container spacing={2} sx={{paddingInline: "15%"}}>
      <Grid item xs={12}>
      <h1>Newton's forward interpolation</h1>
      </Grid>
      <Grid item xs={12}>
      <p className="theory-text">
          {" "}
          <i>
          This formula is particularly useful for interpolating the values of
            f(x) near the beginning of the set of values given. h is called the
            interval of difference and u = ( x – a ) / h, Here a is the first
            term.
          </i>
          <br></br>
        </p>
      </Grid>
      <Grid item xs={12}>
        <center>
          <img src={newf} alt="formula" style={{width: "60%"}} />
        </center>
      </Grid>
    <Grid item xs={12} sm={6}>
      {isVisible && (
        <>
        <Item>
          <br />
          <label>
          Enter Values of x {" : "} &emsp;
                <TextField
                  label="Values of x(seperated by ',')"
                  variant="filled"
                  onChange={(e) => {
                    if (e.target.value) {
                      setx(e.target.value);
                    }
                  }}
                />
              </label>
              <br />
              <br />
              <label>
              Enter Values of y {" : "}
                <TextField
                  label="Values of y(seperated by ',')"
                  variant="filled"
                  onChange={(e) => {
                    if (e.target.value) {
                      setY(e.target.value);
                    }
                  }}
                />
              </label>
        </Item>
        {table && (
            <Item>
              <center>
                <div
                  className="table"
                  id="tableid"
                  dangerouslySetInnerHTML={{ __html: table }}
                ></div>
              </center>
            </Item>
          )}
             {showxc && (
            <Item>
              <label>
                Enter differnt Values of x {" : "}
                <TextField
                  label="Value of x"
                  variant="filled"
                  onChange={(e) => {
                    if (e.target.value) {
                      setXc(e.target.value);
                    }
                  }}
                />
              </label>
            </Item>
          )}
          {valueY && (
            <Item>
              at x = {xc} , y = {valueY}
            </Item>
          )}
          <Item>
          <center>
          <Button onClick={apiCall}> Submit </Button>
          </center>
          </Item>
        </>
      )}
    </Grid>
      <Grid item xs={12} sm={6}>
        {isVisible && (
          <div className="graph">
            {loading && <LinearProgress color="inherit" />}
            {runtable && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img className="graphimg" src={runtable} alt="... loading "></img>
                {/* {graphII && <img
                  style={{ width: "35vw" }}
                  src={graphII}
                  alt="... loading "
                ></img>} */}
              </div>
            )}
          </div>
        )}
      </Grid>
    </Grid>
     
    </>
  );
}
