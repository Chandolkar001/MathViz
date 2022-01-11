import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "../EM1/EM.css";
const units = [
  {
    name: "UNIT - I",
    topics: [
      { name: "Lorem ipsum dolor elit.", link: "/simpsons" },
      { name: "sit amet consectetur adipisicing", link: "/simpsons" },
      { name: "Veniam consectetur", link: "/simpsons" },
      { name: "earum quas illo", link: "/simpsons1" },
      { name: "sit amet consectetur adipisicing", link: "/simpsons" },
      { name: "earum quas illo", link: "/simpsons" },
      { name: "earum quas illo", link: "/simpsons" },
      { name: "sit amet consectetur adipisicing", link: "/simpsons" },
    ],
    key: 1,
  },
  {
    name: "UNIT - II",
    topics: [
      { name: "Lorem ipsum dolor elit.", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "Veniam consectetur", link: "/EM1/" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
    ],
    key: 2,
  },
  {
    name: "UNIT - III",
    topics: [
      { name: "Lorem ipsum dolor elit.", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "Veniam consectetur", link: "/EM1/" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
    ],
    key: 3,
  },
  {
    name: "UNIT - IV",
    topics: [
      { name: "Lorem ipsum dolor elit.", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "Veniam consectetur", link: "/EM1/" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
    ],
    key: 4,
  },
  {
    name: "UNIT - V",
    topics: [
      { name: "Lorem ipsum dolor elit.", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "Veniam consectetur", link: "/EM1/" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "earum quas illo", link: "/EM1" },
      { name: "sit amet consectetur adipisicing", link: "/EM1" },
    ],
    key: 5,
  },
  {
    name: "UNIT - VI",
    topics: [
      { name: "Simpson's 1/3rd rule", link: "/simpsons" },
      { name: "Simpson's 3/8th rule", link: "/simpsons3_8th" },
      { name: "Trapezoidal Rule", link: "/trapezoidal" },
      { name: "Newton's forward", link: "/newtonsf" },
      { name: "Newton's backward", link: "/newtonsb" },
      { name: "Eulers", link: "/eulers" },
      { name: "Modified Eulers", link: "/modifiedEulers" },
      { name: "RungeKutta", link: "/rungekutta" },
    ],
    key: 6,
  },
];

function EM2() {
  return (
    <div className="EM1-container">
      <div className="EM3-heading-container">
        <h1
          className="heading-em"
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Roboto",
            fontWeight: 200,
            fontSize: 64,
          }}
        >
          Engineering Mathematics 3
        </h1>
      </div>
      {units.map((unit) => (
        <div className="Unit-container" key={unit.key}>
          <div style={{ marginBottom: 10 }}>
            <h2>{unit.name}</h2>
          </div>
          <hr></hr>
          <Grid container style={{ marginTop: 15 }}>
            {unit.topics.map((topic) => (
              <Grid item md={6}>
                <ul>
                  <li>
                    <Link to={topic.link} className="concept">
                      {topic.name}
                    </Link>
                  </li>
                </ul>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}

export default EM2;
