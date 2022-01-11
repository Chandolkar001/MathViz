import React from "react";
// import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";
import vector from "./vector.jpeg";

function Home() {
  return (
    <div className="home-container">
      <img src={vector} alt="math" className="img vert-move" />
      <div className="rightContainer">
        <h1 className="heading">
          <span>M</span>aths<span>W</span>iz
        </h1>
        <h1 className="heading2">
          <p>
            <span>M</span>aths
          </p>
          <p>
            <span>W</span>iz
          </p>
        </h1>

        <div className="btnGrid">
          <div className="button-container">
            <Link className="button button-1" to="/EM1">
              EM-1
            </Link>
          </div>
          <div className='button-container'>
            <Link className='button button-2' to='/EM2'>
              EM-2
            </Link>
          </div>
          <div className='button-container'>
            <Link className='button button-3' to='/EM3'>
              EM-3
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
