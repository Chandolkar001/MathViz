import React from 'react';
import Drawer from './components/Dashboard/Drawer';
import Footer from './components/Footer/Footer';
import './App.css';
function App() {
  return (
    <div className='container'>
      <div>
        <Drawer />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
