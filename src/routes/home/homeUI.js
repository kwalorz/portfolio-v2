import React, { Fragment } from 'react';
import './home-styles/home.css';
import { SceneTwo } from './SceneTwo';

const Home = () => {
  return (
    <Fragment>
      <div className='overlay-container'>
        <h1>Welcome to my site.</h1>
        <button>VIEW WORK</button>
      </div>
      <SceneTwo />
    </Fragment>
  );
};

export default Home;
