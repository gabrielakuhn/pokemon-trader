import React from 'react';
import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import { Main } from './components/layouts/Main';
import './styles/global.css';


function App() {
  return (
    <div>
      <div className="w-11/12 m-auto h-screen">
        <Header />
        <Main/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
