import React from "react";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
// import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { withRouter } from "react-router-dom";

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const pathNames = pathname.split("/").filter((x) => x);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {pathNames.length > 0 ? (
        // <Link to={"/"}>{"Home"}</Link>
        <Link onClick={() => history.push("/")}>Home</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          //   <Link to={routeTo}>{name}</Link>
          <Link key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);
