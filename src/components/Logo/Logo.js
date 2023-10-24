import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import styles from './LogoStyle.module.css'

const Logo = () => {
    return(
    <div >
    <Tilt>
      <div style={{width:'20%', backgroundColor: 'darkgreen' }}>
        <h1>React Parallax Tilt 👀</h1>
      </div>
    </Tilt>
    </div>
    )

};

export default Logo;