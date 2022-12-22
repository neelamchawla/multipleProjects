import { BrowserRouter as Router, Route, Link, Routes} 
        from "react-router-dom";
// Import css
import "./App.css"
import BMI from "./Component/BMI";
import Calculator from "./Component/Calculator";
import Counter from "./Component/Counter";
import EmojiTab from "./Component/EmojiTab";
import ImgCompress from "./Component/ImgCompress";
  
function App() {
  return (
    <div className="App">
      <Router>
        <div className="list">
          <ul className="navBar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="BMI">BMI</Link></li>
            <li><Link to="Counter">Counter</Link></li>
            <li><Link to="EmojiTab">EmojiTab</Link></li>
            <li><Link to="Calculator">Calculator</Link></li>
            <li><Link to="ImgCompress">ImgCompress</Link></li>
          </ul>
        </div>
        <Routes>
          <><Route exact path="/" element={<h1>Neelam's Practical</h1>} /></>
          <><Route exact path="BMI" element={<BMI />} /></>
          <><Route exact path="Counter" element={<Counter />} /></>
          <><Route exact path="EmojiTab" element={<EmojiTab />} /></>
          <><Route exact path="Calculator" element={<Calculator />} /></>
          <><Route exact path="ImgCompress" element={<ImgCompress />} /></>
        </Routes>
      </Router>
    </div>
  );
}

export default App;