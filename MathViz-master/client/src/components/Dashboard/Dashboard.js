import Container from '@mui/material/Container';
import { Switch, Link, Route } from 'react-router-dom';

import './Dashboard.css';
import Breadcrumbs from './Breadcrumbs';

import Home from '../../Pages/Home/Home';
import EM1 from '../../Pages/EM1/EM1';
import EM2 from '../../Pages/EM2/EM2';
import EM3 from '../../Pages/EM3/EM3';

import Simpsons from '../../Pages/EM3/UNIT 6/Simpsons';
import Drawer from './Drawer';
import Footer from '../Footer/Footer';

function Dashboard() {
  return (
    <>
      <div className='NavBar'>
        <ul>
          <li style={{scrollbarWidth: 0}}>
            <Drawer />
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/simpsons'>Simpsons</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/simpsons' exact component={Simpsons} />
        <Route path='/EM1' exact component={EM1} />
        <Route path='/EM2' exact component={EM2} />
        <Route path='/EM3' exact component={EM3} />
      </Switch>
    </>
  );
}
export default Dashboard;
