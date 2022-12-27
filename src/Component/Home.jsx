import React from 'react';
import BG from '../Img/bg.jpg';
import {Link} from "react-router-dom";

function Home() {
  return (<div style={{ height: "100vh" }}>
    <div class="image-container">
        <img src={BG} />
        <div className='fade'></div>
    </div>
    <div className='HomeBox'>
        <h1>Hello 👋</h1>
        <span className='right'>Some Interesting Projects are listed here, based on React Js</span>
    </div>

        <div className="list left home-header">
            <ul className="navBar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="BMI">BMI</Link></li>
            <li><Link to="Counter">Counter</Link></li>
            <li><Link to="EmojiSearch">Emoji Search</Link></li>
            <li><Link to="Calculator">Calculator</Link></li>
            <li><Link to="ImgCompress">Image Compress</Link></li>
            <li><Link to="FetchApi">Fetch Api</Link></li>
            </ul>
        </div>
        
  </div>
  )
}

export default Home