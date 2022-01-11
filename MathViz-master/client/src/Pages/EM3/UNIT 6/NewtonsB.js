import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
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
      fetch("/api/newtonBackward/run", {
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

      if (xc !== undefined) {
        fetch("/api/newtonBackward/runtable", {
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
      }

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
      fetch("/api/newtonBackward/table", {
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
      fetch("/api/newtonBackward/runner", {
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
      <div className="container">
        <div className="headingname">
          <h1>Newton's Backward interpolation</h1>
        </div>
        <div className="theory">
          <p>
            {" "}
            This formula is particularly useful for interpolating the values of
            f(x) near the beginning of the set of values given. h is called the
            interval of difference and u = ( x – a ) / h, Here a is the first
            term.
            <br></br>
          </p>
          <center>
            <img src={newf} alt="formula" className="newfimg" />
          </center>
        </div>
      </div>
      <div className="container calculationbox">
        <div className="inputboxes">
          <Item>
            <label>
              Enter Values of x {" : "}
              <br />
              <br />
              <TextField
                label="Values of x(seperated by ',')"
                variant="outlined"
                onChange={(e) => {
                  if (e.target.value) {
                    setx(e.target.value);
                  }
                }}
              />
            </label>
          </Item>
          <Item>
            <label>
              Enter Values of y {" : "}
              <br />
              <br />
              <TextField
                label="Values of y(seperated by ',')"
                variant="outlined"
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
              <div
                className="table"
                id="tableid"
                dangerouslySetInnerHTML={{ __html: table }}
              ></div>
            </Item>
          )}
          {showxc && (
            <Item>
              <label>
                Enter differnt Values of x {" : "}
                <br />
                <br />
                <TextField
                  label="Value of x"
                  variant="outlined"
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
            {showrun && run && (
              <img className="graphimg" src={run} alt="... loading "></img>
            )}
            {runtable && (
              <img className="graphimg" src={runtable} alt="... loading "></img>
            )}
          </div>
        )}
      </div>
    </>
  );
}
