import Container from "@mui/material/Container";
import { Switch, Link, Route } from "react-router-dom";
import Simpsons from "./../components/Simpsons";
import "./Dashboard.css";
import Breadcrumbs from "./Breadcrumbs";

function Dashboard() {
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/simpsons" >Simpsons</Link>
          </li>
        </ul>
      </nav>
      <Breadcrumbs />

      <Switch>
        <Route path="/simpsons" component={Simpsons} />
      </Switch>
    </Container>
  );
}
export default Dashboard;
