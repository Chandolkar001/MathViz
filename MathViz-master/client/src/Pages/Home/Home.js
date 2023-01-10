import React from 'react';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css';
import vector from './vector.jpeg';

function Home() {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <div className='imagecon'>
          <img src={vector} alt='math' className='img vert-move' />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container sx={{ marginTop: '25vh', marginRight: '5vh' }}>
          <Grid item xs={12}>
            <h1 className='head-text'>Vizualize</h1>
          </Grid>
          <Grid item xs={12}>
            <h1 className='head-text-light'>Maths with us.</h1>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className='buttoncon'>
              <Link className='button button-1' to='/EM1'>
                EM-1
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className='buttoncon'>
              <Link className='button button-2' to='/EM2'>
                EM-2
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className='buttoncon'>
              <Link className='button button-3' to='/EM3'>
                EM-3
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// function Home() {
//   return (
//     <div className='home-container'>
//       <img src={vector} alt='math' className='img vert-move' />

//       <Grid container>
//         <Grid item xs={12} sm={4}>
//           <div className='buttoncon'>
//             <Link className='button button-1' to='/EM1'>
//               EM-1
//             </Link>
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <div className='buttoncon'>
//             <Link className='button button-2' to='/EM2'>
//               EM-2
//             </Link>
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <div className='buttoncon'>
//             <Link className='button button-3' to='/EM3'>
//               EM-3
//             </Link>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// function Home() {
//   return (
//     <div className='home-container'>
//       <img src={vector} alt='math' className='img vert-move' />
//       <div className='rightContainer'>
//         <div className='btnGrid'>
//           <div className='button-container'>
//             <Link className='button button-1' to='/EM1'>
//               EM-1
//             </Link>
//           </div>
//           <div className='button-container'>
//             <Link className='button button-2' to='/EM2'>
//               EM-2
//             </Link>
//           </div>
//           <div className='button-container'>
//             <Link className='button button-3' to='/EM3'>
//               EM-3
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Home;
